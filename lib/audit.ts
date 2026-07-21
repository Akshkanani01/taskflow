import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
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
metadata?: Prisma.InputJsonValue;
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