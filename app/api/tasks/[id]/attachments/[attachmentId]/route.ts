import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import {
  NotificationPriority,
  NotificationType,
  Prisma,
  WorkspaceRole,
} from "@prisma/client";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac/server";

async function getCurrentUser() {
  const session =
    await auth.api.getSession({
      headers: await headers(),
    });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return session.user;
}

async function getAttachment(
  attachmentId: string
) {
  const attachment =
    await prisma.taskAttachment.findUnique({
      where: {
        id: attachmentId,
      },

      include: {
        task: {
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
        },
      },
    });

  if (!attachment) {
    throw new Error(
      "Attachment not found"
    );
  }

  return attachment;
}

async function revalidateTask(
  task: {
    id: string;
    projectId: string;
    spaceId: string;
  }
) {
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
  try {
    const user =
      await getCurrentUser();

    const {
      id,
      attachmentId,
    } = await params;

    const attachment =
      await getAttachment(
        attachmentId
      );

    if (
      attachment.taskId !== id
    ) {
      return NextResponse.json(
        {
          message:
            "Invalid attachment",
        },
        {
          status: 400,
        }
      );
    }

    const role =
      await requirePermission(
        user.id,
        attachment.task.space
          .workspaceId,
        "task.attachment.delete"
      );

    const canDelete =
      attachment.uploaderId ===
        user.id ||
      role ===
        WorkspaceRole.OWNER ||
      role ===
        WorkspaceRole.ADMIN ||
      role ===
        WorkspaceRole.MANAGER;

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

  const deletedAttachment =
  await prisma.$transaction(
    async (tx) => {
      await tx.taskAttachment.delete({
        where: {
          id: attachmentId,
        },
      });

      await logActivity(
        tx,
        id,
        user.id,
        "ATTACHMENT_DELETED",
        `${user.name ?? user.email} deleted "${attachment.name}"`,
        {
          attachmentId,
          fileName: attachment.name,
        }
      );

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

              title:
                "Attachment Deleted",

              message: `${
                user.name ??
                "Someone"
              } removed "${
                attachment.name
              }".`,

              type:
                NotificationType.FILE_DELETED,

              priority:
                NotificationPriority.LOW,

              link: `/dashboard/spaces/${attachment.task.spaceId}/lists/${attachment.task.projectId}/tasks/${attachment.task.id}`,
            })
          ),
        });
      }

      return attachment;
    }
  );

    await revalidateTask({
      id: deletedAttachment.task.id,
      projectId:
        deletedAttachment.task.projectId,
      spaceId:
        deletedAttachment.task.spaceId,
    });

    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (
      error instanceof Error
    ) {
      switch (error.message) {
        case "Unauthorized":
          return NextResponse.json(
            {
              message:
                "Unauthorized",
            },
            {
              status: 401,
            }
          );

        case "Attachment not found":
          return NextResponse.json(
            {
              message:
                "Attachment not found",
            },
            {
              status: 404,
            }
          );
      }
    }

    return NextResponse.json(
      {
        message: "Forbidden",
      },
      {
        status: 403,
      }
    );
  }
}