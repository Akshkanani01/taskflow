import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createNotification } from "@/lib/notifications/notification-service";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const status = formData.get("status")?.toString() || "todo";
    const priority = formData.get("priority")?.toString() || "normal";
    const dueDate = formData.get("dueDate")?.toString() || "";
    const projectId = formData.get("projectId")?.toString() || "";

    const assigneeIds: string[] = JSON.parse(
      formData.get("assigneeIds")?.toString() || "[]"
    );

    const uploadedFiles = formData.getAll("files") as File[];

    // 🔥 TEMP: replace with auth user
    const currentUserId = formData.get("actorId")?.toString() || null;

    if (!title || !projectId) {
      return NextResponse.json(
        { error: "Title and Project are required" },
        { status: 400 }
      );
    }

    // =========================
    // 1. CREATE TASK
    // =========================
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        projectId,

        assignees: {
          create: assigneeIds.map((userId) => ({
            userId,
          })),
        },
      },
      include: {
        assignees: {
          include: { user: true },
        },
        attachments: true,
      },
    });

    // =========================
    // 2. ATTACHMENTS
    // =========================
    if (uploadedFiles.length > 0) {
      await prisma.taskAttachment.createMany({
        data: uploadedFiles.map((file) => ({
          taskId: task.id,
          fileName: file.name,
          fileUrl: `/uploads/${file.name}`,
          fileSize: file.size,
          mimeType: file.type,
        })),
      });
    }

    // =========================
    // 3. NOTIFICATIONS (CLICKUP STYLE FIXED)
    // =========================
    if (assigneeIds.length > 0) {
      await Promise.all(
        assigneeIds.map(async (userId) => {
          await createNotification({
            userId, // 🔥 correct target user
            actorId: currentUserId,

            type: "TASK_ASSIGNED",

            title: "Task Assigned",

            message: `${task.title} assigned to you`,

            link: `/dashboard/tasks/${task.id}`,
          });
        })
      );
    }

    // =========================
    // 4. ACTIVITY LOG
    // =========================
    await prisma.activityLog.create({
      data: {
        workspaceId: null,
        actorId: currentUserId,
        entityType: "TASK",
        entityId: task.id,
        action: "TASK_CREATED",
        metadata: {
          title: task.title,
          assignees: assigneeIds,
        },
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("CREATE TASK ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}