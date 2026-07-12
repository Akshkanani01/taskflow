import {
  Priority,
  TaskStatus,
} from "@prisma/client";

export const TASK_STATUS: TaskStatus[] = [
  "BACKLOG",
  "TODO",
  "IN_PROGRESS",
  "REVIEW",
  "TESTING",
  "DONE",
  "CANCELLED",
];

export const TASK_PRIORITY: Priority[] =
  [
    "LOW",
    "MEDIUM",
    "HIGH",
    "URGENT",
  ];