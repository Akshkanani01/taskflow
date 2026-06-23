import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const spaces = await prisma.space.findMany({
      include: {
        projects: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(spaces);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to load spaces" },
      { status: 500 }
    );
  }
}