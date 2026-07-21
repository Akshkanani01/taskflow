import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const assigneeIds: string[] = Array.isArray(body.assigneeIds)
      ? body.assigneeIds
      : body.assigneeId
        ? [body.assigneeId]
        : [];

    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      return NextResponse.json(
        {
          error: "Task not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.taskAssignee.deleteMany({
      where: {
        taskId: id,
      },
    });

    if (assigneeIds.length > 0) {
      await prisma.taskAssignee.createMany({
        data: assigneeIds.map((userId) => ({
          taskId: id,
          userId,
        })),
        skipDuplicates: true,
      });
    }

    const updatedTask = await prisma.task.findUnique({
      where: {
        id,
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

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("UPDATE TASK ASSIGNEE ERROR", error);

    return NextResponse.json(
      {
        error: "Failed to update task assignee",
      },
      {
        status: 500,
      }
    );
  }
}