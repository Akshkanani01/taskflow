import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import {
  Prisma,
  Priority,
  TaskStatus,
} from "@prisma/client";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import {
  PermissionError,
  requirePermission,
} from "@/lib/rbac/server";

import { Permissions } from "@/lib/rbac/permissions";


async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return session.user;
}

async function getTask(id: string) {
  const task = await prisma.task.findUnique({
    where: {
      id,
    },

    select: {
      id: true,
      title: true,
      projectId: true,
      spaceId: true,

      space: {
        select: {
          workspaceId: true,
        },
      },
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
}

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
    const user = await getCurrentUser();

const { id } = await params;

const task = await getTask(id);

await requirePermission(
  user.id,
  task.space.workspaceId,
  Permissions.TASK_UPDATE
);

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

     const updatedTask = await prisma.$transaction(async (tx) => {
  await tx.task.update({
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
    await tx.taskAssignee.deleteMany({
      where: {
        taskId: id,
      },
    });

    if (body.assigneeIds.length > 0) {
      await tx.taskAssignee.createMany({
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

  return tx.task.findUnique({
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
});

    return NextResponse.json(updatedTask);
  
  } catch (error) {
  console.error(
    "UPDATE TASK ERROR",
    error
  );

  if (error instanceof PermissionError) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 403,
      }
    );
  }

  if (
    error instanceof Error &&
    error.message === "Unauthorized"
  ) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  if (
    error instanceof Error &&
    error.message === "Task not found"
  ) {
    return NextResponse.json(
      {
        error: "Task not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      error: "Failed to update task",
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
    const user = await getCurrentUser();

const { id } = await params;

const task = await getTask(id);

await requirePermission(
  user.id,
  task.space.workspaceId,
  Permissions.TASK_DELETE
);

    await prisma.$transaction(async (tx) => {
  await tx.taskAssignee.deleteMany({
    where: {
      taskId: id,
    },
  });

  await tx.taskAttachment.deleteMany({
    where: {
      taskId: id,
    },
  });

  await tx.task.delete({
    where: {
      id,
    },
  });
});

    return NextResponse.json({
      success: true,
    });
  
  
  } catch (error) {
  console.error(
    "DELETE TASK ERROR",
    error
  );

  if (error instanceof PermissionError) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 403,
      }
    );
  }

  if (
    error instanceof Error &&
    error.message === "Unauthorized"
  ) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  if (
    error instanceof Error &&
    error.message === "Task not found"
  ) {
    return NextResponse.json(
      {
        error: "Task not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      error: "Failed to delete task",
    },
    {
      status: 500,
    }
  );
}
}