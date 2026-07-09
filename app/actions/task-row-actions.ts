"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteTask(taskId: string) {
  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  revalidatePath("/");
}

export async function duplicateTask(taskId: string) {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
    include: {
      taskAssignees: true,
    },
  });

  if (!task) return;

  await prisma.task.create({
    data: {
      title: `${task.title} Copy`,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      spaceId: task.spaceId,
      projectId: task.projectId,
      createdById: task.createdById,

      taskAssignees: {
        create: task.taskAssignees.map((a) => ({
          userId: a.userId,
        })),
      },
    },
  });

  revalidatePath("/");
}