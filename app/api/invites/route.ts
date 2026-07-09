import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createWorkspaceInvite } from "@/lib/invite";
import { sendWorkspaceInviteEmail } from "@/lib/mail";

export async function POST(req: NextRequest) {
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

    const body = await req.json();

    const {
      workspaceId,
      spaceId,
      email,
      role,
    } = body;

    if (
      !workspaceId ||
      !email ||
      !role
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields.",
        },
        {
          status: 400,
        }
      );
    }

    const workspace =
      await prisma.workspace.findUnique({
        where: {
          id: workspaceId,
        },
        select: {
          id: true,
          name: true,
        },
      });

    if (!workspace) {
      return NextResponse.json(
        {
          success: false,
          message: "Workspace not found.",
        },
        {
          status: 404,
        }
      );
    }

    const invite =
      await createWorkspaceInvite({
        workspaceId,
        spaceId,
        email,
        role,
        invitedById:
          session.user.id,
      });

    const inviteUrl =
      `${process.env.NEXT_PUBLIC_APP_URL}/login?callbackURL=/invite/${invite.token}/accept`;

    if (
  process.env.NODE_ENV === "production"
) {
  await sendWorkspaceInviteEmail({
    email,
    inviterName:
      session.user.name ??
      session.user.email,
    workspaceName:
      workspace.name,
    inviteUrl,
  });
}

    return NextResponse.json({
  success: true,
  invite,
  inviteUrl,
  message:
    process.env.NODE_ENV === "production"
      ? "Invitation sent successfully."
      : "Invitation link generated.",
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
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