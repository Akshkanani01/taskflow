import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } = await params;

    const project =
      await prisma.project.findUnique({
        where: {
          id,
        },
      });

    if (!project) {
      return NextResponse.json(
        {
          error: "List not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.project.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to delete list",
      },
      {
        status: 500,
      }
    );
  }
}