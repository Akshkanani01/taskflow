import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";

export async function POST(req: Request) {
  try {
    const user = await requireUser();

    const body = await req.json();

    const name = body.name?.trim();

    if (!name) {
      return NextResponse.json(
        {
          error: "Workspace name required",
        },
        {
          status: 400,
        }
      );
    }

    const slug =
      `${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;

    const workspace = await prisma.$transaction(
      async (tx) => {
        const createdWorkspace =
          await tx.workspace.create({
            data: {
              name,
              slug,
              ownerId: user.id,
              members: {
                create: {
                  userId: user.id,
                  role: "OWNER",
                },
              },
            },
          });

        await tx.space.create({
          data: {
            name: "General",
            workspaceId: createdWorkspace.id,
          },
        });

        return createdWorkspace;
      },
      {
        timeout: 10000,
      }
    );

    return NextResponse.json(workspace, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to create workspace",
      },
      {
        status: 500,
      }
    );
  }
}