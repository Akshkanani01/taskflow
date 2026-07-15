import {
  NotificationPriority,
  NotificationType,
} from "@prisma/client";

/**
 * =====================================================
 * Notification Event Names
 * =====================================================
 */

export const NotificationEvents = {
  TASK_CREATED: NotificationType.TASK_CREATED,

  TASK_ASSIGNED: NotificationType.TASK_ASSIGNED,

  TASK_COMPLETED: NotificationType.TASK_COMPLETED,

  TASK_MOVED: NotificationType.TASK_MOVED,

  TASK_COMMENTED: NotificationType.TASK_COMMENTED,

  TASK_MENTIONED: NotificationType.TASK_MENTIONED,

  FILE_UPLOADED: NotificationType.FILE_UPLOADED,

  INVITE_SENT: NotificationType.INVITE_SENT,

  INVITE_ACCEPTED:
    NotificationType.INVITE_ACCEPTED,

  ROLE_CHANGED:
    NotificationType.ROLE_CHANGED,

  SYSTEM: NotificationType.SYSTEM,
} as const;

/**
 * =====================================================
 * Notification Priorities
 * =====================================================
 */

export const NotificationPriorities = {
  LOW: NotificationPriority.LOW,

  MEDIUM: NotificationPriority.MEDIUM,

  HIGH: NotificationPriority.HIGH,

  URGENT: NotificationPriority.URGENT,
} as const;

/**
 * =====================================================
 * Priority Colors
 * =====================================================
 */

export const NotificationPriorityColor = {
  LOW: "slate",

  MEDIUM: "blue",

  HIGH: "orange",

  URGENT: "red",
} as const;

/**
 * =====================================================
 * Notification Icons
 * =====================================================
 */

export const NotificationIcon = {
  TASK_CREATED: "plus",

  TASK_ASSIGNED: "user-plus",

  TASK_COMPLETED: "check",

  TASK_MOVED: "move",

  TASK_COMMENTED: "message-circle",

  TASK_MENTIONED: "at-sign",

  FILE_UPLOADED: "paperclip",

  INVITE_SENT: "users",

  INVITE_ACCEPTED: "check-circle",

  ROLE_CHANGED: "shield",

  SYSTEM: "bell",
} as const;

/**
 * =====================================================
 * Limits
 * =====================================================
 */

export const NotificationLimits = {
  DROPDOWN_LIMIT: 20,

  PAGE_LIMIT: 50,
} as const;

/**
 * =====================================================
 * SSE
 * =====================================================
 */

export const NotificationSSE = {
  HEARTBEAT_INTERVAL: 25000,

  RECONNECT_DELAY: 3000,
} as const;