import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import {
  PermissionError,
  requirePermission,
} from "@/lib/rbac/server";
import { Permissions } from "@/lib/rbac/permissions";

export async function GET() {
  try {
    const user = await requireUser();

    const cookieStore = await cookies();

    let workspaceId =
      cookieStore.get("workspaceId")?.value ?? null;

    if (!workspaceId) {
      const membership =
        await prisma.workspaceMember.findFirst({
          where: {
            userId: user.id,
          },
          orderBy: {
            joinedAt: "asc",
          },
          select: {
            workspaceId: true,
          },
        });

      if (!membership) {
        return NextResponse.json([], {
          status: 200,
        });
      }

      workspaceId = membership.workspaceId;
    }

    const membership =
      await prisma.workspaceMember.findUnique({
        where: {
          workspaceId_userId: {
            workspaceId,
            userId: user.id,
          },
        },
        select: {
          workspaceId: true,
        },
      });

    if (!membership) {
      const fallbackMembership =
        await prisma.workspaceMember.findFirst({
          where: {
            userId: user.id,
          },
          orderBy: {
            joinedAt: "asc",
          },
          select: {
            workspaceId: true,
          },
        });

      if (!fallbackMembership) {
        return NextResponse.json([], {
          status: 200,
        });
      }

      workspaceId =
        fallbackMembership.workspaceId;
    }

    await requirePermission(
      user.id,
      workspaceId,
      Permissions.SPACE_VIEW
    );

    const spaces =
      await prisma.space.findMany({
        where: {
          workspaceId,
        },
        include: {
          projects: {
            select: {
              id: true,
              name: true,
              status: true,
              createdAt: true,
            },
            orderBy: {
              createdAt: "asc",
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });

    return NextResponse.json(spaces);
  } catch (error) {
    if (error instanceof PermissionError) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 403,
        }
      );
    }

    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to load spaces",
      },
      {
        status: 500,
      }
    );
  }
}