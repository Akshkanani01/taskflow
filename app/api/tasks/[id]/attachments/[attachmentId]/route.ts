import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface Context {
  params: Promise<{
    id: string;
    attachmentId: string;
  }>;
}

export async function DELETE(
  _: NextRequest,
  { params }: Context
) {
  const session =
    await auth.api.getSession({
      headers: await headers(),
    });

  if (!session?.user) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const {
    id,
    attachmentId,
  } = await params;

  const attachment =
    await prisma.taskAttachment.findUnique({
      where: {
        id: attachmentId,
      },

      include: {
        task: true,
      },
    });

  if (!attachment) {
    return NextResponse.json(
      {
        message: "Attachment not found",
      },
      {
        status: 404,
      }
    );
  }

  if (attachment.taskId !== id) {
    return NextResponse.json(
      {
        message: "Invalid attachment",
      },
      {
        status: 400,
      }
    );
  }
    /* ============================
     PERMISSION CHECK
  ============================ */

  const membership =
    await prisma.spaceMember.findFirst({
      where: {
        spaceId: attachment.task.spaceId,
        userId: session.user.id,
      },
      select: {
        role: true,
      },
    });

  const canDelete =
    attachment.uploaderId === session.user.id ||
    membership?.role === "OWNER" ||
    membership?.role === "ADMIN" ||
    membership?.role === "MANAGER";

  if (!canDelete) {
    return NextResponse.json(
      {
        message:
          "You don't have permission to delete this attachment.",
      },
      {
        status: 403,
      }
    );
  }

  /* ============================
     DELETE ATTACHMENT
  ============================ */

  await prisma.taskAttachment.delete({
    where: {
      id: attachmentId,
    },
  });

  /* ============================
     CREATE ACTIVITY
  ============================ */

  await prisma.taskActivity.create({
    data: {
      taskId: id,

      userId: session.user.id,

      action: "ATTACHMENT_DELETED",

      message: `${
        session.user.name ??
        session.user.email
      } deleted "${attachment.name}"`,

      metadata: {
        attachmentId,
        fileName: attachment.name,
      },
    },
  });

  /* ============================
     NOTIFICATIONS
  ============================ */

  const assignees =
    await prisma.taskAssignee.findMany({
      where: {
        taskId: id,
      },
      select: {
        userId: true,
      },
    });

  const recipients =
    assignees
      .map((a) => a.userId)
      .filter(
        (userId) =>
          userId !== session.user.id
      );

  if (recipients.length) {
    await prisma.notification.createMany({
      data: recipients.map(
        (userId) => ({
          userId,

          title: "Attachment Deleted",

          message: `${
            session.user.name ??
            "Someone"
          } removed "${attachment.name}".`,

          type: "FILE_UPLOADED",

          priority: "LOW",

          link: `/dashboard/tasks/${id}`,
        })
      ),
    });
  }

  return NextResponse.json({
    success: true,
  });
}