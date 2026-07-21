import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { createWorkspaceInvite } from "@/lib/invite";
import { sendWorkspaceInviteEmail } from "@/lib/mail";

import {
  PermissionError,
  Permissions,
  requirePermission,
} from "@/lib/rbac";

export async function POST(
  req: NextRequest
) {
  try {
    const session =
      await auth.api.getSession({
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

    const {
      workspaceId,
      spaceId,
      email,
      role,
    } = await req.json();

    if (
      !workspaceId ||
      !email ||
      !role
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields.",
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

try {
  await requirePermission(
    session.user.id,
    workspaceId,
    Permissions.TEAM_INVITE
  );
} catch (error: unknown) {
  if (error instanceof PermissionError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 403,
      }
    );
  }

  throw error;
}
const invite =
  await createWorkspaceInvite({
    workspaceId,
    spaceId,
    email,
    role,
    invitedById: session.user.id,
  });

    const host =
      req.headers.get("host");

    const protocol =
      process.env.NODE_ENV ===
      "development"
        ? "http"
        : "https";

    const inviteUrl =
      `${protocol}://${host}/invite/${invite.token}`;

    await sendWorkspaceInviteEmail({
      email,
      inviterName:
        session.user.name ??
        session.user.email,

      workspaceName:
        workspace.name,

      inviteUrl,
    });

    return NextResponse.json({
      success: true,
      message:
        "Invitation email sent successfully.",
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