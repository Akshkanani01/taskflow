import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const workspaces = await prisma.workspace.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return NextResponse.json(workspaces);
}