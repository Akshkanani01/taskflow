import { NextRequest, NextResponse } from "next/server";
import { InviteStatus, WorkspaceRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import {
  PermissionError,
  requirePermission,
} from "@/lib/rbac/server";
import { Permissions } from "@/lib/rbac/permissions";

import { isInviteExpired } from "@/lib/invites/token";

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser();

    const body = await request.json();
    const token = String(body.token ?? "").trim();

    if (!token) {
      return NextResponse.json(
        {
          message: "Invite token is required.",
        },
        {
          status: 400,
        }
      );
    }

    const invite = await prisma.workspaceInvite.findUnique({
      where: {
        token,
      },
      include: {
        workspace: {
          select: {
            id: true,
            name: true,
          },
        },
        space: {
          select: {
            id: true,
            workspaceId: true,
          },
        },
        invitedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!invite) {
      return NextResponse.json(
        {
          message: "Invite not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (invite.status !== InviteStatus.PENDING) {
      return NextResponse.json(
        {
          message: "Invite has already been used.",
        },
        {
          status: 400,
        }
      );
    }

    if (isInviteExpired(invite.expiresAt)) {
      await prisma.workspaceInvite.update({
        where: {
          id: invite.id,
        },
        data: {
          status: InviteStatus.EXPIRED,
        },
      });

      return NextResponse.json(
        {
          message: "Invite has expired.",
        },
        {
          status: 400,
        }
      );
    }

    const loggedEmail = user.email.trim().toLowerCase();
    const inviteEmail = invite.email.trim().toLowerCase();

    if (loggedEmail !== inviteEmail) {
      return NextResponse.json(
        {
          message: `This invitation was sent to ${invite.email}. Please sign in with that account.`,
        },
        {
          status: 403,
        }
      );
    }

    const existingMember = await prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId: invite.workspaceId,
          userId: user.id,
        },
      },
    });

    if (existingMember) {
      return NextResponse.json(
        {
          message: "Already a workspace member.",
        },
        {
          status: 409,
        }
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.workspaceMember.create({
        data: {
          workspaceId: invite.workspaceId,
          userId: user.id,
          role: invite.role,
        },
      });

      if (invite.spaceId) {
        const existingSpaceMember = await tx.spaceMember.findUnique({
          where: {
            spaceId_userId: {
              spaceId: invite.spaceId,
              userId: user.id,
            },
          },
        });

        if (existingSpaceMember) {
          await tx.spaceMember.update({
            where: {
              spaceId_userId: {
                spaceId: invite.spaceId,
                userId: user.id,
              },
            },
            data: {
              role: invite.role,
            },
          });
        } else {
          await tx.spaceMember.create({
            data: {
              spaceId: invite.spaceId,
              userId: user.id,
              role: invite.role,
            },
          });
        }
      }

      await tx.workspaceInvite.update({
        where: {
          id: invite.id,
        },
        data: {
          status: InviteStatus.ACCEPTED,
          acceptedAt: new Date(),
          acceptedById: user.id,
        },
      });

      await tx.auditLog.create({
        data: {
          workspaceId: invite.workspaceId,
          actorId: user.id,
          action: "TEAM_INVITE_ACCEPTED",
          target: invite.email,
          metadata: {
            inviteId: invite.id,
            invitedById: invite.invitedById,
            workspaceName: invite.workspace.name,
            spaceId: invite.spaceId,
          },
        },
      });
    });

    return NextResponse.json({
      success: true,
      workspaceId: invite.workspaceId,
      spaceId: invite.spaceId,
      message: "Invite accepted successfully.",
    });
  } catch (error) {
    if (error instanceof PermissionError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 403,
        }
      );
    }

    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}