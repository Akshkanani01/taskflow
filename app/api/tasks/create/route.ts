import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title =
      formData.get("title")?.toString() || "";

    const description =
      formData.get("description")?.toString() || "";

    const status =
      formData.get("status")?.toString() || "todo";

    const priority =
      formData.get("priority")?.toString() || "normal";

    const dueDate =
      formData.get("dueDate")?.toString() || "";

    const projectId =
      formData.get("projectId")?.toString() || "";

    const assigneeIds = JSON.parse(
      formData.get("assigneeIds")?.toString() || "[]"
    );

    const uploadedFiles =
      formData.getAll("files") as File[];

    if (!title || !projectId) {
      return NextResponse.json(
        {
          error:
            "Title and Project are required",
        },
        {
          status: 400,
        }
      );
    }

    const task =
      await prisma.task.create({
        data: {
          title,
          description,
          status,
          priority,

          dueDate: dueDate
            ? new Date(dueDate)
            : null,

          projectId,

          assignees: {
            create:
              assigneeIds.map(
                (userId: string) => ({
                  userId,
                })
              ),
          },
        },

        include: {
          assignees: {
            include: {
              user: true,
            },
          },

          attachments: true,
        },
      });

    if (uploadedFiles.length > 0) {
      await prisma.taskAttachment.createMany({
        data: uploadedFiles.map(
          (file) => ({
            taskId: task.id,

            fileName: file.name,

            fileUrl: `/uploads/${file.name}`,

            fileSize: file.size,

            mimeType: file.type,
          })
        ),
      });
    }

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