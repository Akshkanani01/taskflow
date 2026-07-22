"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

interface UpdateNotificationPreferencesInput {
  enabled?: boolean;
  desktopNotifications?: boolean;
  soundEnabled?: boolean;
  doNotDisturb?: boolean;
  dndFrom?: string;
  dndUntil?: string;

  taskAssigned?: boolean;
  taskCompleted?: boolean;
  taskCommented?: boolean;
  mentions?: boolean;
  invites?: boolean;
}

export async function updateNotificationPreferences(
  data: UpdateNotificationPreferencesInput
) {
  const session = await auth.api.getSession({
    headers: await import("next/headers").then((m) => m.headers()),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await prisma.notificationPreference.upsert({
    where: {
      userId: session.user.id,
    },
    create: {
      userId: session.user.id,

      enabled: data.enabled ?? true,
      desktopNotifications:
        data.desktopNotifications ?? true,
      soundEnabled:
        data.soundEnabled ?? true,
      doNotDisturb:
        data.doNotDisturb ?? false,
      dndFrom:
        data.dndFrom ?? "22:00",
      dndUntil:
        data.dndUntil ?? "08:00",

      taskAssigned:
        data.taskAssigned ?? true,
      taskCompleted:
        data.taskCompleted ?? true,
      taskCommented:
        data.taskCommented ?? true,
      mentions:
        data.mentions ?? true,
      invites:
        data.invites ?? true,
    },
    update: {
      ...data,
    },
  });


}