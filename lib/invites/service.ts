import { WorkspaceRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import {
  generateInviteExpiry,
  generateInviteToken,
} from "./token";

import { validateInvite } from "./validation";

import { sendWorkspaceInviteEmail } from "@/lib/mail";

interface CreateWorkspaceInviteInput {
  workspaceId: string;
  spaceId?: string | null;

  inviterId: string;

  inviterName: string;

  workspaceName: string;

  email: string;

  role: WorkspaceRole;

  baseUrl: string;
}

export async function createWorkspaceInvite({
  workspaceId,
  spaceId,
  inviterId,
  inviterName,
  workspaceName,
  email,
  role,
  baseUrl,
}: CreateWorkspaceInviteInput) {
  const { email: normalizedEmail } =
    await validateInvite({
      workspaceId,
      inviterId,
      email,
    });

  const token = generateInviteToken();

  const expiresAt =
    generateInviteExpiry();

  const invite =
    await prisma.$transaction(
      async (tx) => {
        const createdInvite =
          await tx.workspaceInvite.create({
            data: {
              workspaceId,
              spaceId,

              email: normalizedEmail,

              role,

              token,

              expiresAt,

              invitedById: inviterId,
            },
          });

        await tx.auditLog.create({
          data: {
            workspaceId,

            actorId: inviterId,

            action: "TEAM_INVITE_CREATED",

            target: normalizedEmail,

            metadata: {
              inviteId: createdInvite.id,
              role,
            },
          },
        });

        return createdInvite;
      }
    );

  const inviteUrl =
    `${baseUrl}/invite/${token}`;

  await sendWorkspaceInviteEmail({
    email: normalizedEmail,

    inviterName,

    workspaceName,

    inviteUrl,
  });

  return invite;
}