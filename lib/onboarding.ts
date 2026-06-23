import { prisma } from "@/lib/prisma";

export async function getUserWorkspace(
userId: string
) {
return prisma.workspace.findFirst({
where: {
ownerId: userId,
},
});
}

export async function getWorkspaceSpace(
workspaceId: string
) {
return prisma.space.findFirst({
where: {
workspaceId,
},
});
}
