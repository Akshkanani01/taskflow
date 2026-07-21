import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

import {
  Priority,
  TaskStatus,
} from "@prisma/client";

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

    const project =
      await prisma.project.findUnique({
        where: {
          id: body.projectId,
        },
        select: {
          id: true,
          spaceId: true,
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

    const task =
      await prisma.task.create({
        data: {
          title: body.title,

          description:
            body.description ?? "",

          status: TaskStatus.TODO,

          priority:
            Priority.MEDIUM,

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
    console.error(
      "CREATE TASK ERROR",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to create task",
      },
      {
        status: 500,
      }
    );
  }
}