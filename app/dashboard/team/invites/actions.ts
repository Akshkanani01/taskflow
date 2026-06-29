"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/* -------------------------------
   RESEND INVITE
--------------------------------*/
export async function resendInvite(inviteId: string) {
  const invite = await prisma.workspaceInvite.findUnique({
    where: { id: inviteId },
  });

  if (!invite) {
    throw new Error("Invite not found");
  }

  if (invite.status !== "pending") {
    throw new Error("Only pending invites can be resent");
  }

  // 🔥 Here you would trigger email service
  // await sendInviteEmail(invite.email, invite.token)

  return {
    success: true,
    message: "Invite resent successfully",
  };
}

/* -------------------------------
   REVOKE INVITE
--------------------------------*/
export async function revokeInvite(inviteId: string) {
  const invite = await prisma.workspaceInvite.findUnique({
    where: { id: inviteId },
  });

  if (!invite) {
    throw new Error("Invite not found");
  }

  const updated = await prisma.workspaceInvite.update({
    where: { id: inviteId },
    data: {
      status: "revoked",
    },
  });

  revalidatePath("/dashboard/team/invites");

  return {
    success: true,
    invite: updated,
  };
}

/* -------------------------------
   ACCEPT INVITE
--------------------------------*/
export async function acceptInvite(token: string, userId: string) {
  const invite = await prisma.workspaceInvite.findFirst({
    where: { token },
  });

  if (!invite) {
    throw new Error("Invalid invite");
  }

  if (invite.status !== "pending") {
    throw new Error("Invite already used or revoked");
  }

  // 🔥 create workspace membership
  await prisma.workspaceMember.create({
    data: {
      workspaceId: invite.workspaceId,
      userId,
      role: invite.role,
    },
  });

  // 🔥 mark invite accepted
  const updated = await prisma.workspaceInvite.update({
    where: { id: invite.id },
    data: {
      status: "accepted",
    },
  });

  revalidatePath("/dashboard/team/invites");
  revalidatePath("/dashboard/team");

  return {
    success: true,
    invite: updated,
  };
}

/* -------------------------------
   CREATE INVITE (OPTIONAL BUT IMPORTANT)
--------------------------------*/
export async function createInvite({
  workspaceId,
  email,
  role,
}: {
  workspaceId: string;
  email: string;
  role: "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";
}) {
  const token = crypto.randomUUID();

  const invite = await prisma.workspaceInvite.create({
    data: {
      workspaceId,
      email,
      role,
      token,
      status: "pending",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
  });

  // 🔥 here you would send email with invite link
  // await sendInviteEmail(email, token)

  return {
    success: true,
    invite,
  };
}