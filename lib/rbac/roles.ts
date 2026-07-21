import { WorkspaceRole } from "@prisma/client";

export const Roles = {
  OWNER: WorkspaceRole.OWNER,
  ADMIN: WorkspaceRole.ADMIN,
  MANAGER: WorkspaceRole.MANAGER,
  MEMBER: WorkspaceRole.MEMBER,
  VIEWER: WorkspaceRole.VIEWER,
} as const;

export type Role =
  (typeof Roles)[keyof typeof Roles];