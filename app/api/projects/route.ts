import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { requireSpace } from "@/lib/auth/require-space";
import { Permissions } from "@/lib/rbac/permissions";
import { requirePermission } from "@/lib/rbac/server";

export async function POST(
  req: Request
) {
  try {
    const user =
      await requireUser();

    const body =
      await req.json();

    const name =
      body.name?.trim() ?? "";

    const description =
      body.description?.trim() ?? "";

    const spaceId =
      body.spaceId ?? "";

    if (!name) {
      return NextResponse.json(
        {
          error:
            "Project name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!spaceId) {
      return NextResponse.json(
        {
          error:
            "Space is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (name.length > 120) {
      return NextResponse.json(
        {
          error:
            "Project name is too long.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      description.length >
      5000
    ) {
      return NextResponse.json(
        {
          error:
            "Description is too long.",
        },
        {
          status: 400,
        }
      );
    }

    const space =
      await requireSpace(
        spaceId
      );

    await requirePermission(
      user.id,
      space.workspaceId,
      Permissions.PROJECT_CREATE
    );

    const existing =
      await prisma.project.findFirst({
        where: {
          spaceId,
          name,
        },
        select: {
          id: true,
        },
      });

    if (existing) {
      return NextResponse.json(
        {
          error:
            "Project already exists in this space.",
        },
        {
          status: 409,
        }
      );
    }

    const project =
      await prisma.$transaction(
        async (tx) => {
          const created =
            await tx.project.create({
              data: {
                name,
                description,
                status:
                  "active",
                spaceId,
              },
            });

          await tx.auditLog.create({
            data: {
              workspaceId:
                space.workspaceId,

              actorId:
                user.id,

              action:
                "PROJECT_CREATED",

              target:
                created.id,

              metadata: {
                project:
                  created.name,
              },
            },
          });

          return created;
        }
      );

    return NextResponse.json(
      project,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
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