import { prisma } from "@/lib/prisma";

type ActivityInput = {
  taskId: string;
  userId: string;
  action: string;
  message: string;
};

export async function createTaskActivity({
  taskId,
  userId,
  action,
  message,
}: ActivityInput) {
  return prisma.taskActivity.create({
    data: {
      taskId,
      userId,
      action,
      message,
    },
  });
}

/* ===========================
   Task Created
=========================== */

export async function recordTaskCreated(
  taskId: string,
  userId: string,
  title: string
) {
  return createTaskActivity({
    taskId,
    userId,
    action: "TASK_CREATED",
    message: `Created task "${title}"`,
  });
}

/* ===========================
   Task Updated
=========================== */

export async function recordTaskTitleChanged(
  taskId: string,
  userId: string,
  title: string
) {
  return createTaskActivity({
    taskId,
    userId,
    action: "TASK_TITLE_CHANGED",
    message: `Renamed task to "${title}"`,
  });
}

export async function recordTaskDescriptionChanged(
  taskId: string,
  userId: string
) {
  return createTaskActivity({
    taskId,
    userId,
    action: "TASK_DESCRIPTION_CHANGED",
    message: "Updated description",
  });
}

export async function recordTaskStatusChanged(
  taskId: string,
  userId: string,
  status: string
) {
  return createTaskActivity({
    taskId,
    userId,
    action: "TASK_STATUS_CHANGED",
    message: `Changed status to ${status}`,
  });
}

export async function recordTaskPriorityChanged(
  taskId: string,
  userId: string,
  priority: string
) {
  return createTaskActivity({
    taskId,
    userId,
    action: "TASK_PRIORITY_CHANGED",
    message: `Changed priority to ${priority}`,
  });
}

export async function recordTaskDueDateChanged(
  taskId: string,
  userId: string
) {
  return createTaskActivity({
    taskId,
    userId,
    action: "TASK_DUE_DATE_CHANGED",
    message: "Updated due date",
  });
}

export async function recordTaskEstimateChanged(
  taskId: string,
  userId: string
) {
  return createTaskActivity({
    taskId,
    userId,
    action: "TASK_ESTIMATE_CHANGED",
    message: "Updated estimate",
  });
}

/* ===========================
   Archive / Restore
=========================== */

export async function recordTaskArchived(
  taskId: string,
  userId: string
) {
  return createTaskActivity({
    taskId,
    userId,
    action: "TASK_ARCHIVED",
    message: "Archived task",
  });
}

export async function recordTaskRestored(
  taskId: string,
  userId: string
) {
  return createTaskActivity({
    taskId,
    userId,
    action: "TASK_RESTORED",
    message: "Restored task",
  });
}

/* ===========================
   Delete
=========================== */

export async function recordTaskDeleted(
  taskId: string,
  userId: string
) {
  return createTaskActivity({
    taskId,
    userId,
    action: "TASK_DELETED",
    message: "Deleted task",
  });
}

/* ===========================
   Duplicate
=========================== */

export async function recordTaskDuplicated(
  taskId: string,
  userId: string
) {
  return createTaskActivity({
    taskId,
    userId,
    action: "TASK_DUPLICATED",
    message: "Duplicated task",
  });
}