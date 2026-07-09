"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { WorkspaceRole } from "@prisma/client";

export async function createWorkspace(
  formData: FormData
) {
  const user = await getCurrentUser();

  const name =
    formData.get("name")?.toString().trim() ?? "";

  if (!name) {
    throw new Error("Workspace name is required.");
  }

  const baseSlug = name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  let slug = baseSlug;

  const existing = await prisma.workspace.findUnique({
    where: {
      slug,
    },
  });

  if (existing) {
    slug = `${baseSlug}-${Date.now()}`;
  }

  const workspace = await prisma.$transaction(async (tx) => {
    const workspace = await tx.workspace.create({
      data: {
        name,
        slug,
        ownerId: user.id,
      },
    });

    await tx.workspaceMember.create({
      data: {
        workspaceId: workspace.id,
        userId: user.id,
        role: WorkspaceRole.OWNER,
      },
    });

    return workspace;
  });

  redirect(
    `/onboarding/space?workspaceId=${workspace.id}`
  );
}

export async function createSpace(
  formData: FormData
) {
  const workspaceId =
    formData.get("workspaceId")?.toString() ?? "";

  const name =
    formData.get("name")?.toString().trim() ?? "";

  const color =
    formData.get("color")?.toString() ?? "blue";

  if (!workspaceId) {
    throw new Error("Workspace ID missing");
  }

  if (!name) {
    throw new Error("Space name is required.");
  }

  const space = await prisma.space.create({
    data: {
      workspaceId,
      name,
      color,
    },
  });

  const workspace = await prisma.workspace.findUnique({
    where: {
      id: workspaceId,
    },
    select: {
      ownerId: true,
    },
  });

  if (workspace) {
    await prisma.spaceMember.create({
      data: {
        spaceId: space.id,
        userId: workspace.ownerId,
        role: WorkspaceRole.OWNER,
      },
    });
  }

  redirect("/dashboard");
}