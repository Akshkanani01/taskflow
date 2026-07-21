import { InviteStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

interface ValidateInviteInput {
  workspaceId: string;
  email: string;
  inviterId: string;
}

export async function validateInvite({
  workspaceId,
  email,
  inviterId,
}: ValidateInviteInput) {
  const normalizedEmail = email
    .trim()
    .toLowerCase();

  const inviter = await prisma.user.findUnique({
    where: {
      id: inviterId,
    },
    select: {
      email: true,
    },
  });

  if (!inviter) {
    throw new Error("Inviter not found.");
  }

  if (
    inviter.email.toLowerCase() ===
    normalizedEmail
  ) {
    throw new Error(
      "You cannot invite yourself."
    );
  }

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
      "User is already a workspace member."
    );
  }

  const pendingInvite =
    await prisma.workspaceInvite.findFirst({
      where: {
        workspaceId,
        email: normalizedEmail,
        status: InviteStatus.PENDING,
      },
    });

  if (pendingInvite) {
    throw new Error(
      "A pending invite already exists."
    );
  }

  return {
    email: normalizedEmail,
  };
}