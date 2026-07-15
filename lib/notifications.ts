import {
  NotificationPriority,
  NotificationType,
} from "@prisma/client";

import { prisma } from "./prisma";

/**
 * ==========================================
 * Notification Payload
 * ==========================================
 */

export type CreateNotificationInput = {
  userId: string;

  title: string;

  message: string;

  type: NotificationType;

  priority?: NotificationPriority;

  link?: string | null;
};

/**
 * ==========================================
 * SSE Client
 * ==========================================
 */

type NotificationEvent = {
  id: string;

  userId: string;

  title: string;

  message: string;

  type: NotificationType;

  priority: NotificationPriority;

  link: string | null;

  createdAt: string;
};

const clients = new Map<
  string,
  Set<ReadableStreamDefaultController>
>();
/**
 * ==========================================
 * Register Client
 * ==========================================
 */

export function subscribeUser(
  userId: string,
  controller: ReadableStreamDefaultController
) {
  if (!clients.has(userId)) {
    clients.set(userId, new Set());
  }

  clients.get(userId)!.add(controller);
}

/**
 * ==========================================
 * Remove Client
 * ==========================================
 */

export function unsubscribeUser(
  userId: string,
  controller: ReadableStreamDefaultController
) {
  const list = clients.get(userId);

  if (!list) return;

  list.delete(controller);

  if (list.size === 0) {
    clients.delete(userId);
  }
}
/**
 * ==========================================
 * Broadcast
 * ==========================================
 */

export function broadcastNotification(
  notification: NotificationEvent
) {
  const subscribers =
    clients.get(notification.userId);

  if (!subscribers?.size) {
    return;
  }

  const payload =
    `data: ${JSON.stringify(
      notification
    )}\n\n`;

  for (const controller of subscribers) {
    try {
      controller.enqueue(payload);
    } catch {
      subscribers.delete(controller);
    }
  }
}
/**
 * ==========================================
 * Create Notification
 * ==========================================
 */

export async function createNotification(
  input: CreateNotificationInput
) {
  const notification =
    await prisma.notification.create({
      data: {
        userId: input.userId,

        title: input.title,

        message: input.message,

        type: input.type,

        priority:
          input.priority ??
          NotificationPriority.MEDIUM,

        link: input.link ?? null,
      },
    });

  broadcastNotification({
    id: notification.id,

    userId: notification.userId,

    title: notification.title,

    message: notification.message,

    type: notification.type,

    priority: notification.priority,

    link: notification.link,

    createdAt:
      notification.createdAt.toISOString(),
  });

  return notification;
}
/**
 * ==========================================
 * Mark Read
 * ==========================================
 */

export async function markNotificationRead(
  notificationId: string,
  userId: string
) {
  return prisma.notification.updateMany({
    where: {
      id: notificationId,

      userId,

      read: false,
    },

    data: {
      read: true,
    },
  });
}
/**
 * ==========================================
 * Mark All Read
 * ==========================================
 */

export async function markAllNotificationsRead(
  userId: string
) {
  return prisma.notification.updateMany({
    where: {
      userId,

      read: false,
    },

    data: {
      read: true,
    },
  });
}
/**
 * ==========================================
 * Delete Notification
 * ==========================================
 */

export async function deleteNotification(
  notificationId: string,
  userId: string
) {
  return prisma.notification.deleteMany({
    where: {
      id: notificationId,

      userId,
    },
  });
}
/**
 * ==========================================
 * Get Unread Count
 * ==========================================
 */

export async function getUnreadCount(
  userId: string
) {
  return prisma.notification.count({
    where: {
      userId,

      read: false,
    },
  });
}
/**
 * ==========================================
 * Recent Notifications
 * ==========================================
 */

export async function getRecentNotifications(
  userId: string,
  take = 20
) {
  return prisma.notification.findMany({
    where: {
      userId,
    },

    orderBy: {
      createdAt: "desc",
    },

    take,
  });
}