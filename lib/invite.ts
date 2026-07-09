import { randomBytes } from "crypto";

import { prisma } from "@/lib/prisma";
import { WorkspaceRole } from "@prisma/client";

interface CreateInviteInput {
  workspaceId: string;
  spaceId?: string;
  email: string;
  role: WorkspaceRole;
  invitedById: string;
}

export async function createWorkspaceInvite({
  workspaceId,
  spaceId,
  email,
  role,
  invitedById,
}: CreateInviteInput) {
  const normalizedEmail = email
    .trim()
    .toLowerCase();

  const existingMember =
    await prisma.workspaceMember.findFirst({
      where: {
        workspaceId,
        user: {
          email: normalizedEmail,
        },
      },
    });

  if (existingMember) {
    throw new Error(
      "User is already a member."
    );
  }

  const existingInvite =
    await prisma.workspaceInvite.findFirst({
      where: {
        workspaceId,
        email: normalizedEmail,
        status: "PENDING",
      },
    });

  if (existingInvite) {
    throw new Error(
      "Invitation already sent."
    );
  }

  const token =
    randomBytes(32).toString("hex");

  const expiresAt = new Date(
    Date.now() +
      1000 * 60 * 60 * 24 * 7
  );

  return prisma.workspaceInvite.create({
    data: {
      workspaceId,
      spaceId,
      email: normalizedEmail,
      role,
      token,
      invitedById,
      expiresAt,
    },
  });
}