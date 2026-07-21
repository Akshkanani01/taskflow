import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { requirePermission } from "@/lib/rbac/server";
import { Permissions } from "@/lib/rbac/permissions";

export async function POST(
  req: Request
) {
  try {
    const user =
      await requireUser();

    const body =
      await req.json();

    const name =
      body.name?.trim();

    const workspaceId =
      body.workspaceId;

    const color =
      body.color || "blue";

    if (!name) {
      return NextResponse.json(
        {
          error:
            "Space name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!workspaceId) {
      return NextResponse.json(
        {
          error:
            "Workspace is required.",
        },
        {
          status: 400,
        }
      );
    }

    await requirePermission(
      user.id,
      workspaceId,
      Permissions.SPACE_CREATE
    );

    const existing =
      await prisma.space.findFirst({
        where: {
          workspaceId,
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
            "A space with this name already exists.",
        },
        {
          status: 409,
        }
      );
    }

    const space =
      await prisma.space.create({
        data: {
          name,
          color,
          workspaceId,
        },
      });

    return NextResponse.json(
      space,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create space.",
      },
      {
        status: 500,
      }
    );
  }
}