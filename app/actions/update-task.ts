"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  Priority,
  TaskStatus,
} from "@prisma/client";

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
export async function updateTaskDescription(
  taskId: string,
  description: string
) {
  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      description,
    },
  });

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
export async function updateTaskAssignee(
  taskId: string,
  userId: string
) {
  await prisma.taskAssignee.deleteMany({
    where: {
      taskId,
    },
  });

  await prisma.taskAssignee.create({
    data: {
      taskId,
      userId,
    },
  });

  revalidatePath("/");
}