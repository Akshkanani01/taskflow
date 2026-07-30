"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/* ----------------------------------------
   Create Checklist
----------------------------------------- */

export async function createChecklist(
  taskId: string,
  title: string
) {
  if (!title.trim()) return;

  const item = await prisma.taskChecklist.create({
    data: {
      taskId,
      title,
      completed: false,
    },
  });

  await prisma.taskActivity.create({
    data: {
      taskId,
      action: "CHECKLIST_CREATED",
      metadata: {
        checklistId: item.id,
        title,
      },
    },
  });

  revalidatePath("/");

  return item;
}

/* ----------------------------------------
   Toggle Checklist
----------------------------------------- */

export async function toggleChecklist(
  id: string
) {
  const checklist =
    await prisma.taskChecklist.findUnique({
      where: {
        id,
      },
    });

  if (!checklist) return;

  const updated =
    await prisma.taskChecklist.update({
      where: {
        id,
      },
      data: {
        completed: !checklist.completed,
      },
    });

  await prisma.taskActivity.create({
    data: {
      taskId: checklist.taskId,
      action: updated.completed
        ? "CHECKLIST_COMPLETED"
        : "CHECKLIST_UNCOMPLETED",
      metadata: {
        checklistId: checklist.id,
        title: checklist.title,
      },
    },
  });

  revalidatePath("/");

  return updated;
}

/* ----------------------------------------
   Rename Checklist
----------------------------------------- */

export async function updateChecklist(
  id: string,
  title: string
) {
  const checklist =
    await prisma.taskChecklist.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });

  await prisma.taskActivity.create({
    data: {
      taskId: checklist.taskId,
      action: "CHECKLIST_UPDATED",
      metadata: {
        checklistId: checklist.id,
        title,
      },
    },
  });

  revalidatePath("/");

  return checklist;
}

/* ----------------------------------------
   Delete Checklist
----------------------------------------- */

export async function deleteChecklist(
  id: string
) {
  const checklist =
    await prisma.taskChecklist.findUnique({
      where: {
        id,
      },
    });

  if (!checklist) return;

  await prisma.taskChecklist.delete({
    where: {
      id,
    },
  });

  await prisma.taskActivity.create({
    data: {
      taskId: checklist.taskId,
      action: "CHECKLIST_DELETED",
      metadata: {
        checklistId: checklist.id,
        title: checklist.title,
      },
    },
  });

  revalidatePath("/");

  return {
    success: true,
  };
}