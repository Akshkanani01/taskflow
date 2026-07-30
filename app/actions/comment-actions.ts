"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { getWorkspaceRole } from "@/lib/rbac/server";
import { WorkspaceRole } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac/server";

import {
  NotificationPriority,
  NotificationType,
  Prisma,
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
async function getTaskWorkspaceId(
  taskId: string
) {
  const task =
    await prisma.task.findUnique({
      where: {
        id: taskId,
      },

      select: {
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

  return task.space.workspaceId;
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
export async function createComment({
  taskId,
  content,
}: CreateCommentInput) {
  const user = await getCurrentUser();

  const value = content.trim();

  if (!value) {
    throw new Error("Comment is required");
  }

  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
    include: {
      space: {
        select: {
          workspaceId: true,
        },
      },
      taskAssignees: true,
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  await requirePermission(
    user.id,
    task.space.workspaceId,
    "task.comment.create"
  );

  await prisma.$transaction(async (tx) => {
    const comment =
      await tx.taskComment.create({
        data: {
          taskId,
          userId: user.id,
          content: value,
        },
      });

    await logActivity(
      tx,
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
          (assignee) =>
            assignee.userId !== user.id
        )
        .map((assignee) => ({
          userId: assignee.userId,
          title: "New Comment",
          message: `${user.name || user.email} commented on "${task.title}".`,
          type: NotificationType.TASK_COMMENTED,
          priority:
            NotificationPriority.MEDIUM,
          link: `/dashboard/spaces/${task.spaceId}/lists/${task.projectId}/tasks/${task.id}`,
        }));

    if (notifications.length > 0) {
      await tx.notification.createMany({
        data: notifications,
      });
    }

    return comment;
  });

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
            space: {
              select: {
                workspaceId: true,
              },
            },
          },
        },
      },
    });

  if (!comment) {
    throw new Error(
      "Comment not found"
    );
  }

  await requirePermission(
    user.id,
    comment.task.space.workspaceId,
    "task.comment.delete"
  );

  const role = await getWorkspaceRole(
  user.id,
  comment.task.space.workspaceId
);

const isPrivileged =
  role === WorkspaceRole.OWNER ||
  role === WorkspaceRole.ADMIN ||
  role === WorkspaceRole.MANAGER;

if (
  !isPrivileged &&
  comment.userId !== user.id
) {
  throw new Error("Forbidden");
}

  await prisma.$transaction(
    async (tx) => {
      await logActivity(
        tx,
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
      include: {
        task: {
          select: {
            id: true,
            space: {
              select: {
                workspaceId: true,
              },
            },
          },
        },
      },
    });

  if (!comment) {
    throw new Error(
      "Comment not found"
    );
  }

  await requirePermission(
    user.id,
    comment.task.space.workspaceId,
    "task.comment.update"
  );

  const role = await getWorkspaceRole(
  user.id,
  comment.task.space.workspaceId
);

const isPrivileged =
  role === WorkspaceRole.OWNER ||
  role === WorkspaceRole.ADMIN ||
  role === WorkspaceRole.MANAGER;

if (
  !isPrivileged &&
  comment.userId !== user.id
) {
  throw new Error("Forbidden");
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
        tx,
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