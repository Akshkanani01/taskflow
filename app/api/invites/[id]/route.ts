import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(
  _req: NextRequest,
  { params }: Props
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
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

    const { id } = await params;

    const invite =
      await prisma.workspaceInvite.findUnique({
        where: {
          id,
        },
      });

    if (!invite) {
      return NextResponse.json(
        {
          success: false,
          message: "Invite not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (invite.status !== "PENDING") {
      return NextResponse.json(
        {
          success: false,
          message: "Invite already processed.",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.workspaceInvite.update({
      where: {
        id,
      },
      data: {
        status: "REVOKED",
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}