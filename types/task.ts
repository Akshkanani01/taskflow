import {
  Priority,
  TaskStatus,
} from "@prisma/client";

export type TaskMember = {
  id: string;
  name: string;
};

export type CreateTaskPayload = {
  title: string;

  description?: string;

  projectId: string;

  spaceId: string;

  createdById: string;

  priority: Priority;

  status: TaskStatus;

  dueDate?: Date | null;

  estimatedHours?: number | null;

  assignees: string[];
};