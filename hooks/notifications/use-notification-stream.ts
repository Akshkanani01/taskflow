"use client";

import { useEffect, useState } from "react";

export function useNotificationStream(userId: string) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const es = new EventSource(
      `/api/notifications/stream?userId=${userId}`
    );

    es.onopen = () => {
      console.log("🔗 SSE Connected");
      setConnected(true);
    };

    es.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === "connected") {
        console.log("✅ SSE Ready");
      }

      if (msg.type === "notification") {
        console.log("📩 Notification received:", msg.data);

        setNotifications((prev) => [msg.data, ...prev]);
      }
    };

    es.onerror = (err) => {
      console.log("❌ SSE Error", err);
      es.close();
      setConnected(false);
    };

    return () => {
      es.close();
    };
  }, [userId]);

  return { notifications, connected };
}