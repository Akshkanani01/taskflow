import { NextRequest, NextResponse } from "next/server";
import { WorkspaceRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import {
  PermissionError,
  requirePermission,
} from "@/lib/rbac/server";
import { Permissions } from "@/lib/rbac/permissions";
import { hasWorkspacePermission } from "@/lib/rbac/server";
function isValidRole(role: unknown): role is WorkspaceRole {
  return (
    role === WorkspaceRole.OWNER ||
    role === WorkspaceRole.ADMIN ||
    role === WorkspaceRole.MANAGER ||
    role === WorkspaceRole.MEMBER ||
    role === WorkspaceRole.VIEWER
  );
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser();

    const body = await request.json();

    const workspaceId = String(body.workspaceId ?? "").trim();
    const spaceId = String(body.spaceId ?? "").trim();
    const targetUserId = String(body.userId ?? "").trim();
    const role = body.role as WorkspaceRole;

    if (!workspaceId || !spaceId || !targetUserId || !role) {
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

    if (!isValidRole(role)) {
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
          message: "You cannot change your own role.",
        },
        {
          status: 403,
        }
      );
    }

    await requirePermission(
      user.id,
      workspaceId,
      Permissions.TEAM_ROLE_UPDATE
    ); 
    const hasPermission = await hasWorkspacePermission(
  user.id,
  workspaceId,
  Permissions.TEAM_ROLE_UPDATE
);

console.log("HAS_PERMISSION =", hasPermission);
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
    console.log("===== ROLE DEBUG =====");

console.log({
  currentUserId: user.id,
  workspaceOwnerId: workspace.ownerId,
  actorRole: actorMember.role,
  targetRole: targetMember.role,
  newRole: role,
});

    if (targetMember.userId === workspace.ownerId) {
      return NextResponse.json(
        {
          success: false,
          message: "Workspace owner role cannot be changed.",
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
          message: "Owner role cannot be changed.",
        },
        {
          status: 403,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Enterprise Role Hierarchy
    |--------------------------------------------------------------------------
    |
    | OWNER
    |   → Can change ADMIN / MANAGER / MEMBER / VIEWER
    |
    | ADMIN
    |   → Can change only MANAGER / MEMBER / VIEWER
    |   → Cannot edit OWNER
    |   → Cannot edit another ADMIN
    |   → Cannot promote anyone to ADMIN/OWNER
    |
    | MANAGER
    |   → Cannot change roles
    |
    | MEMBER / VIEWER
    |   → Cannot change roles
    |
    */

    switch (actorMember.role) {
      case WorkspaceRole.OWNER:
        break;

      case WorkspaceRole.ADMIN: {
        if (targetMember.role === WorkspaceRole.ADMIN) {
          return NextResponse.json(
            {
              success: false,
              message: "Admins cannot change another admin's role.",
            },
            {
              status: 403,
            }
          );
        }

        if (
          role === WorkspaceRole.ADMIN ||
          role === WorkspaceRole.OWNER
        ) {
          return NextResponse.json(
            {
              success: false,
              message:
                "Admins can only assign Manager, Member or Viewer roles.",
            },
            {
              status: 403,
            }
          );
        }

        break;
      }

      case WorkspaceRole.MANAGER:
        return NextResponse.json(
          {
            success: false,
            message: "Managers cannot change member roles.",
          },
          {
            status: 403,
          }
        );

      case WorkspaceRole.MEMBER:
      case WorkspaceRole.VIEWER:
        return NextResponse.json(
          {
            success: false,
            message: "You do not have permission to change roles.",
          },
          {
            status: 403,
          }
        );

      default:
        return NextResponse.json(
          {
            success: false,
            message: "Invalid workspace role.",
          },
          {
            status: 403,
          }
        );
    }

    if (targetMember.role === role) {
      return NextResponse.json(
        {
          success: false,
          message: "Member already has this role.",
        },
        {
          status: 400,
        }
      );
    }
        const updatedMember = await prisma.$transaction(async (tx) => {
      const workspaceUpdatedMember = await tx.workspaceMember.update({
        where: {
          workspaceId_userId: {
            workspaceId,
            userId: targetUserId,
          },
        },
        data: {
          role,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              emailVerified: true,
            },
          },
        },
      });

      const spaceMember = await tx.spaceMember.findUnique({
        where: {
          spaceId_userId: {
            spaceId,
            userId: targetUserId,
          },
        },
      });

      if (spaceMember) {
        await tx.spaceMember.update({
          where: {
            spaceId_userId: {
              spaceId,
              userId: targetUserId,
            },
          },
          data: {
            role,
          },
        });
      }

      await tx.auditLog.create({
        data: {
          workspaceId,
          actorId: user.id,
          action: "ROLE_CHANGED",
          target: targetUserId,
          metadata: {
            previousRole: targetMember.role,
            newRole: role,
            workspaceName: workspace.name,
            workspaceId,
            spaceName: space.name,
            spaceId,
            targetUserId,
            targetUserName: targetMember.user.name,
            targetUserEmail: targetMember.user.email,
            changedBy: user.id,
            changedAt: new Date().toISOString(),
          },
        },
      });

      return workspaceUpdatedMember;
    });

    return NextResponse.json({
      success: true,
      message: "Role updated successfully.",
      member: {
        id: updatedMember.id,
        userId: updatedMember.userId,
        workspaceId: updatedMember.workspaceId,
        role: updatedMember.role,
        joinedAt: updatedMember.joinedAt,
        user: updatedMember.user,
      },
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

    console.error("[TEAM_ROLE_UPDATE]", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}