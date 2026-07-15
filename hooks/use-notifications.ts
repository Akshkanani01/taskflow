"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

export type LiveNotification = {
  id: string;

  userId: string;

  title: string;

  message: string;

  type: string;

  priority: string;

  link: string | null;

  createdAt: string;
};

export function useNotifications() {
  const [connected, setConnected] =
    useState(false);

  const [notifications, setNotifications] =
    useState<LiveNotification[]>([]);

  const eventSource =
    useRef<EventSource | null>(null);
      useEffect(() => {

    const source =
      new EventSource(
        "/api/notifications/stream"
      );

    eventSource.current = source;

    source.addEventListener(
      "connected",
      () => {
        setConnected(true);
      }
    );

    source.addEventListener(
      "ping",
      () => {}
    );
        source.onmessage = (
      event
    ) => {

      const notification =
        JSON.parse(
          event.data
        ) as LiveNotification;

      setNotifications(
        (previous) => [
          notification,
          ...previous,
        ]
      );

    };
        source.onerror = () => {

      setConnected(false);

      source.close();

      setTimeout(() => {

        eventSource.current =
          new EventSource(
            "/api/notifications/stream"
          );

      }, 3000);

    };

    return () => {

      source.close();

    };

  }, []);
    return {

    connected,

    notifications,

  };

}