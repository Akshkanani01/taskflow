import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json([], {
      status: 401,
    });
  }

  const workspaces =
    await prisma.workspace.findMany({

      where: {

        members: {

          some: {

            userId: session.user.id,

          },

        },

      },

      select: {

        id: true,

        name: true,

      },

      orderBy: {

        createdAt: "asc",

      },

    });

  return NextResponse.json(workspaces);
}