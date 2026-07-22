import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac/server";
import { Permissions } from "@/lib/rbac/permissions";

import { NextResponse } from "next/server";
import { Priority, TaskStatus } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body = await req.json();

    const projectId = String(body.projectId ?? "").trim();
    const title = String(body.title ?? "").trim();
    const description =
      typeof body.description === "string" ? body.description.trim() : "";

    if (!projectId || !title) {
      return NextResponse.json(
        {
          error: "Project ID and title are required.",
        },
        {
          status: 400,
        }
      );
    }

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        id: true,
        spaceId: true,
        space: {
          select: {
            id: true,
            workspaceId: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        {
          error: "Project not found",
        },
        {
          status: 404,
        }
      );
    }

    const workspaceId = project.space.workspaceId;

    await requirePermission(
      session.user.id,
      workspaceId,
      Permissions.TASK_CREATE
    );

    const membership = await prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId: session.user.id,
        },
      },
      select: {
        role: true,
      },
    });

    if (!membership) {
      return NextResponse.json(
        {
          error: "You are not a member of this workspace.",
        },
        {
          status: 403,
        }
      );
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: TaskStatus.TODO,
        priority: Priority.MEDIUM,
        project: {
          connect: {
            id: project.id,
          },
        },
        space: {
          connect: {
            id: project.spaceId,
          },
        },
        createdBy: {
          connect: {
            id: session.user.id,
          },
        },
      },
      include: {
        project: true,
        space: true,
        createdBy: true,
      },
    });

    return NextResponse.json(task);
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