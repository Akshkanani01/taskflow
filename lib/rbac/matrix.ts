import { WorkspaceRole } from "@prisma/client";

import type { Permission } from "./types";
import { Permissions } from "./permissions";

export const PermissionMatrix: Record<
  WorkspaceRole,
  readonly Permission[]
> = {
  [WorkspaceRole.OWNER]: [
    Permissions.WORKSPACE_VIEW,
    Permissions.WORKSPACE_UPDATE,
    Permissions.WORKSPACE_DELETE,

    Permissions.MEMBER_INVITE,
    Permissions.MEMBER_REMOVE,
    Permissions.MEMBER_ROLE_UPDATE,

    Permissions.TEAM_VIEW,
    Permissions.TEAM_INVITE,
    Permissions.TEAM_ACCEPT,
    Permissions.TEAM_ROLE_UPDATE,
    Permissions.TEAM_REVOKE,
    Permissions.TEAM_RESEND,

    Permissions.SPACE_CREATE,
    Permissions.SPACE_VIEW,
    Permissions.SPACE_UPDATE,
    Permissions.SPACE_DELETE,

    Permissions.PROJECT_CREATE,
    Permissions.PROJECT_VIEW,
    Permissions.PROJECT_UPDATE,
    Permissions.PROJECT_DELETE,

    Permissions.TASK_CREATE,
    Permissions.TASK_VIEW,
    Permissions.TASK_UPDATE,
    Permissions.TASK_DELETE,

    Permissions.TASK_ASSIGN,

    Permissions.TASK_STATUS_UPDATE,
    Permissions.TASK_PRIORITY_UPDATE,
    Permissions.TASK_DUE_DATE_UPDATE,

    Permissions.TASK_COMMENT_CREATE,
    Permissions.TASK_COMMENT_DELETE,

    Permissions.TASK_ATTACHMENT_UPLOAD,
    Permissions.TASK_ATTACHMENT_DELETE,

    Permissions.NOTIFICATION_VIEW,

    Permissions.AUDIT_VIEW,

    Permissions.SETTINGS_VIEW,
    Permissions.SETTINGS_UPDATE,
  ],

  [WorkspaceRole.ADMIN]: [
    Permissions.WORKSPACE_VIEW,
    Permissions.WORKSPACE_UPDATE,

    Permissions.MEMBER_INVITE,
    Permissions.MEMBER_REMOVE,
    Permissions.MEMBER_ROLE_UPDATE,

    Permissions.TEAM_VIEW,
    Permissions.TEAM_INVITE,
    Permissions.TEAM_ACCEPT,
    Permissions.TEAM_ROLE_UPDATE,
    Permissions.TEAM_RESEND,

    Permissions.SPACE_CREATE,
    Permissions.SPACE_VIEW,
    Permissions.SPACE_UPDATE,

    Permissions.PROJECT_CREATE,
    Permissions.PROJECT_VIEW,
    Permissions.PROJECT_UPDATE,
    Permissions.PROJECT_DELETE,

    Permissions.TASK_CREATE,
    Permissions.TASK_VIEW,
    Permissions.TASK_UPDATE,
    Permissions.TASK_DELETE,

    Permissions.TASK_ASSIGN,

    Permissions.TASK_STATUS_UPDATE,
    Permissions.TASK_PRIORITY_UPDATE,
    Permissions.TASK_DUE_DATE_UPDATE,

    Permissions.TASK_COMMENT_CREATE,
    Permissions.TASK_COMMENT_DELETE,

    Permissions.TASK_ATTACHMENT_UPLOAD,
    Permissions.TASK_ATTACHMENT_DELETE,

    Permissions.NOTIFICATION_VIEW,

    Permissions.AUDIT_VIEW,

    Permissions.SETTINGS_VIEW,
  ],

  [WorkspaceRole.MANAGER]: [
    Permissions.WORKSPACE_VIEW,

    Permissions.MEMBER_INVITE,

    Permissions.TEAM_VIEW,
    Permissions.TEAM_INVITE,
    Permissions.TEAM_ACCEPT,
    Permissions.TEAM_RESEND,

    Permissions.SPACE_VIEW,

    Permissions.PROJECT_CREATE,
    Permissions.PROJECT_VIEW,
    Permissions.PROJECT_UPDATE,

    Permissions.TASK_CREATE,
    Permissions.TASK_VIEW,
    Permissions.TASK_UPDATE,

    Permissions.TASK_ASSIGN,

    Permissions.TASK_STATUS_UPDATE,
    Permissions.TASK_PRIORITY_UPDATE,
    Permissions.TASK_DUE_DATE_UPDATE,

    Permissions.TASK_COMMENT_CREATE,

    Permissions.TASK_ATTACHMENT_UPLOAD,

    Permissions.NOTIFICATION_VIEW,
  ],

  [WorkspaceRole.MEMBER]: [
    Permissions.WORKSPACE_VIEW,

    Permissions.TEAM_ACCEPT,

    Permissions.SPACE_VIEW,

    Permissions.PROJECT_VIEW,

    Permissions.TASK_VIEW,

    Permissions.TASK_STATUS_UPDATE,

    Permissions.TASK_COMMENT_CREATE,

    Permissions.TASK_ATTACHMENT_UPLOAD,

    Permissions.NOTIFICATION_VIEW,
  ],

  [WorkspaceRole.VIEWER]: [
    Permissions.WORKSPACE_VIEW,

    Permissions.SPACE_VIEW,

    Permissions.PROJECT_VIEW,

    Permissions.TASK_VIEW,

    Permissions.NOTIFICATION_VIEW,
  ],
};

export function getPermissions(
  role: WorkspaceRole
): readonly Permission[] {
  return PermissionMatrix[role];
}

export function hasPermission(
  role: WorkspaceRole,
  permission: Permission
): boolean {
  return PermissionMatrix[role].includes(permission);
}