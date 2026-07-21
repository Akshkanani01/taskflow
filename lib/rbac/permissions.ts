import type { Permission } from "./types";

export const Permissions = {
  WORKSPACE_VIEW: "workspace.view",
  WORKSPACE_UPDATE: "workspace.update",
  WORKSPACE_DELETE: "workspace.delete",

  MEMBER_INVITE: "member.invite",
  MEMBER_REMOVE: "member.remove",
  MEMBER_ROLE_UPDATE: "member.role.update",

  TEAM_VIEW: "team.view",
  TEAM_INVITE: "team.invite",
  TEAM_ACCEPT: "team.accept",
  TEAM_ROLE_UPDATE: "team.role.update",
  TEAM_REVOKE: "team.revoke",
  TEAM_RESEND: "team.resend",

  SPACE_CREATE: "space.create",
  SPACE_VIEW: "space.view",
  SPACE_UPDATE: "space.update",
  SPACE_DELETE: "space.delete",

  PROJECT_CREATE: "project.create",
  PROJECT_VIEW: "project.view",
  PROJECT_UPDATE: "project.update",
  PROJECT_DELETE: "project.delete",

  TASK_CREATE: "task.create",
  TASK_VIEW: "task.view",
  TASK_UPDATE: "task.update",
  TASK_DELETE: "task.delete",

  TASK_ASSIGN: "task.assign",

  TASK_STATUS_UPDATE: "task.status.update",
  TASK_PRIORITY_UPDATE: "task.priority.update",
  TASK_DUE_DATE_UPDATE: "task.dueDate.update",

  TASK_COMMENT_CREATE: "task.comment.create",
  TASK_COMMENT_DELETE: "task.comment.delete",

  TASK_ATTACHMENT_UPLOAD: "task.attachment.upload",
  TASK_ATTACHMENT_DELETE: "task.attachment.delete",

  NOTIFICATION_VIEW: "notification.view",

  AUDIT_VIEW: "audit.view",

  SETTINGS_VIEW: "settings.view",
  SETTINGS_UPDATE: "settings.update",
} as const satisfies Record<string, Permission>;