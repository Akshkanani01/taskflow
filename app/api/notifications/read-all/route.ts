import { NextRequest } from "next/server";

import { auth } from "@/lib/auth";

import {
  markAllNotificationsRead,
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

  await markAllNotificationsRead(
    session.user.id
  );

  return Response.json({
    success: true,
  });
}