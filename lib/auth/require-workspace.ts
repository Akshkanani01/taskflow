import { prisma } from "@/lib/prisma";

export async function requireWorkspace(
  workspaceId: string
) {
  const workspace =
    await prisma.workspace.findUnique({
      where: {
        id: workspaceId,
      },
    });

  if (!workspace) {
    throw new Error("Workspace not found.");
  }

  return workspace;
}