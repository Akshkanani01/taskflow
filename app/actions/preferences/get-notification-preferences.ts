"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getNotificationPreferences() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return null;
  }

  return await prisma.notificationPreference.findUnique({
    where: {
      userId: session.user.id,
    },
  });
}