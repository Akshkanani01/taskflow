import { NextResponse } from "next/server";
import {
  Priority,
  TaskStatus,
} from "@prisma/client";

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

    const status =
      body.status
        ? TaskStatus[
            body.status.toUpperCase() as keyof typeof TaskStatus
          ]
        : undefined;

    const priority =
      body.priority
        ? Priority[
            body.priority.toUpperCase() as keyof typeof Priority
          ]
        : undefined;

     await prisma.task.update({
      where: {
        id,
      },

      data: {
        title: body.title,
        description: body.description,
        status,
        priority,

        dueDate: body.dueDate
          ? new Date(body.dueDate)
          : null,
      },
    });

    if (Array.isArray(body.assigneeIds)) {
      await prisma.taskAssignee.deleteMany({
        where: {
          taskId: id,
        },
      });

      if (body.assigneeIds.length > 0) {
        await prisma.taskAssignee.createMany({
          data: body.assigneeIds.map(
            (userId: string) => ({
              taskId: id,
              userId,
            })
          ),
          skipDuplicates: true,
        });
      }
    }

    const updatedTask =
      await prisma.task.findUnique({
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
    console.error(
      "UPDATE TASK ERROR",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to update task",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
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

    await prisma.taskAssignee.deleteMany({
      where: {
        taskId: id,
      },
    });

    await prisma.taskAttachment.deleteMany({
      where: {
        taskId: id,
      },
    });

    await prisma.task.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "DELETE TASK ERROR",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to delete task",
      },
      {
        status: 500,
      }
    );
  }
}