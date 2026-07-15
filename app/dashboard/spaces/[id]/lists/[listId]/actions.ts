"use server";

import { revalidatePath } from "next/cache";

import {
  Priority,
  TaskStatus,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";
import {
  notifyTaskCreated,
  notifyTaskAssigned,
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
  await recordTaskCreated(
  task.id,
  data.createdById,
  task.title
);

await notifyTaskCreated(
  task.id,
  "System"
);

if (data.assignees.length) {
  await notifyTaskAssigned(
    task.id,
    "System",
    data.assignees
  );
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
const deletedTask =
  await prisma.task.findUnique({
    where: {
      id: taskId,
    },
    select: {
      createdById: true,
    },
  });

if (deletedTask) {
  await recordTaskDeleted(
    taskId,
    deletedTask.createdById
  );

  await notifyTaskDeleted(
    taskId,
    "System"
  );
}
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
  createdById: true,
  spaceId: true,
  projectId: true,
},

    });
await recordTaskTitleChanged(
  taskId,
  task.createdById,
  title
);

await notifyTaskTitleChanged(
  taskId,
  "System",
  title
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
  createdById: true,
  spaceId: true,
  projectId: true,
},

    });
await recordTaskDescriptionChanged(
  taskId,
  task.createdById
);

await notifyTaskDescriptionChanged(
  taskId,
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
  const task =
    await prisma.task.update({

      where: {
        id: taskId,
      },

      data: {
        status,
      },

      select: {
  createdById: true,
  spaceId: true,
  projectId: true,
},

    });

    await recordTaskStatusChanged(
  taskId,
  task.createdById,
  status
);

await notifyTaskStatusChanged(
  taskId,
  "System",
  status
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
  const task =
    await prisma.task.update({

      where: {
        id: taskId,
      },

      data: {
        priority,
      },

      select: {
  createdById: true,
  spaceId: true,
  projectId: true,
},
    });

    await recordTaskPriorityChanged(
  taskId,
  task.createdById,
  priority
);

await notifyTaskPriorityChanged(
  taskId,
  "System",
  priority
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
const taskDetails =
  await prisma.task.findUnique({
    where: {
      id: taskId,
    },
    select: {
      createdById: true,
    },
  });

if (taskDetails) {
  await notifyTaskAssigned(
    taskId,
    "System",
    assignees
  );
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
  createdById: true,
  spaceId: true,
  projectId: true,
},

    });
await recordTaskDueDateChanged(
  taskId,
  task.createdById
);

await notifyTaskDueDateChanged(
  taskId,
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
  const task =
    await prisma.task.update({

      where: {
        id: taskId,
      },

      data: {
        estimatedHours,
      },

      select: {
  createdById: true,
  spaceId: true,
  projectId: true,
},
    });

    await recordTaskEstimateChanged(
  taskId,
  task.createdById
);

await notifyTaskEstimateChanged(
  taskId,
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
  const task =
    await prisma.task.update({

      where: {
        id: taskId,
      },

      data: {
        archived: true,
      },

      select: {
  createdById: true,
  spaceId: true,
  projectId: true,
},

    });
    await recordTaskArchived(
  taskId,
  task.createdById
);

await notifyTaskArchived(
  taskId,
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
  const task =
    await prisma.task.update({

      where: {
        id: taskId,
      },

      data: {
        archived: false,
      },

      select: {
  createdById: true,
  spaceId: true,
  projectId: true,
},

    });

    await recordTaskRestored(
  taskId,
  task.createdById
);

await notifyTaskRestored(
  taskId,
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

  await recordTaskDuplicated(
  newTask.id,
  task.createdById
);

await notifyTaskDuplicated(
  newTask.id,
  "System"
);

  
  revalidate(
  task.spaceId,
  task.projectId
);
  return newTask;

}