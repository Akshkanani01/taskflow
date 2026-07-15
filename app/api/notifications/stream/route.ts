import { NextRequest } from "next/server";

import { auth } from "@/lib/auth";

import {
  subscribeUser,
  unsubscribeUser,
} from "@/lib/notifications";

export const runtime = "nodejs";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest
) {
  const session =
    await auth.api.getSession({
      headers: request.headers,
    });

  if (!session?.user) {
    return new Response(
      "Unauthorized",
      {
        status: 401,
      }
    );
  }

  const userId =
    session.user.id;
      const stream =
    new ReadableStream({

      start(controller) {

        subscribeUser(
          userId,
          controller
        );

        controller.enqueue(
          `event: connected\n`
          + `data: connected\n\n`
        );

        const heartbeat =
          setInterval(() => {

            try {

              controller.enqueue(
                `event: ping\n`
                + `data: ping\n\n`
              );

            } catch {}

          }, 25000);

        request.signal.addEventListener(
          "abort",
          () => {

            clearInterval(
              heartbeat
            );

            unsubscribeUser(
              userId,
              controller
            );

            controller.close();

          }
        );
      },

    });
      return new Response(
    stream,
    {
      headers: {
        Connection:
          "keep-alive",

        "Cache-Control":
          "no-cache, no-transform",

        "Content-Type":
          "text/event-stream",

        "X-Accel-Buffering":
          "no",
      },
    }
  );
}