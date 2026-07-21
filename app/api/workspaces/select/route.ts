import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { requireUser } from "@/lib/auth/require-user";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {
  try {
    const user =
      await requireUser();

    const {
      workspaceId,
    } = await req.json();

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

    const member =
      await prisma.workspaceMember.findUnique(
        {
          where: {
            workspaceId_userId: {
              workspaceId,
              userId:
                user.id,
            },
          },

          select: {
            workspaceId: true,
          },
        }
      );

    if (!member) {
      return NextResponse.json(
        {
          error:
            "Access denied.",
        },
        {
          status: 403,
        }
      );
    }

    const cookieStore =
      await cookies();

    cookieStore.set(
      "workspaceId",
      workspaceId,
      {
        path: "/",
        maxAge:
          60 *
          60 *
          24 *
          30,
        httpOnly: true,
        sameSite: "lax",
        secure:
          process.env
            .NODE_ENV ===
          "production",
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
          "Failed to select workspace.",
      },
      {
        status: 500,
      }
    );
  }
}