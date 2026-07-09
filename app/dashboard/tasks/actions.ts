"use server";

import { prisma } from "@/lib/prisma";
import { Priority } from "@prisma/client";

export async function createTask(formData: FormData) {
  const title = formData.get("title") as string;

  const description =
    (formData.get("description") as string) ?? "";

  const projectId =
    formData.get("projectId") as string;

  const spaceId = formData.get("spaceId") as string;

  const createdById = formData.get("createdById") as string;

  const priority =
    (formData.get("priority") as Priority) ??
    Priority.MEDIUM;

  const assignees =
    formData.getAll("assignees") as string[];

  if (!projectId) {
    throw new Error("projectId is missing");
  }

  if (!spaceId) {
    throw new Error("spaceId is missing");
  }

  if (!createdById) {
    throw new Error("createdById is missing");
  }

  const task = await prisma.task.create({
  data: {
    title,
    description,

    priority: priority as Priority,

    projectId,

    spaceId,

    createdById,

    taskAssignees: {
      create: assignees.map((userId) => ({
        userId,
      })),
    },
  },
});

  return task;
}