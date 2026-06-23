import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } =
    await params;

  const body =
    await req.json();

  const task =
    await prisma.task.update({
      where: {
        id,
      },
      data: {
        title: body.title,
      },
    });

  return NextResponse.json(
    task
  );
}