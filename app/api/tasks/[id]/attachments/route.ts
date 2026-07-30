import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import {
  NotificationPriority,
  NotificationType,
  Prisma,
} from "@prisma/client";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { requirePermission } from "@/lib/rbac/server";
interface Context {
  params: Promise<{
    id: string;
  }>;
}

async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return session.user;
}

async function getTask(taskId: string) {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
    select: {
      id: true,
      title: true,
      projectId: true,
      spaceId: true,
      space: {
        select: {
          workspaceId: true,
        },
      },
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
}

async function revalidateTask(task: {
  id: string;
  spaceId: string;
  projectId: string;
}) {
  revalidatePath(
    `/dashboard/spaces/${task.spaceId}/lists/${task.projectId}`
  );

  revalidatePath(
    `/dashboard/spaces/${task.spaceId}/lists/${task.projectId}/tasks/${task.id}`
  );
}

async function logActivity(
  tx: Prisma.TransactionClient,
  taskId: string,
  userId: string,
  action: string,
  message: string,
  metadata?: Prisma.InputJsonValue
) {
  await tx.taskActivity.create({
    data: {
      taskId,
      userId,
      action,
      message,
      metadata,
    },
  });
}


/* ============================
   GET ATTACHMENTS
============================ */

export async function GET(
  _: NextRequest,
  { params }: Context
) {
  try {
    const user =
      await getCurrentUser();

    const { id } =
      await params;

    const task =
      await getTask(id);

    await requirePermission(
      user.id,
      task.space.workspaceId,
      "task.view"
    );

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
  } catch (error) {
    if (
      error instanceof Error &&
      error.message ===
        "Unauthorized"
    ) {
      return NextResponse.json(
        {
          message:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    if (
      error instanceof Error &&
      error.message ===
        "Task not found"
    ) {
      return NextResponse.json(
        {
          message:
            "Task not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message:
          "Forbidden",
      },
      {
        status: 403,
      }
    );
  }
}
/* ============================
   CREATE ATTACHMENT
============================ */

export async function POST(
  req: NextRequest,
  { params }: Context
) {
  const user =
  await getCurrentUser();

const { id } =
  await params;

const body =
  await req.json();

const task =
  await getTask(id);

await requirePermission(
  user.id,
  task.space.workspaceId,
  "task.attachment.upload"
);

  const attachment =
  await prisma.$transaction(
    async (tx) => {
      const attachment =
        await tx.taskAttachment.create({
      data: {
        taskId: id,

        uploaderId: user.id,

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

  await logActivity(
  tx,
  id,
  user.id,
  "ATTACHMENT_UPLOADED",
  `${user.name ?? user.email} uploaded "${attachment.name}"`,
  {
    attachmentId: attachment.id,
    fileName: attachment.name,
    fileSize: attachment.size,
    mimeType: attachment.mimeType,
  }
);

  /* ============================
     CREATE NOTIFICATIONS
  ============================ */

  const assignees =
    await tx.taskAssignee.findMany({
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
          userId !== user.id
      );

  if (recipients.length) {
    await tx.notification.createMany({
      data: recipients.map(
        (userId) => ({
          userId,

          title: "Attachment Uploaded",

          message: `${
            user.name ??
            "Someone"
          } uploaded "${attachment.name}"`,

          type: NotificationType.FILE_UPLOADED,

          priority: NotificationPriority.LOW,

          link: `/dashboard/spaces/${task.spaceId}/lists/${task.projectId}/tasks/${task.id}`,
        })
      ),
    });
  }

  return attachment;
    }
  );

await revalidateTask(task);

return NextResponse.json(
  attachment,
  {
    status: 201,
  }
);
}