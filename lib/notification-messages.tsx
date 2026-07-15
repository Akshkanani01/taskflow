/**
 * =====================================================
 * Notification Titles
 * =====================================================
 */

export const NotificationTitles = {
  taskCreated: "Task Created",

  taskAssigned: "Task Assigned",

  taskCompleted: "Task Completed",

  taskMoved: "Task Moved",

  taskCommented: "New Comment",

  taskMentioned: "You were mentioned",

  attachmentUploaded: "Attachment Uploaded",

  attachmentDeleted: "Attachment Removed",

  inviteSent: "Workspace Invitation",

  inviteAccepted: "Invitation Accepted",

  roleChanged: "Role Updated",

  checklistCreated: "Checklist Added",

  checklistCompleted: "Checklist Completed",

  checklistDeleted: "Checklist Removed",

  dueDateChanged: "Due Date Updated",

  estimateChanged: "Estimate Updated",

  priorityChanged: "Priority Updated",

  statusChanged: "Status Updated",

  titleChanged: "Task Renamed",

  descriptionChanged: "Description Updated",

  archived: "Task Archived",

  restored: "Task Restored",

  deleted: "Task Deleted",

  duplicated: "Task Duplicated",
} as const;

/**
 * =====================================================
 * Notification Messages
 * =====================================================
 */

export const NotificationMessages = {

  taskCreated(
    actor: string,
    task: string
  ) {
    return `${actor} created "${task}".`;
  },

  taskAssigned(
    actor: string,
    task: string
  ) {
    return `${actor} assigned "${task}" to you.`;
  },

  taskCompleted(
    actor: string,
    task: string
  ) {
    return `${actor} completed "${task}".`;
  },

  taskMoved(
    actor: string,
    task: string
  ) {
    return `${actor} moved "${task}".`;
  },

  commentAdded(
    actor: string,
    task: string
  ) {
    return `${actor} commented on "${task}".`;
  },

  mentioned(
    actor: string,
    task: string
  ) {
    return `${actor} mentioned you in "${task}".`;
  },

  attachmentUploaded(
    actor: string,
    file: string
  ) {
    return `${actor} uploaded "${file}".`;
  },

  attachmentDeleted(
    actor: string,
    file: string
  ) {
    return `${actor} removed "${file}".`;
  },

  inviteSent(
    actor: string,
    workspace: string
  ) {
    return `${actor} invited you to "${workspace}".`;
  },

  inviteAccepted(
    actor: string
  ) {
    return `${actor} accepted your invitation.`;
  },

  roleChanged(
    actor: string,
    role: string
  ) {
    return `${actor} changed your role to ${role}.`;
  },

  checklistCreated(
    actor: string,
    checklist: string
  ) {
    return `${actor} added "${checklist}".`;
  },

  checklistCompleted(
    actor: string,
    checklist: string
  ) {
    return `${actor} completed "${checklist}".`;
  },

  checklistDeleted(
    actor: string,
    checklist: string
  ) {
    return `${actor} removed "${checklist}".`;
  },

  dueDateChanged(
    actor: string
  ) {
    return `${actor} updated the due date.`;
  },

  estimateChanged(
    actor: string
  ) {
    return `${actor} updated the estimate.`;
  },

  priorityChanged(
    actor: string,
    priority: string
  ) {
    return `${actor} changed priority to ${priority}.`;
  },

  statusChanged(
    actor: string,
    status: string
  ) {
    return `${actor} changed status to ${status}.`;
  },

  titleChanged(
    actor: string,
    title: string
  ) {
    return `${actor} renamed the task to "${title}".`;
  },

  descriptionChanged(
    actor: string
  ) {
    return `${actor} updated the description.`;
  },

  archived(
    actor: string
  ) {
    return `${actor} archived this task.`;
  },

  restored(
    actor: string
  ) {
    return `${actor} restored this task.`;
  },

  deleted(
    actor: string
  ) {
    return `${actor} deleted this task.`;
  },

  duplicated(
    actor: string
  ) {
    return `${actor} duplicated this task.`;
  },

} as const;