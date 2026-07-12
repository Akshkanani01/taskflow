"use server";

import { revalidatePath } from "next/cache";

import {
  Priority,
  TaskStatus,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";

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
    },
  });
}
export async function createTask(
  input: CreateTaskInput
) {
  const data =
    CreateTaskSchema.parse(input);
console.log({
  createdById: data.createdById,
  projectId: data.projectId,
  spaceId: data.spaceId,
});
  const task =
    await prisma.task.create({

      data: {

        title:
          data.title.trim(),

        description:
          data.description?.trim() ||
          null,

        projectId:
          data.projectId,

        spaceId:
          data.spaceId,

        createdById:
          data.createdById,

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
    data.assignees.length
  ) {

    await prisma.taskAssignee.createMany({

      data:
        data.assignees.map(
          (userId) => ({
            taskId: task.id,
            userId,
          })
        ),

    });

  }

  revalidate(
    data.spaceId,
    data.projectId
  );

  return task;
}
export async function deleteTask(
  taskId: string
) {
  const task =
    await getTaskContext(taskId);

  if (!task) return;

  await prisma.task.delete({

    where: {
      id: taskId,
    },

  });

  revalidate(
    task.spaceId,
    task.projectId
  );
}

export async function updateTaskTitle(
  taskId: string,
  title: string
) {
  const task =
    await prisma.task.update({

      where: {
        id: taskId,
      },

      data: {
        title: title.trim(),
      },

      select: {
        spaceId: true,
        projectId: true,
      },

    });

  revalidate(
    task.spaceId,
    task.projectId
  );
}

export async function updateTaskDescription(
  taskId: string,
  description: string
) {
  const task =
    await prisma.task.update({

      where: {
        id: taskId,
      },

      data: {
        description:
          description.trim() || null,
      },

      select: {
        spaceId: true,
        projectId: true,
      },

    });

  revalidate(
    task.spaceId,
    task.projectId
  );
}
export async function updateTaskStatus(
  taskId: string,
  status: TaskStatus
) {
  const task =
    await prisma.task.update({

      where: {
        id: taskId,
      },

      data: {
        status,
      },

      select: {
        spaceId: true,
        projectId: true,
      },

    });

  revalidate(
    task.spaceId,
    task.projectId
  );
}

export async function updateTaskPriority(
  taskId: string,
  priority: Priority
) {
  const task =
    await prisma.task.update({

      where: {
        id: taskId,
      },

      data: {
        priority,
      },

      select: {
        spaceId: true,
        projectId: true,
      },

    });

  revalidate(
    task.spaceId,
    task.projectId
  );
}
export async function updateTaskAssignees(
  taskId: string,
  assignees: string[]
) {
  const task =
    await getTaskContext(taskId);

  if (!task) return;

  await prisma.taskAssignee.deleteMany({

    where: {
      taskId,
    },

  });

  if (assignees.length > 0) {

    await prisma.taskAssignee.createMany({

      data: assignees.map(
        (userId) => ({

          taskId,

          userId,

        })
      ),

    });

  }

  revalidate(
    task.spaceId,
    task.projectId
  );
}

export async function updateTaskDueDate(
  taskId: string,
  dueDate: Date | null
) {
  const task =
    await prisma.task.update({

      where: {
        id: taskId,
      },

      data: {
        dueDate,
      },

      select: {
        spaceId: true,
        projectId: true,
      },

    });

  revalidate(
    task.spaceId,
    task.projectId
  );
}

export async function updateTaskEstimate(
  taskId: string,
  estimatedHours: number | null
) {
  const task =
    await prisma.task.update({

      where: {
        id: taskId,
      },

      data: {
        estimatedHours,
      },

      select: {
        spaceId: true,
        projectId: true,
      },

    });

  revalidate(
    task.spaceId,
    task.projectId
  );
}

export async function archiveTask(
  taskId: string
) {
  const task =
    await prisma.task.update({

      where: {
        id: taskId,
      },

      data: {
        archived: true,
      },

      select: {
        spaceId: true,
        projectId: true,
      },

    });

  revalidate(
    task.spaceId,
    task.projectId
  );
}

export async function restoreTask(
  taskId: string
) {
  const task =
    await prisma.task.update({

      where: {
        id: taskId,
      },

      data: {
        archived: false,
      },

      select: {
        spaceId: true,
        projectId: true,
      },

    });

  revalidate(
    task.spaceId,
    task.projectId
  );
}
export async function duplicateTask(
  taskId: string
) {

  const task =
    await prisma.task.findUnique({

      where: {
        id: taskId,
      },

      include: {

        taskAssignees: true,

        checklists: true,

      },

    });

  if (!task) {
    return;
  }
    const newTask =
    await prisma.task.create({

      data: {

        title:
          `${task.title} (Copy)`,

        description:
          task.description,

        status:
          task.status,

        priority:
          task.priority,

        startDate:
          task.startDate,

        dueDate:
          task.dueDate,

        estimatedHours:
          task.estimatedHours,

        position:
          task.position + 1,

        archived: false,

        projectId:
          task.projectId,

        spaceId:
          task.spaceId,

        createdById:
          task.createdById,

      },

    });
      if (
    task.taskAssignees.length
  ) {

    await prisma.taskAssignee.createMany({

      data:
        task.taskAssignees.map(
          (assignee) => ({

            taskId:
              newTask.id,

            userId:
              assignee.userId,

          })
        ),

    });

  }
    if (
    task.checklists.length
  ) {

    await prisma.taskChecklist.createMany({

      data:
        task.checklists.map(
          (item) => ({

            taskId:
              newTask.id,

            title:
              item.title,

            completed:
              item.completed,

        

          })
        ),

    });

  }

  await prisma.taskActivity.create({

    data: {

      taskId:
        newTask.id,

      action:
        "TASK_DUPLICATED",

      message:
        "Task duplicated",

      userId:
        task.createdById,

    },

  });

  

  return newTask;

}