"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

interface CreateTaskInput {
  title: string;

  description?: string;

  projectId: string;

  priority?: "LOW" | "MEDIUM" | "HIGH";

  status?: "TODO" | "IN_PROGRESS" | "DONE";

  dueDate?: Date | null;

  assigneeIds?: string[];
}

export async function createTask(
  data: CreateTaskInput
) {
  try {
    // ==========================================
    // AUTH
    // ==========================================

    const session =
      await auth.api.getSession({
        headers: await headers(),
      });

    if (!session?.user) {
      throw new Error(
        "Unauthorized"
      );
    }

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!data.title.trim()) {
      throw new Error(
        "Task title is required"
      );
    }

    if (!data.projectId) {
      throw new Error(
        "Project is required"
      );
    }

    // ==========================================
    // PROJECT
    // ==========================================

    const project =
      await prisma.project.findUnique({
        where: {
          id: data.projectId,
        },

        include: {
          space: true,
        },
      });

    if (!project) {
      throw new Error(
        "Project not found"
      );
    }

    // ==========================================
    // TRANSACTION
    // ==========================================

    const task =
      await prisma.$transaction(
        async (tx) => {
          // ==========================
          // CREATE TASK
          // ==========================

          const createdTask =
            await tx.task.create({
              data: {
                title: data.title,

                description:
                  data.description,

                projectId:
                  project.id,

                spaceId:
                  project.spaceId,

                createdById:
                  session.user.id,

                priority:
                  data.priority ??
                  "MEDIUM",

                status:
                  data.status ??
                  "TODO",

                dueDate:
                  data.dueDate ??
                  null,
              },
            });

          // ==========================
          // ASSIGNEES
          // ==========================

          if (
            data.assigneeIds &&
            data.assigneeIds.length
          ) {
            await tx.taskAssignee.createMany(
              {
                data:
                  data.assigneeIds.map(
                    (userId) => ({
                      taskId:
                        createdTask.id,

                      userId,
                    })
                  ),

                skipDuplicates:
                  true,
              }
            );
          }

          // ==========================
          // ACTIVITY
          // ==========================

          await tx.taskActivity.create({
            data: {
              taskId:
                createdTask.id,

              action:
                "TASK_CREATED",

              metadata: {
                title:
                  createdTask.title,

                createdBy:
                  session.user.id,
              },
            },
          });

          return createdTask;
        }
      );

    // ==========================================
    // CACHE
    // ==========================================

    revalidatePath(
      "/dashboard/tasks"
    );

    revalidatePath(
      `/dashboard/tasks/${task.id}`
    );

    revalidatePath(
      "/dashboard"
    );

    return {
      success: true,
      task,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Failed to create task",
    };
  }
}
