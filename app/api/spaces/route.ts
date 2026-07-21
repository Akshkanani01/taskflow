import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { requirePermission } from "@/lib/rbac/server";
import { Permissions } from "@/lib/rbac/permissions";

export async function GET() {
  try {
    const user = await requireUser();

    const cookieStore = await cookies();

    const workspaceId =
      cookieStore.get("workspaceId")?.value;

    if (!workspaceId) {
      return NextResponse.json(
        {
          error: "Workspace is required.",
        },
        {
          status: 400,
        }
      );
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