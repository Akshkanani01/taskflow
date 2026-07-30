"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type NotificationPreferences = {
  enabled: boolean;
  desktopNotifications: boolean;
  soundEnabled: boolean;
  doNotDisturb: boolean;
  dndFrom: string;
  dndUntil: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link: string | null;
  type: string;
  priority: string;
};

type NotificationContextType = {
  connected: boolean;
  unreadCount: number;
  notifications: NotificationItem[];

  refresh: () => Promise<void>;

  markRead: (
    id: string
  ) => Promise<void>;

  markAllRead: () => Promise<void>;

  remove: (
    id: string
  ) => Promise<void>;
};

const NotificationContext =
  createContext<NotificationContextType | null>(
    null
  );

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    notifications,
    setNotifications,
  ] = useState<NotificationItem[]>([]);

  const [
    unreadCount,
    setUnreadCount,
  ] = useState(0);

  const [
    preferences,
    setPreferences,
  ] =
    useState<NotificationPreferences | null>(
      null
    );

  const [
    connected,
    setConnected,
  ] = useState(false);

  const source =
    useRef<EventSource | null>(
      null
    );
      async function refresh() {
    const res = await fetch(
      "/api/notifications",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return;
    }

    const data: {
      notifications: NotificationItem[];
      unread: number;
      preferences: NotificationPreferences | null;
    } = await res.json();

    setNotifications(
      data.notifications
    );

    setUnreadCount(
      data.unread
    );

    setPreferences(
      data.preferences
    );
  }

  async function showDesktopNotification(
    notification: NotificationItem
  ) {
    console.log(
  "Permission:",
  Notification.permission
);

console.log(
  "Preferences:",
  preferences
);
    console.log("Desktop notification called", notification);
    if (preferences) {
  if (
    !preferences.enabled ||
    !preferences.desktopNotifications
  ) {
    return;
  }
}

    if (
      typeof window === "undefined" ||
      !("Notification" in window)
    ) {
      return;
    }

    let permission =
      Notification.permission;

    if (
      permission === "default"
    ) {
      permission =
        await Notification.requestPermission();
    }

    if (
      permission !==
      "granted"
    ) {
      return;
    }

    const browserNotification =
      new Notification(
        notification.title,
        {
          body: notification.message,
          tag: notification.id,
          requireInteraction: false,
        }
      );

    browserNotification.onclick =
      () => {
        window.focus();

        if (
          notification.link
        ) {
          window.location.assign(
            notification.link
          );
        }

        browserNotification.close();
      };
  }
    useEffect(() => {
    void refresh();

    const eventSource = new EventSource(
      "/api/notifications/stream"
    );

    source.current = eventSource;

    eventSource.onopen = () => {
      setConnected(true);
    };

    eventSource.onmessage = async (event) => {
      console.log("SSE Event:", event.data);
      const notification: NotificationItem =
        JSON.parse(event.data);

      console.log(
        "New notification:",
        notification
      );

      setNotifications((prev) => {
        const exists = prev.some(
          (item) =>
            item.id ===
            notification.id
        );

        if (exists) {
          return prev;
        }

        return [
          notification,
          ...prev,
        ];
      });

      setUnreadCount(
        (count) => count + 1
      );
try {
  await showDesktopNotification(
    notification
  );
} catch (error) {
  console.error(
    "Desktop notification error:",
    error
  );
}
    };

    eventSource.onerror = () => {
      setConnected(false);
    };

    return () => {
      eventSource.close();
      source.current = null;
      setConnected(false);
    };
  }, []);
    async function markRead(
    notificationId: string
  ) {
    const res = await fetch(
      `/api/notifications/${notificationId}/read`,
      {
        method: "POST",
      }
    );

    if (!res.ok) {
      return;
    }

    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );

    setUnreadCount((count) =>
      Math.max(0, count - 1)
    );
  }

  async function markAllRead() {
    const res = await fetch(
      "/api/notifications/read-all",
      {
        method: "POST",
      }
    );

    if (!res.ok) {
      return;
    }

    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      }))
    );

    setUnreadCount(0);
  }

  async function remove(
    notificationId: string
  ) {
    const res = await fetch(
      `/api/notifications/${notificationId}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      return;
    }

    setNotifications((prev) =>
      prev.filter(
        (notification) =>
          notification.id !==
          notificationId
      )
    );
  }
    return (
    <NotificationContext.Provider
      value={{
        connected,
        unreadCount,
        notifications,
        refresh,
        markRead,
        markAllRead,
        remove,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(
    NotificationContext
  );

  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }

  return context;
}
export function useNotificationContext() {
  return useNotifications();
}