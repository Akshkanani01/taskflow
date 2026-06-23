"use server";

import { prisma } from "@/lib/prisma";

export async function createTask(
  formData: FormData
) {
  const title =
    formData.get("title") as string;

  const description =
    formData.get("description") as string;

  const projectId =
    formData.get("projectId") as string;

  const priority =
    formData.get("priority") as string;

  const assignees =
    formData.getAll(
      "assignees"
    ) as string[];

  const task =
    await prisma.task.create({
      data: {
        title,
        description,
        priority,
        projectId,

        assignees: {
          create: assignees.map(
            (userId) => ({
              userId,
            })
          ),
        },
      },
    });

  return task;
}