"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  NotificationType,
  NotificationPriority,
} from "@prisma/client";
interface CreateCommentInput {
  taskId: string;
  content: string;
}

export async function createComment({
  taskId,
  content,
}: CreateCommentInput) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
    include: {
      taskAssignees: true,
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  await prisma.$transaction(async (tx) => {
    const comment = await tx.taskComment.create({
      data: {
        taskId,
        userId: session.user.id,
        content,
      },
    });

    await tx.taskActivity.create({
      data: {
        taskId,
        action: "COMMENT_ADDED",
        metadata: {
          commentId: comment.id,
          userId: session.user.id,
        },
      },
    });

    const notifications = task.taskAssignees
      .filter((a) => a.userId !== session.user.id)
      .map((a) => ({
        userId: a.userId,
        title: "New Comment",
        message: `${session.user.name ?? session.user.email} commented on "${task.title}".`,
        type: NotificationType.TASK_COMMENTED,
priority: NotificationPriority.MEDIUM,
      }));

    if (notifications.length > 0) {
      await tx.notification.createMany({
        data: notifications,
      });
    }
  });

  revalidatePath("/dashboard");
}
export async function deleteComment(
  commentId: string
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const comment =
    await prisma.taskComment.findUnique({
      where: {
        id: commentId,
      },
    });

  if (!comment) {
    throw new Error("Comment not found");
  }

  if (comment.userId !== session.user.id) {
    throw new Error("Forbidden");
  }

  await prisma.taskComment.delete({
    where: {
      id: commentId,
    },
  });

  revalidatePath("/dashboard");
}
export async function updateComment(
  commentId: string,
  content: string
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const comment =
    await prisma.taskComment.findUnique({
      where: {
        id: commentId,
      },
    });

  if (!comment) {
    throw new Error("Comment not found");
  }

  if (comment.userId !== session.user.id) {
    throw new Error("Forbidden");
  }

  await prisma.taskComment.update({
    where: {
      id: commentId,
    },
    data: {
      content,
    },
  });

  revalidatePath("/dashboard");
}