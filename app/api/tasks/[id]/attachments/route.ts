import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

/* ============================
   GET ATTACHMENTS
============================ */

export async function GET(
  _: NextRequest,
  { params }: Context
) {
  const session =
    await auth.api.getSession({
      headers: await headers(),
    });

  if (!session?.user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  const attachments =
    await prisma.taskAttachment.findMany({
      where: {
        taskId: id,
      },

      include: {
        uploader: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return NextResponse.json(
    attachments
  );
}

/* ============================
   CREATE ATTACHMENT
============================ */

export async function POST(
  req: NextRequest,
  { params }: Context
) {
  const session =
    await auth.api.getSession({
      headers: await headers(),
    });

  if (!session?.user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } =
    await params;

  const body =
    await req.json();

  const task =
    await prisma.task.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        title: true,
      },
    });

  if (!task) {
    return NextResponse.json(
      {
        message: "Task not found",
      },
      {
        status: 404,
      }
    );
  }

  const attachment =
    await prisma.taskAttachment.create({
      data: {
        taskId: id,

        uploaderId:
          session.user.id,

        name:
          body.name,

        url:
          body.url,

        extension:
          body.extension,

        mimeType:
          body.mimeType,

        size:
          body.size,
      },

      include: {
        uploader: true,
      },
    });
      /* ============================
     CREATE ACTIVITY
  ============================ */

  await prisma.taskActivity.create({
    data: {
      taskId: id,

      userId: session.user.id,

      action: "ATTACHMENT_UPLOADED",

      message: `${
        session.user.name ??
        session.user.email
      } uploaded "${attachment.name}"`,

      metadata: {
        attachmentId: attachment.id,
        fileName: attachment.name,
        fileSize: attachment.size,
        mimeType: attachment.mimeType,
      },
    },
  });

  /* ============================
     CREATE NOTIFICATIONS
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

          title: "Attachment Uploaded",

          message: `${
            session.user.name ??
            "Someone"
          } uploaded "${attachment.name}"`,

          type: "FILE_UPLOADED",

          priority: "LOW",

          link: `/dashboard/tasks/${id}`,
        })
      ),
    });
  }

  return NextResponse.json(
    attachment,
    {
      status: 201,
    }
  );
}