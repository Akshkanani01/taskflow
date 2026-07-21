import { prisma } from "@/lib/prisma";

export async function requireSpace(
  spaceId: string
) {
  const space =
    await prisma.space.findUnique({
      where: {
        id: spaceId,
      },

      include: {
        workspace: true,
      },
    });

  if (!space) {
    throw new Error("Space not found.");
  }

  return space;
}