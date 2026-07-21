import { z } from "zod";

export const CreateTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1)
    .max(200),

  description: z
    .string()
    .trim()
    .optional(),

  projectId: z.string().min(1),

  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
    "URGENT",
  ]),

  status: z.enum([
    "BACKLOG",
    "TODO",
    "IN_PROGRESS",
    "REVIEW",
    "TESTING",
    "DONE",
    "CANCELLED",
  ]),

  estimatedHours: z
    .number()
    .nullable()
    .optional(),

  dueDate: z
    .date()
    .nullable()
    .optional(),

  assignees: z
    .array(z.string())
    .default([]),
});

export type CreateTaskInput =
  z.infer<
    typeof CreateTaskSchema
  >;