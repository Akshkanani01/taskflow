import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const raw = await req.text();

  console.log("==== /api/workspace/select ====");
  console.log("Raw body:", raw);

  if (!raw) {
    return NextResponse.json(
      { error: "Empty request body" },
      { status: 400 }
    );
  }

  const { workspaceId } = JSON.parse(raw);

  const cookieStore = await cookies();

  cookieStore.set("workspaceId", workspaceId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.json({
    success: true,
  });
}