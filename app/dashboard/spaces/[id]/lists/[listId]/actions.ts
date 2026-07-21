"use server";

import { revalidatePath } from "next/cache";

import {
  Priority,
  TaskStatus,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";

import { requireUser } from "@/lib/auth/require-user";
import { requireProject } from "@/lib/auth/require-project";

import { Permissions } from "@/lib/rbac/permissions";
import { requirePermission } from "@/lib/rbac/server";

import {
  notifyTaskAssigned,
  notifyTaskCreated,
  notifyTaskTitleChanged,
  notifyTaskDescriptionChanged,
  notifyTaskStatusChanged,
  notifyTaskPriorityChanged,
  notifyTaskDueDateChanged,
  notifyTaskEstimateChanged,
  notifyTaskArchived,
  notifyTaskRestored,
  notifyTaskDeleted,
  notifyTaskDuplicated,
} from "@/lib/task-notifications";

import {
  recordTaskCreated,
  recordTaskTitleChanged,
  recordTaskDescriptionChanged,
  recordTaskStatusChanged,
  recordTaskPriorityChanged,
  recordTaskDueDateChanged,
  recordTaskEstimateChanged,
  recordTaskArchived,
  recordTaskRestored,
  recordTaskDeleted,
  recordTaskDuplicated,
} from "@/lib/task-activity";

import {
  CreateTaskInput,
  CreateTaskSchema,
} from "@/lib/validations/task";

function revalidate(
  spaceId: string,
  projectId: string
) {
  revalidatePath(
    `/dashboard/spaces/${spaceId}/lists/${projectId}`
  );

  revalidatePath(
    `/dashboard/spaces/${spaceId}`
  );
}

async function getTaskContext(
  taskId: string
) {
  return prisma.task.findUnique({
    where: {
      id: taskId,
    },

    select: {
      id: true,

      spaceId: true,

      projectId: true,

      createdById: true,

      project: {
        select: {
          spaceId: true,

          space: {
            select: {
              workspaceId: true,
            },
          },
        },
      },
    },
  });
}

export async function createTask(
  input: CreateTaskInput
) {
  const user =
    await requireUser();

  const data =
    CreateTaskSchema.parse(input);

  const project =
    await requireProject(
      data.projectId
    );

  await requirePermission(
    user.id,
    project.space.workspaceId,
    Permissions.TASK_CREATE
  );

  const task =
    await prisma.$transaction(
      async (tx) => {
        const createdTask =
          await tx.task.create({
            data: {
              title:
                data.title.trim(),

              description:
                data.description?.trim() ||
                null,

              projectId:
                project.id,

              spaceId:
                project.spaceId,

              createdById:
                user.id,

              priority:
                data.priority,

              status:
                data.status,

              dueDate:
                data.dueDate,

              estimatedHours:
                data.estimatedHours,
            },
          });

        if (
          data.assignees.length > 0
        ) {
          await tx.taskAssignee.createMany({
            data:
              data.assignees.map(
                (
                  assigneeId
                ) => ({
                  taskId:
                    createdTask.id,
                  userId:
                    assigneeId,
                })
              ),
          });
        }

        return createdTask;
      }
    );

    await recordTaskCreated(
      task.id,
      user.id,
      task.title
    );

    await notifyTaskCreated(
      task.id,
      "System"
    );

    if (
      data.assignees.length > 0
    ) {
      await notifyTaskAssigned(
        task.id,
        "System",
        data.assignees
      );
    }

    revalidate(
      project.spaceId,
      project.id
    );

    return task;
}
export async function deleteTask(
  taskId: string
) {
  const user =
    await requireUser();

  const task =
    await getTaskContext(taskId);

  if (!task) {
    throw new Error(
      "Task not found."
    );
  }

  await requirePermission(
    user.id,
    task.project.space.workspaceId,
    Permissions.TASK_DELETE
  );

  await prisma.$transaction(
    async (tx) => {
      await recordTaskDeleted(
        task.id,
        user.id
      );

      await notifyTaskDeleted(
        task.id,
        "System"
      );

      await tx.task.delete({
        where: {
          id: task.id,
        },
      });
    }
  );

  revalidate(
    task.spaceId,
    task.projectId
  );
}

export async function updateTaskTitle(
  taskId: string,
  title: string
) {
  const user =
    await requireUser();

  const context =
    await getTaskContext(taskId);

  if (!context) {
    throw new Error(
      "Task not found."
    );
  }

  await requirePermission(
    user.id,
    context.project.space.workspaceId,
    Permissions.TASK_UPDATE
  );

  const task =
    await prisma.task.update({
      where: {
        id: taskId,
      },

      data: {
        title:
          title.trim(),
      },

      select: {
        id: true,
        title: true,
        spaceId: true,
        projectId: true,
      },
    });

  await recordTaskTitleChanged(
    task.id,
    user.id,
    task.title
  );

  await notifyTaskTitleChanged(
    task.id,
    "System",
    task.title
  );

  revalidate(
    task.spaceId,
    task.projectId
  );
}

export async function updateTaskDescription(
  taskId: string,
  description: string
) {
  const user =
    await requireUser();

  const context =
    await getTaskContext(taskId);

  if (!context) {
    throw new Error(
      "Task not found."
    );
  }

  await requirePermission(
    user.id,
    context.project.space.workspaceId,
    Permissions.TASK_UPDATE
  );

  const task =
    await prisma.task.update({
      where: {
        id: taskId,
      },

      data: {
        description:
          description.trim() ||
          null,
      },

      select: {
        id: true,
        spaceId: true,
        projectId: true,
      },
    });

  await recordTaskDescriptionChanged(
    task.id,
    user.id
  );

  await notifyTaskDescriptionChanged(
    task.id,
    "System"
  );

  revalidate(
    task.spaceId,
    task.projectId
  );
}
export async function updateTaskStatus(
  taskId: string,
  status: TaskStatus
) {
  const user =
    await requireUser();

  const context =
    await getTaskContext(taskId);

  if (!context) {
    throw new Error(
      "Task not found."
    );
  }

  await requirePermission(
    user.id,
    context.project.space.workspaceId,
    Permissions.TASK_STATUS_UPDATE
  );

  const task =
    await prisma.task.update({
      where: {
        id: taskId,
      },

      data: {
        status,
      },

      select: {
        id: true,
        status: true,
        spaceId: true,
        projectId: true,
      },
    });

  await recordTaskStatusChanged(
    task.id,
    user.id,
    task.status
  );

  await notifyTaskStatusChanged(
    task.id,
    "System",
    task.status
  );

  revalidate(
    task.spaceId,
    task.projectId
  );
}

export async function updateTaskPriority(
  taskId: string,
  priority: Priority
) {
  const user =
    await requireUser();

  const context =
    await getTaskContext(taskId);

  if (!context) {
    throw new Error(
      "Task not found."
    );
  }

  await requirePermission(
    user.id,
    context.project.space.workspaceId,
    Permissions.TASK_PRIORITY_UPDATE
  );

  const task =
    await prisma.task.update({
      where: {
        id: taskId,
      },

      data: {
        priority,
      },

      select: {
        id: true,
        priority: true,
        spaceId: true,
        projectId: true,
      },
    });

  await recordTaskPriorityChanged(
    task.id,
    user.id,
    task.priority
  );

  await notifyTaskPriorityChanged(
    task.id,
    "System",
    task.priority
  );

  revalidate(
    task.spaceId,
    task.projectId
  );
}

export async function updateTaskAssignees(
  taskId: string,
  assignees: string[]
) {
  const user =
    await requireUser();

  const context =
    await getTaskContext(taskId);

  if (!context) {
    throw new Error(
      "Task not found."
    );
  }

  await requirePermission(
    user.id,
    context.project.space.workspaceId,
    Permissions.TASK_ASSIGN
  );

  await prisma.$transaction(
    async (tx) => {
      await tx.taskAssignee.deleteMany({
        where: {
          taskId,
        },
      });

      if (
        assignees.length > 0
      ) {
        await tx.taskAssignee.createMany({
          data:
            assignees.map(
              (userId) => ({
                taskId,
                userId,
              })
            ),
        });
      }
    }
  );

  if (
    assignees.length > 0
  ) {
    await notifyTaskAssigned(
      taskId,
      "System",
      assignees
    );
  }

  revalidate(
    context.spaceId,
    context.projectId
  );
}
export async function updateTaskDueDate(
  taskId: string,
  dueDate: Date | null
) {
  const user =
    await requireUser();

  const context =
    await getTaskContext(taskId);

  if (!context) {
    throw new Error(
      "Task not found."
    );
  }

  await requirePermission(
    user.id,
    context.project.space.workspaceId,
    Permissions.TASK_DUE_DATE_UPDATE
  );

  const task =
    await prisma.task.update({
      where: {
        id: taskId,
      },

      data: {
        dueDate,
      },

      select: {
        id: true,
        spaceId: true,
        projectId: true,
      },
    });

  await recordTaskDueDateChanged(
    task.id,
    user.id
  );

  await notifyTaskDueDateChanged(
    task.id,
    "System"
  );

  revalidate(
    task.spaceId,
    task.projectId
  );
}

export async function updateTaskEstimate(
  taskId: string,
  estimatedHours: number | null
) {
  const user =
    await requireUser();

  const context =
    await getTaskContext(taskId);

  if (!context) {
    throw new Error(
      "Task not found."
    );
  }

  await requirePermission(
    user.id,
    context.project.space.workspaceId,
    Permissions.TASK_UPDATE
  );

  const task =
    await prisma.task.update({
      where: {
        id: taskId,
      },

      data: {
        estimatedHours,
      },

      select: {
        id: true,
        spaceId: true,
        projectId: true,
      },
    });

  await recordTaskEstimateChanged(
    task.id,
    user.id
  );

  await notifyTaskEstimateChanged(
    task.id,
    "System"
  );

  revalidate(
    task.spaceId,
    task.projectId
  );
}

export async function archiveTask(
  taskId: string
) {
  const user =
    await requireUser();

  const context =
    await getTaskContext(taskId);

  if (!context) {
    throw new Error(
      "Task not found."
    );
  }

  await requirePermission(
    user.id,
    context.project.space.workspaceId,
    Permissions.TASK_UPDATE
  );

  const task =
    await prisma.task.update({
      where: {
        id: taskId,
      },

      data: {
        archived: true,
      },

      select: {
        id: true,
        spaceId: true,
        projectId: true,
      },
    });

  await recordTaskArchived(
    task.id,
    user.id
  );

  await notifyTaskArchived(
    task.id,
    "System"
  );

  revalidate(
    task.spaceId,
    task.projectId
  );
}
export async function restoreTask(
  taskId: string
) {
  const user =
    await requireUser();

  const context =
    await getTaskContext(taskId);

  if (!context) {
    throw new Error(
      "Task not found."
    );
  }

  await requirePermission(
    user.id,
    context.project.space.workspaceId,
    Permissions.TASK_UPDATE
  );

  const task =
    await prisma.task.update({
      where: {
        id: taskId,
      },

      data: {
        archived: false,
      },

      select: {
        id: true,
        spaceId: true,
        projectId: true,
      },
    });

  await recordTaskRestored(
    task.id,
    user.id
  );

  await notifyTaskRestored(
    task.id,
    "System"
  );

  revalidate(
    task.spaceId,
    task.projectId
  );
}

export async function duplicateTask(
  taskId: string
) {
  const user =
    await requireUser();

  const context =
    await getTaskContext(taskId);

  if (!context) {
    throw new Error(
      "Task not found."
    );
  }

  await requirePermission(
    user.id,
    context.project.space.workspaceId,
    Permissions.TASK_CREATE
  );

  const sourceTask =
    await prisma.task.findUnique({
      where: {
        id: taskId,
      },

      include: {
        taskAssignees: true,
        checklists: true,
      },
    });

  if (!sourceTask) {
    throw new Error(
      "Task not found."
    );
  }

  const duplicatedTask =
    await prisma.$transaction(
      async (tx) => {
        const task =
          await tx.task.create({
            data: {
              title:
                `${sourceTask.title} (Copy)`,

              description:
                sourceTask.description,

              status:
                sourceTask.status,

              priority:
                sourceTask.priority,

              startDate:
                sourceTask.startDate,

              dueDate:
                sourceTask.dueDate,

              estimatedHours:
                sourceTask.estimatedHours,

              position:
                sourceTask.position +
                1,

              archived: false,

              projectId:
                sourceTask.projectId,

              spaceId:
                sourceTask.spaceId,

              createdById:
                user.id,
            },
          });

        if (
          sourceTask.taskAssignees
            .length > 0
        ) {
          await tx.taskAssignee.createMany(
            {
              data:
                sourceTask.taskAssignees.map(
                  (
                    assignee
                  ) => ({
                    taskId:
                      task.id,
                    userId:
                      assignee.userId,
                  })
                ),
            }
          );
        }

        if (
          sourceTask.checklists
            .length > 0
        ) {
          await tx.taskChecklist.createMany(
            {
              data:
                sourceTask.checklists.map(
                  (
                    checklist
                  ) => ({
                    taskId:
                      task.id,

                    title:
                      checklist.title,

                    completed:
                      checklist.completed,
                  })
                ),
            }
          );
        }

        return task;
      }
    );

  await recordTaskDuplicated(
    duplicatedTask.id,
    user.id
  );

  await notifyTaskDuplicated(
    duplicatedTask.id,
    "System"
  );

  revalidate(
    duplicatedTask.spaceId,
    duplicatedTask.projectId
  );

  return duplicatedTask;
}