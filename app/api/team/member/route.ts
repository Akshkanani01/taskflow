import { NextRequest, NextResponse } from "next/server";
import { WorkspaceRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import {
  PermissionError,
  requirePermission,
} from "@/lib/rbac/server";
import { Permissions } from "@/lib/rbac/permissions";

function isValidRole(role: unknown): role is WorkspaceRole {
  return (
    role === WorkspaceRole.OWNER ||
    role === WorkspaceRole.ADMIN ||
    role === WorkspaceRole.MANAGER ||
    role === WorkspaceRole.MEMBER ||
    role === WorkspaceRole.VIEWER
  );
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await requireUser();

    const body = await request.json();

    const workspaceId = String(body.workspaceId ?? "").trim();
    const spaceId = String(body.spaceId ?? "").trim();
    const targetUserId = String(body.userId ?? "").trim();

    if (!workspaceId || !spaceId || !targetUserId) {
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

    const workspace = await prisma.workspace.findUnique({
      where: {
        id: workspaceId,
      },
      select: {
        id: true,
        name: true,
        ownerId: true,
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

    const space = await prisma.space.findFirst({
      where: {
        id: spaceId,
        workspaceId,
      },
      select: {
        id: true,
        name: true,
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

    const targetMember = await prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId: targetUserId,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!targetMember) {
      return NextResponse.json(
        {
          success: false,
          message: "Member not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (targetMember.userId === user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot remove yourself.",
        },
        {
          status: 403,
        }
      );
    }

    await requirePermission(
      user.id,
      workspaceId,
      Permissions.MEMBER_REMOVE
    );

    const actorMember = await prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId: user.id,
        },
      },
      select: {
        role: true,
      },
    });

    if (!actorMember) {
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

    if (targetMember.userId === workspace.ownerId) {
      return NextResponse.json(
        {
          success: false,
          message: "Workspace owner cannot be removed.",
        },
        {
          status: 403,
        }
      );
    }

    if (targetMember.role === WorkspaceRole.OWNER) {
      return NextResponse.json(
        {
          success: false,
          message: "Owner cannot be removed.",
        },
        {
          status: 403,
        }
      );
    }

    if (actorMember.role === WorkspaceRole.ADMIN) {
      if (targetMember.role === WorkspaceRole.ADMIN) {
        return NextResponse.json(
          {
            success: false,
            message: "Admins cannot remove other admins.",
          },
          {
            status: 403,
          }
        );
      }
    }

    if (actorMember.role === WorkspaceRole.MANAGER) {
      if (
        targetMember.role === WorkspaceRole.ADMIN ||
        targetMember.role === WorkspaceRole.MANAGER
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Managers cannot remove admin-level members.",
          },
          {
            status: 403,
          }
        );
      }
    }

    if (
      actorMember.role === WorkspaceRole.MEMBER ||
      actorMember.role === WorkspaceRole.VIEWER
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "You do not have permission to remove members.",
        },
        {
          status: 403,
        }
      );
    }

    // Part 2 continues...
        const updatedAt = await prisma.$transaction(async (tx) => {
      const deletedWorkspaceMember = await tx.workspaceMember.delete({
        where: {
          workspaceId_userId: {
            workspaceId,
            userId: targetUserId,
          },
        },
      });

      const deletedSpaceMember = await tx.spaceMember.deleteMany({
        where: {
          spaceId,
          userId: targetUserId,
        },
      });

      await tx.auditLog.create({
        data: {
          workspaceId,
          actorId: user.id,
          action: "MEMBER_REMOVED",
          target: targetUserId,
          metadata: {
            spaceId,
            targetUserId,
            targetUserEmail: targetMember.user.email,
            targetUserName: targetMember.user.name,
            workspaceName: workspace.name,
            spaceName: space.name,
            removedWorkspaceMemberId: deletedWorkspaceMember.id,
            removedSpaceMembersCount: deletedSpaceMember.count,
          },
        },
      });

      return {
        workspaceMemberId: deletedWorkspaceMember.id,
        spaceMembersRemoved: deletedSpaceMember.count,
      };
    });

    return NextResponse.json({
      success: true,
      message: "Member removed successfully.",
      removedWorkspaceMemberId: updatedAt.workspaceMemberId,
      removedSpaceMembersCount: updatedAt.spaceMembersRemoved,
    });
  } catch (error) {
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

    if (error instanceof Error && error.message === "Unauthorized") {
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

    console.error(error);

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