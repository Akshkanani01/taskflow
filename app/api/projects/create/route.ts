import { NextResponse } from "next/server";

import { requireUser } from "@/lib/auth/require-user";

export async function POST() {
  try {
    await requireUser();

    return NextResponse.json(
      {
        message: "Not implemented yet.",
      },
      {
        status: 501,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
}