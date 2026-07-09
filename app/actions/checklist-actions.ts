"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createChecklistItem(
  taskId: string,
  title: string
) {
  if (!title.trim()) return;

  await prisma.taskChecklist.create({
    data: {
      taskId,
      title,
    },
  });

  await prisma.taskActivity.create({
    data: {
      taskId,
      action: "Checklist item created",
      metadata: {
        title,
      },
    },
  });

  revalidatePath("/");
}

export async function toggleChecklist(
  id: string
) {
  const item =
    await prisma.taskChecklist.findUnique({
      where: {
        id,
      },
    });

  if (!item) return;

  await prisma.taskChecklist.update({
    where: {
      id,
    },
    data: {
      completed: !item.completed,
    },
  });

  revalidatePath("/");
}

export async function updateChecklist(
  id: string,
  title: string
) {
  await prisma.taskChecklist.update({
    where: {
      id,
    },
    data: {
      title,
    },
  });

  revalidatePath("/");
}

export async function deleteChecklist(
  id: string
) {
  await prisma.taskChecklist.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
}