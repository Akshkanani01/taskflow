"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

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
  createContext<
    NotificationContextType | null
  >(null);
  export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    notifications,
    setNotifications,
  ] = useState<
    NotificationItem[]
  >([]);

  const [
    unreadCount,
    setUnreadCount,
  ] = useState(0);

  const [
    connected,
    setConnected,
  ] = useState(false);

  const source =
    useRef<EventSource | null>(
      null
    );
      async function refresh() {

    const res =
      await fetch(
        "/api/notifications",
        {
          cache: "no-store",
        }
      );

    if (!res.ok) return;

    const data =
      await res.json();

    setNotifications(
      data.notifications
    );

    setUnreadCount(
      data.unread
    );
  }
    useEffect(() => {

    refresh();

    const eventSource =
      new EventSource(
        "/api/notifications/stream"
      );

    source.current =
      eventSource;

    eventSource.addEventListener(
      "connected",
      () => {

        setConnected(true);

      }
    );

    eventSource.onmessage =
      (event) => {

        const notification =
          JSON.parse(
            event.data
          );

        setNotifications(
          (prev) => {

            if (
              prev.some(
                (x) =>
                  x.id ===
                  notification.id
              )
            ) {
              return prev;
            }

            return [
              notification,
              ...prev,
            ];
          }
        );

        setUnreadCount(
          (count) =>
            count + 1
        );

      };
        eventSource.onerror = () => {
  setConnected(false);

  eventSource.close();
};

    return () => {

      eventSource.close();

    };

  }, []);
  async function markRead(
  notificationId: string
) {
  await fetch(
    "/api/notifications/read",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        notificationId,
      }),
    }
  );

  setNotifications((prev) =>
    prev.map((notification) =>
      notification.id ===
      notificationId
        ? {
            ...notification,
            read: true,
          }
        : notification
    )
  );

  setUnreadCount((count) =>
    Math.max(count - 1, 0)
  );
}

async function markAllRead() {
  await fetch(
    "/api/notifications/read-all",
    {
      method: "POST",
    }
  );

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
  await fetch(
    "/api/notifications/delete",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        notificationId,
      }),
    }
  );

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
export function useNotificationContext() {

  const context =
    useContext(
      NotificationContext
    );

  if (!context) {

    throw new Error(
      "useNotificationContext must be used inside NotificationProvider"
    );

  }

  return context;

}