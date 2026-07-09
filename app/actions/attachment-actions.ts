"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createAttachment({
  taskId,
  uploaderId,
  name,
  url,
  mimeType,
  size,
}: {
  taskId: string;
  uploaderId?: string;

  name: string;
  url: string;

  mimeType?: string;
  size?: number;
}) {
  await prisma.taskAttachment.create({
    data: {
      taskId,

      uploaderId,

      name,

      url,

      mimeType,

      size,
    },
  });

  await prisma.taskActivity.create({
    data: {
      taskId,

      action: "Attachment Uploaded",

      metadata: {
        file: name,
      },
    },
  });

  revalidatePath("/");
}

export async function deleteAttachment(
  id: string
) {
  const attachment =
    await prisma.taskAttachment.findUnique({
      where: {
        id,
      },
    });

  if (!attachment) return;

  await prisma.taskAttachment.delete({
    where: {
      id,
    },
  });

  await prisma.taskActivity.create({
    data: {
      taskId: attachment.taskId,

      action: "Attachment Deleted",

      metadata: {
        file: attachment.name,
      },
    },
  });

  revalidatePath("/");
}