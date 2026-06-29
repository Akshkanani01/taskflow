import { prisma } from "@/lib/prisma";

export async function createNotification({
  userId,
  actorId,
  type,
  title,
  message,
  link,
}: any) {
  return prisma.notification.create({
    data: {
      userId,
      actorId,
      type,
      title,
      message,
      link,
      read: false,
    },
  });
}