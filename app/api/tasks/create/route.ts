import { NextResponse } from "next/server";
import {
  Prisma,
  Priority,
  TaskStatus,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/session";

import { requireProject } from "@/lib/auth/require-project";

import { Permissions } from "@/lib/rbac/permissions";
import { requirePermission } from "@/lib/rbac/server";
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title")?.toString().trim() ?? "";

    const description =
      formData.get("description")?.toString().trim() ?? "";

    const rawStatus =
      formData.get("status")?.toString().toUpperCase() ?? "TODO";

    const rawPriority =
      formData.get("priority")?.toString().toUpperCase() ?? "MEDIUM";

    const status =
      TaskStatus[
        rawStatus as keyof typeof TaskStatus
      ] ?? TaskStatus.TODO;

    const priority =
      Priority[
        rawPriority as keyof typeof Priority
      ] ?? Priority.MEDIUM;

    const dueDate =
      formData.get("dueDate")?.toString() ?? "";

    const projectId =
      formData.get("projectId")?.toString() ?? "";

    const assigneeIds: string[] = JSON.parse(
      formData.get("assigneeIds")?.toString() ?? "[]"
    );

    const uploadedFiles = formData.getAll("files") as File[];

    if (!title || !projectId) {
      return NextResponse.json(
        {
          error: "Title and Project are required",
        },
        {
          status: 400,
        }
      );
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,

        dueDate: dueDate
          ? new Date(dueDate)
          : null,

        projectId,
        spaceId: formData.get("spaceId")?.toString() ?? "",
        createdById: formData.get("createdById")?.toString() ?? "",
      },

      include: {
        taskAssignees: {
          include: {
            user: true,
          },
        },

        attachments: true,
      },
    });

    if (assigneeIds.length > 0) {
      await prisma.taskAssignee.createMany({
        data: assigneeIds.map((userId) => ({
          taskId: task.id,
          userId,
        })),

        skipDuplicates: true,
      });
    }

    if (uploadedFiles.length > 0) {
      const attachments: Prisma.TaskAttachmentCreateManyInput[] =
        uploadedFiles.map((file) => ({
          taskId: task.id,
          name: file.name,
          url: `/uploads/${file.name}`,
          fileSize: file.size,
          mimeType: file.type,
        }));

      await prisma.taskAttachment.createMany({
        data: attachments,
      });
    }

    const createdTask = await prisma.task.findUnique({
      where: {
        id: task.id,
      },

      include: {
        taskAssignees: {
          include: {
            user: true,
          },
        },

        attachments: true,
      },
    });

    return NextResponse.json(createdTask);
  } catch (error) {
    console.error("CREATE TASK ERROR", error);

    return NextResponse.json(
      {
        error: "Failed to create task",
      },
      {
        status: 500,
      }
    );
  }
}