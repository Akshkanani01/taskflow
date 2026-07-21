import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const project =
      await prisma.project.create({
        data: {
          name: body.name,
          spaceId: body.spaceId,
        },
      });

    return NextResponse.json(project);
  } catch {
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}