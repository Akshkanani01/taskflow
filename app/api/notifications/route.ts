import { NextRequest } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest
) {
  const session =
    await auth.api.getSession({
      headers: request.headers,
    });

  if (!session?.user) {
    return Response.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const userId =
    session.user.id;

  const [
    notifications,
    unread,
    preferences,
  ] = await Promise.all([
    prisma.notification.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 20,
    }),

    prisma.notification.count({
      where: {
        userId,

        read: false,
      },
    }),

    prisma.notificationPreference.findUnique({
      where: {
        userId,
      },
    }),
  ]);

  return Response.json({
    unread,

    notifications,

    preferences,
  });
}