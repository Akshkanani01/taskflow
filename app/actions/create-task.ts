"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { Priority, TaskStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export type CreateTaskInput = {
  title: string;
  description?: string;

  projectId: string;
  spaceId: string;

  priority?: Priority;
  status?: TaskStatus;

  dueDate?: Date;
  estimatedHours?: number;

  assignees?: string[];
};

export async function createTask(
  input: CreateTaskInput
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (!input.title.trim()) {
    throw new Error("Task title is required.");
  }

  const lastTask = await prisma.task.findFirst({
    where: {
      projectId: input.projectId,
    },
    orderBy: {
      position: "desc",
    },
    select: {
      position: true,
    },
  });

  const nextPosition =
    (lastTask?.position ?? 0) + 1;

  const task = await prisma.$transaction(
    async (tx) => {
      const createdTask =
        await tx.task.create({
          data: {
            title: input.title.trim(),

            description:
              input.description?.trim() ||
              null,

            projectId:
              input.projectId,

            spaceId: input.spaceId,

            createdById:
              session.user.id,

            position: nextPosition,

            status:
              input.status ??
              TaskStatus.TODO,

            priority:
              input.priority ??
              Priority.MEDIUM,

            dueDate:
              input.dueDate ?? null,

            estimatedHours:
              input.estimatedHours ??
              null,

            taskAssignees:
              input.assignees?.length
                ? {
                    create:
                      input.assignees.map(
                        (userId) => ({
                          userId,
                        })
                      ),
                  }
                : undefined,
          },
        });

      await tx.taskActivity.create({
        data: {
          taskId: createdTask.id,

          action: "TASK_CREATED",

          metadata: {
            createdBy:
              session.user.id,
          },
        },
      });

      if (
        input.assignees &&
        input.assignees.length > 0
      ) {
        await tx.notification.createMany({
          data:
            input.assignees.map(
              (userId) => ({
                userId,

                title:
                  "Task Assigned",

                message: `You were assigned "${createdTask.title}".`,

                type:
                  "TASK_ASSIGNED",

                priority:
                  "MEDIUM",
              })
            ),
        });
      }

      return createdTask;
    }
  );

  revalidatePath(
    `/dashboard/spaces/${input.spaceId}/lists/${input.projectId}`
  );

  return task;
}