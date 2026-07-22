import { WorkspaceRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import { hasPermission } from "./matrix";
import type { Permission } from "./types";

export class PermissionError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = "PermissionError";
  }
}

export async function getWorkspaceRole(
  userId: string,
  workspaceId: string
): Promise<WorkspaceRole | null> {
  if (!userId || !workspaceId) {
    return null;
  }

  const member = await prisma.workspaceMember.findUnique({
    where: {
      workspaceId_userId: {
        workspaceId,
        userId,
      },
    },
    select: {
      role: true,
    },
  });

  if (process.env.NODE_ENV !== "production") {
    console.log("[RBAC] getWorkspaceRole", {
      userId,
      workspaceId,
      role: member?.role ?? null,
    });
  }

  return member?.role ?? null;
}

export async function hasWorkspacePermission(
  userId: string,
  workspaceId: string,
  permission: Permission
): Promise<boolean> {
  const role = await getWorkspaceRole(
    userId,
    workspaceId
  );

  if (!role) {
    return false;
  }

  return hasPermission(role, permission);
}

export async function requirePermission(
  userId: string,
  workspaceId: string,
  permission: Permission
): Promise<WorkspaceRole> {
  const role = await getWorkspaceRole(
    userId,
    workspaceId
  );

  if (!role) {
    throw new PermissionError(
      `Workspace member not found. user=${userId} workspace=${workspaceId}`
    );
  }

  if (!hasPermission(role, permission)) {
    throw new PermissionError(
      `Permission denied. role=${role} permission=${permission}`
    );
  }

  return role;
}

export async function requireOwner(
  userId: string,
  workspaceId: string
): Promise<void> {
  const role = await getWorkspaceRole(
    userId,
    workspaceId
  );

  if (role !== WorkspaceRole.OWNER) {
    throw new PermissionError(
      "Owner access required."
    );
  }
}

export async function requireAdmin(
  userId: string,
  workspaceId: string
): Promise<void> {
  const role = await getWorkspaceRole(
    userId,
    workspaceId
  );

  if (
    role !== WorkspaceRole.OWNER &&
    role !== WorkspaceRole.ADMIN
  ) {
    throw new PermissionError(
      "Admin access required."
    );
  }
}

export async function requireManager(
  userId: string,
  workspaceId: string
): Promise<void> {
  const role = await getWorkspaceRole(
    userId,
    workspaceId
  );

  if (
    role !== WorkspaceRole.OWNER &&
    role !== WorkspaceRole.ADMIN &&
    role !== WorkspaceRole.MANAGER
  ) {
    throw new PermissionError(
      "Manager access required."
    );
  }
}