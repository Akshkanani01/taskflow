import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { Permissions } from "@/lib/rbac/permissions";
import { requirePermission } from "@/lib/rbac/server";

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const user =
      await requireUser();

    const { id } =
      await params;

    const project =
      await prisma.project.findUnique({
        where: {
          id,
        },

        include: {
          space: {
            select: {
              workspaceId: true,
            },
          },
        },
      });

    if (!project) {
      return NextResponse.json(
        {
          error:
            "Project not found.",
        },
        {
          status: 404,
        }
      );
    }

    await requirePermission(
      user.id,
      project.space.workspaceId,
      Permissions.PROJECT_DELETE
    );

    await prisma.$transaction(
      async (tx) => {
        await tx.project.delete({
          where: {
            id,
          },
        });

        await tx.auditLog.create({
          data: {
            workspaceId:
              project.space
                .workspaceId,

            actorId:
              user.id,

            action:
              "PROJECT_DELETED",

            target: id,

            metadata: {
              projectId: id,
            },
          },
        });
      }
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete project.",
      },
      {
        status: 500,
      }
    );
  }
}