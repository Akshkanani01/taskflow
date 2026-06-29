"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function changeMemberRole(formData: FormData) {
  const workspaceId = formData.get("workspaceId") as string;
  const userId = formData.get("userId") as string;
  const role = formData.get("role") as any;

  await prisma.workspaceMember.updateMany({
    where: { workspaceId, userId },
    data: { role },
  });

  revalidatePath("/dashboard/team/members");
}

export async function removeMember(formData: FormData) {
  const workspaceId = formData.get("workspaceId") as string;
  const userId = formData.get("userId") as string;

  await prisma.workspaceMember.deleteMany({
    where: { workspaceId, userId },
  });

  revalidatePath("/dashboard/team/members");
}

export async function transferOwnership(formData: FormData) {
  const workspaceId = formData.get("workspaceId") as string;
  const newOwnerId = formData.get("newOwnerId") as string;

  const members = await prisma.workspaceMember.findMany({
    where: { workspaceId },
  });

  const currentOwner = members.find(m => m.role === "OWNER");
  const newOwner = members.find(m => m.userId === newOwnerId);

  if (!currentOwner || !newOwner) return;

  await prisma.workspaceMember.update({
    where: { id: currentOwner.id },
    data: { role: "ADMIN" },
  });

  await prisma.workspaceMember.update({
    where: { id: newOwner.id },
    data: { role: "OWNER" },
  });

  revalidatePath("/dashboard/team/members");
}