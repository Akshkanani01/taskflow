import {
  NotificationPriority,
  NotificationType,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { createNotification } from "@/lib/notifications";
type TaskWithRelations =
  Awaited<
    ReturnType<typeof getTask>
  > extends infer T
    ? NonNullable<T>
    : never;

function uniqueIds(ids: string[]) {
  return [...new Set(ids)];
}


function getTaskLink(
  task: TaskWithRelations
) {
  return `/dashboard/spaces/${task.spaceId}/lists/${task.projectId}/tasks/${task.id}`;
}

async function notifyTaskUsers(
  task: TaskWithRelations,
  data: {
    title: string;
    message: string;
    type: NotificationType;
    priority?: NotificationPriority;
  }
) {
  const assigneeIds = uniqueIds(
    task.taskAssignees.map(
      (a) => a.userId
    )
  );

  if (!assigneeIds.length) {
    return;
  }

  await Promise.all(
    assigneeIds.map((userId) =>
      createNotification({
        userId,

        title: data.title,

        message: data.message,

        type: data.type,

        priority:
          data.priority ??
          NotificationPriority.MEDIUM,

        link: getTaskLink(task),
      })
    )
  );
}
async function getTask(taskId: string) {
  return prisma.task.findUnique({
    where: {
      id: taskId,
    },
    include: {
      taskAssignees: true,
    },
  });
}
/**
 * ==========================================
 * Task Created
 * ==========================================
 */

export async function notifyTaskCreated(
  taskId: string,
  actor: string
) {
  const task =
    await getTask(taskId);

  if (!task) {
    return;
  }

  await notifyTaskUsers(task, {
    title: "Task Created",

    message: `${actor} created "${task.title}".`,

    type:
      NotificationType.TASK_CREATED,
  });
}

/**
 * ==========================================
 * Task Assigned
 * ==========================================
 */

export async function notifyTaskAssigned(
  taskId: string,
  actor: string,
  assignedUsers: string[]
) {
  const task =
    await getTask(taskId);

  if (!task) {
    return;
  }

  if (!assignedUsers.length) {
    return;
  }

  await Promise.all(
    uniqueIds(
      assignedUsers
    ).map((userId) =>
      createNotification({
        userId,

        title: "Task Assigned",

        message: `${actor} assigned "${task.title}" to you.`,

        type:
          NotificationType.TASK_ASSIGNED,

        priority:
          NotificationPriority.MEDIUM,

        link:
          getTaskLink(task),
      })
    )
  );
}

/**
 * ==========================================
 * Task Completed
 * ==========================================
 */

export async function notifyTaskCompleted(
  taskId: string,
  actor: string
) {
  const task =
    await getTask(taskId);

  if (!task) {
    return;
  }

  await notifyTaskUsers(task, {
    title: "Task Completed",

    message: `${actor} completed "${task.title}".`,

    type:
      NotificationType.TASK_COMPLETED,

    priority:
      NotificationPriority.HIGH,
  });
}

/**
 * ==========================================
 * Task Status Changed
 * ==========================================
 */

export async function notifyTaskStatusChanged(
  taskId: string,
  actor: string,
  status: string
) {
  const task = await getTask(taskId);

  if (!task) {
    return;
  }

  await notifyTaskUsers(task, {
    title: "Status Updated",

    message: `${actor} changed the status to "${status}".`,

    type:
      NotificationType.TASK_STATUS_CHANGED,
  });
}

/**
 * ==========================================
 * Task Priority Changed
 * ==========================================
 */

export async function notifyTaskPriorityChanged(
  taskId: string,
  actor: string,
  priority: string
) {
  const task = await getTask(taskId);

  if (!task) {
    return;
  }

  await notifyTaskUsers(task, {
    title: "Priority Updated",

    message: `${actor} changed priority to "${priority}".`,

    type:
      NotificationType.TASK_PRIORITY_CHANGED,
  });
}

/**
 * ==========================================
 * Task Title Changed
 * ==========================================
 */

export async function notifyTaskTitleChanged(
  taskId: string,
  actor: string,
  title: string
) {
  const task = await getTask(taskId);

  if (!task) {
    return;
  }

  await notifyTaskUsers(task, {
    title: "Task Renamed",

    message: `${actor} renamed the task to "${title}".`,

    type:
      NotificationType.TASK_TITLE_CHANGED,
  });
}

/**
 * ==========================================
 * Task Description Changed
 * ==========================================
 */

export async function notifyTaskDescriptionChanged(
  taskId: string,
  actor: string
) {
  const task = await getTask(taskId);

  if (!task) {
    return;
  }

  await notifyTaskUsers(task, {
    title: "Description Updated",

    message: `${actor} updated the task description.`,

    type:
      NotificationType.TASK_DESCRIPTION_CHANGED,
  });
}

/**
 * ==========================================
 * Due Date Changed
 * ==========================================
 */

export async function notifyTaskDueDateChanged(
  taskId: string,
  actor: string
) {
  const task = await getTask(taskId);

  if (!task) {
    return;
  }

  await notifyTaskUsers(task, {
    title: "Due Date Updated",

    message: `${actor} updated the due date.`,

    type:
      NotificationType.TASK_DUE_DATE_CHANGED,
  });
}

/**
 * ==========================================
 * Estimate Changed
 * ==========================================
 */

export async function notifyTaskEstimateChanged(
  taskId: string,
  actor: string
) {
  const task = await getTask(taskId);

  if (!task) {
    return;
  }

  await notifyTaskUsers(task, {
    title: "Estimate Updated",

    message: `${actor} updated the estimate.`,

    type:
      NotificationType.TASK_ESTIMATE_CHANGED,
  });
}

/**
 * ==========================================
 * Task Archived
 * ==========================================
 */

export async function notifyTaskArchived(
  taskId: string,
  actor: string
) {
  const task = await getTask(taskId);

  if (!task) {
    return;
  }

  await notifyTaskUsers(task, {
    title: "Task Archived",

    message: `${actor} archived "${task.title}".`,

    type:
      NotificationType.TASK_ARCHIVED,
  });
}

/**
 * ==========================================
 * Task Restored
 * ==========================================
 */

export async function notifyTaskRestored(
  taskId: string,
  actor: string
) {
  const task = await getTask(taskId);

  if (!task) {
    return;
  }

  await notifyTaskUsers(task, {
    title: "Task Restored",

    message: `${actor} restored "${task.title}".`,

    type:
      NotificationType.TASK_RESTORED,
  });
}

/**
 * ==========================================
 * Task Deleted
 * ==========================================
 */

export async function notifyTaskDeleted(
  taskId: string,
  actor: string
) {
  const task = await getTask(taskId);

  if (!task) {
    return;
  }

  await notifyTaskUsers(task, {
    title: "Task Deleted",

    message: `${actor} deleted "${task.title}".`,

    type:
      NotificationType.TASK_DELETED,

    priority:
      NotificationPriority.HIGH,
  });
}

/**
 * ==========================================
 * Task Duplicated
 * ==========================================
 */

export async function notifyTaskDuplicated(
  taskId: string,
  actor: string
) {
  const task = await getTask(taskId);

  if (!task) {
    return;
  }

  await notifyTaskUsers(task, {
    title: "Task Duplicated",

    message: `${actor} duplicated "${task.title}".`,

    type:
      NotificationType.TASK_DUPLICATED,
  });
}