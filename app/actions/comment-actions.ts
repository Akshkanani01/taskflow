"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import {
  NotificationPriority,
  NotificationType,
} from "@prisma/client";

interface CreateCommentInput {
  taskId: string;
  content: string;
}

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

async function revalidateTask(
  taskId: string
) {
  const task =
    await prisma.task.findUnique({
      where: {
        id: taskId,
      },
      select: {
        id: true,
        spaceId: true,
        projectId: true,
      },
    });

  if (!task) return;

  revalidatePath(
    `/dashboard/spaces/${task.spaceId}/lists/${task.projectId}`
  );

  revalidatePath(
    `/dashboard/spaces/${task.spaceId}/lists/${task.projectId}/tasks/${task.id}`
  );
}

async function logActivity(
  taskId: string,
  userId: string,
  action: string,
  message: string,
  metadata?: any
) {
  await prisma.taskActivity.create({
    data: {
      taskId,
      userId,
      action,
      message,
      metadata,
    },
  });
}
export async function createComment({
  taskId,
  content,
}: CreateCommentInput) {

  const user =
    await getCurrentUser();

  const value =
    content.trim();

  if (!value) {
    throw new Error(
      "Comment is required"
    );
  }

  const task =
    await prisma.task.findUnique({

      where: {
        id: taskId,
      },

      include: {

        taskAssignees: true,

      },

    });

  if (!task) {
    throw new Error(
      "Task not found"
    );
  }

  await prisma.$transaction(
    async (tx) => {

      const comment =
        await tx.taskComment.create({

          data: {

            taskId,

            userId: user.id,

            content: value,

          },

        });
              await logActivity(
        taskId,
        user.id,
        "COMMENT_ADDED",
        `${user.name || user.email} added a comment`,
        {
          commentId: comment.id,
        }
      );

      const notifications =
        task.taskAssignees
          .filter(
            (a) =>
              a.userId !== user.id
          )
          .map((a) => ({

            userId: a.userId,

            title: "New Comment",

            message:
              `${user.name || user.email} commented on "${task.title}".`,

            type:
              NotificationType.TASK_COMMENTED,

            priority:
              NotificationPriority.MEDIUM,

            link:
              `/dashboard/spaces/${task.spaceId}/lists/${task.projectId}/tasks/${task.id}`,

          }));

      if (
        notifications.length > 0
      ) {

        await tx.notification.createMany({

          data: notifications,

        });

      }

      return comment;

    }
  );

  await revalidateTask(taskId);

}
export async function deleteComment(
  commentId: string
) {

  const user =
    await getCurrentUser();

  const comment =
    await prisma.taskComment.findUnique({

      where: {
        id: commentId,
      },

      include: {

        task: {
          select: {
            id: true,
          },
        },

      },

    });

  if (!comment) {
    throw new Error(
      "Comment not found"
    );
  }

  if (
    comment.userId !== user.id
  ) {
    throw new Error(
      "Forbidden"
    );
  }

  await prisma.$transaction(
    async (tx) => {

      await logActivity(
        comment.taskId,
        user.id,
        "COMMENT_DELETED",
        `${user.name || user.email} deleted a comment`,
        {
          commentId,
        }
      );

      await tx.taskComment.delete({

        where: {
          id: commentId,
        },

      });

    }
  );

  await revalidateTask(
    comment.taskId
  );

}
export async function updateComment(
  commentId: string,
  content: string
) {

  const user =
    await getCurrentUser();

  const value =
    content.trim();

  if (!value) {
    throw new Error(
      "Comment is required"
    );
  }

  const comment =
    await prisma.taskComment.findUnique({

      where: {
        id: commentId,
      },

    });

  if (!comment) {
    throw new Error(
      "Comment not found"
    );
  }

  if (
    comment.userId !== user.id
  ) {
    throw new Error(
      "Forbidden"
    );
  }

  await prisma.$transaction(
    async (tx) => {

      await tx.taskComment.update({

        where: {
          id: commentId,
        },

        data: {
          content: value,
        },

      });

      await logActivity(
        comment.taskId,
        user.id,
        "COMMENT_UPDATED",
        `${user.name || user.email} updated a comment`,
        {
          commentId,
        }
      );

    }
  );

  await revalidateTask(
    comment.taskId
  );

}