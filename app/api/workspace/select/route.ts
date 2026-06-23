import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  const { workspaceId } =
    await req.json();

  const cookieStore =
    await cookies();

  cookieStore.set(
    "workspaceId",
    workspaceId,
    {
      path: "/",
      maxAge:
        60 * 60 * 24 * 30,
    }
  );

  return NextResponse.json({
    success: true,
  });
}