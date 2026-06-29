import { NextResponse } from "next/server";
import { addClient, removeClient } from "@/lib/notifications/notification-stream";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // 🔗 register client
      addClient({ userId, controller });

      // 🔥 initial ping (IMPORTANT for connection verify)
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ type: "connected" })}\n\n`)
      );

      // 💔 cleanup on disconnect
      req.signal.addEventListener("abort", () => {
        removeClient(controller);
        controller.close();
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}