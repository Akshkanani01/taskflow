import { NextRequest } from "next/server";

import { auth } from "@/lib/auth";

import {
  markNotificationRead,
} from "@/lib/notifications";

export async function POST(
  request: NextRequest
) {
  const session =
    await auth.api.getSession({
      headers: request.headers,
    });

  if (!session?.user) {
    return Response.json(
      {},
      {
        status: 401,
      }
    );
  }

  const body =
    await request.json();

  await markNotificationRead(
    body.notificationId,
    session.user.id
  );

  return Response.json({
    success: true,
  });
}