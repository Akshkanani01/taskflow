export type Permission =
  | "workspace.view"
  | "workspace.update"
  | "workspace.delete"

  | "member.invite"
  | "member.remove"
  | "member.role.update"

  | "team.view"
  | "team.invite"
  | "team.accept"
  | "team.role.update"
  | "team.revoke"
  | "team.resend"

  | "space.create"
  | "space.view"
  | "space.update"
  | "space.delete"

  | "project.create"
  | "project.view"
  | "project.update"
  | "project.delete"

  | "task.create"
  | "task.view"
  | "task.update"
  | "task.delete"

  | "task.assign"

  | "task.status.update"
  | "task.priority.update"
  | "task.dueDate.update"

  | "task.comment.create"
  | "task.comment.delete"

  | "task.attachment.upload"
  | "task.attachment.delete"

  | "notification.view"

  | "audit.view"

  | "settings.view"
  | "settings.update";