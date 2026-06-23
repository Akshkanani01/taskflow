import { prisma } from "@/lib/prisma";

export async function createAuditLog({
  workspaceId,
  actorId,
  action,
  target,
  metadata,
}: {
  workspaceId: string;
  actorId?: string;
  action: string;
  target?: string;
  metadata?: any;
}) {
  await prisma.auditLog.create({
    data: {
      workspaceId,

      actorId,

      action,

      target,

      metadata,
    },
  });
}