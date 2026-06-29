import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const userId = "CURRENT_USER_ID"; // replace with auth

  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const unreadCount = await prisma.notification.count({
    where: {
      userId,
      read: false,
    },
  });

  return NextResponse.json({
    notifications,
    unreadCount,
  });
}