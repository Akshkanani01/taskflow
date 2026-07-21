import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { WorkspaceRole } from "@prisma/client";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  PermissionError,
  requirePermission,
} from "@/lib/rbac/server";
import { Permissions } from "@/lib/rbac/permissions";

import { createWorkspaceInvite } from "@/lib/invite";
import { sendWorkspaceInviteEmail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body = await req.json();

    const workspaceId = String(body.workspaceId ?? "").trim();
    const spaceId = body.spaceId ? String(body.spaceId).trim() : "";
    const email = String(body.email ?? "").trim().toLowerCase();
    const role = body.role as WorkspaceRole | undefined;

    if (!workspaceId || !email || !role) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      role !== WorkspaceRole.OWNER &&
      role !== WorkspaceRole.ADMIN &&
      role !== WorkspaceRole.MANAGER &&
      role !== WorkspaceRole.MEMBER &&
      role !== WorkspaceRole.VIEWER
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid role.",
        },
        {
          status: 400,
        }
      );
    }

    const workspace = await prisma.workspace.findUnique({
      where: {
        id: workspaceId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!workspace) {
      return NextResponse.json(
        {
          success: false,
          message: "Workspace not found.",
        },
        {
          status: 404,
        }
      );
    }

    await requirePermission(
      session.user.id,
      workspaceId,
      Permissions.TEAM_INVITE
    );

    const actor = await prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId: session.user.id,
        },
      },
      select: {
        role: true,
      },
    });

    if (!actor) {
      return NextResponse.json(
        {
          success: false,
          message: "Workspace member not found.",
        },
        {
          status: 403,
        }
      );
    }

    if (role === WorkspaceRole.OWNER && actor.role !== WorkspaceRole.OWNER) {
      return NextResponse.json(
        {
          success: false,
          message: "Only workspace owners can invite another owner.",
        },
        {
          status: 403,
        }
      );
    }

    if (spaceId) {
      const space = await prisma.space.findUnique({
        where: {
          id: spaceId,
        },
        select: {
          id: true,
          workspaceId: true,
        },
      });

      if (!space) {
        return NextResponse.json(
          {
            success: false,
            message: "Space not found.",
          },
          {
            status: 404,
          }
        );
      }

      if (space.workspaceId !== workspaceId) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid space selected.",
          },
          {
            status: 400,
          }
        );
      }
    }

    const invite = await createWorkspaceInvite({
      workspaceId,
      spaceId: spaceId || undefined,
      email,
      role,
      invitedById: session.user.id,
    });

    const host = req.headers.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const inviteUrl = `${protocol}://${host}/invite/${invite.token}`;

    await sendWorkspaceInviteEmail({
      email,
      inviterName: session.user.name ?? session.user.email,
      workspaceName: workspace.name,
      inviteUrl,
    });

    return NextResponse.json({
      success: true,
      message: "Invitation email sent successfully.",
    });
  } catch (error) {
    console.error(error);

    if (error instanceof PermissionError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 403,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}