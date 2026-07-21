import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { requireUser } from "@/lib/auth/require-user";

export async function GET() {
  try {
    const user =
      await requireUser();

    const workspaces =
      await prisma.workspace.findMany({
        where: {
          members: {
            some: {
              userId: user.id,
            },
          },
        },

        select: {
          id: true,

          name: true,

          slug: true,

          ownerId: true,

          createdAt: true,

          updatedAt: true,
        },

        orderBy: {
          createdAt: "asc",
        },
      });

    return NextResponse.json(
      workspaces
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      [],
      {
        status: 401,
      }
    );
  }
}