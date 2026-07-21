import { prisma } from "@/lib/prisma";

export async function requireProject(
  projectId: string
) {
  const project =
    await prisma.project.findUnique({
      where: {
        id: projectId,
      },

      include: {
        space: {
          include: {
            workspace: true,
          },
        },
      },
    });

  if (!project) {
    throw new Error("Project not found.");
  }

  return project;
}