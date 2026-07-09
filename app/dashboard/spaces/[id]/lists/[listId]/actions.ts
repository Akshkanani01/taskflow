"use server";

import { revalidatePath } from "next/cache";

import {
  Priority,
  TaskStatus,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type CreateTaskInput = {
  title: string;

  description?: string;

  projectId: string;

  spaceId: string;

  createdById: string;

  status: TaskStatus;

  priority: Priority;

  estimatedHours?: number;

  dueDate?: Date;

  assignees?: string[];
};

export async function createTask(
  input: CreateTaskInput
) {

  const task =
    await prisma.task.create({

      data: {

        title: input.title,

        description:
          input.description ||
          null,

        projectId:
          input.projectId,

        spaceId:
          input.spaceId,

        createdById:
          input.createdById,

        status:
          input.status,

        priority:
          input.priority,

        estimatedHours:
          input.estimatedHours ??
          null,

        dueDate:
          input.dueDate ??
          null,

      },

    });

  if (
    input.assignees &&
    input.assignees.length > 0
  ) {

    await prisma.taskAssignee.createMany({

      data:
        input.assignees.map(
          (userId) => ({

            taskId: task.id,

            userId,

          })
        ),

    });

  }

  revalidatePath("/");

  return task;

}
export async function updateTaskTitle(
  taskId: string,
  title: string
) {
  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      title,
    },
  });

  revalidatePath("/");
}

export async function updateTaskDescription(
  taskId: string,
  description: string
) {
  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      description:
        description.trim() || null,
    },
  });

  revalidatePath("/");
}

export async function updateTaskStatus(
  taskId: string,
  status: TaskStatus
) {
  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      status,
    },
  });

  revalidatePath("/");
}

export async function updateTaskPriority(
  taskId: string,
  priority: Priority
) {
  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      priority,
    },
  });

  revalidatePath("/");
}
export async function updateTaskAssignees(
  taskId: string,
  assignees: string[]
) {
  await prisma.taskAssignee.deleteMany({
    where: {
      taskId,
    },
  });

  if (assignees.length > 0) {
    await prisma.taskAssignee.createMany({
      data: assignees.map((userId) => ({
        taskId,
        userId,
      })),
    });
  }

  revalidatePath("/");
}

export async function updateTaskDueDate(
  taskId: string,
  dueDate: Date | null
) {
  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      dueDate,
    },
  });

  revalidatePath("/");
}

export async function updateTaskEstimate(
  taskId: string,
  estimatedHours: number | null
) {
  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      estimatedHours,
    },
  });

  revalidatePath("/");
}