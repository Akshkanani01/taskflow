"use client";

import { useState } from "react";
import { useNotifications } from "@/hooks/notifications/use-notification-stream";
import NotificationDropdown from "./notification-dropdown";

export default function NotificationBell({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);

  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
  } = useNotifications(userId);

  return (
    <div className="relative">
      {/* 🔔 Bell */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-100"
      >
        🔔

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* 📩 Dropdown */}
      {open && (
        <NotificationDropdown
          notifications={notifications}
          loading={loading}
          markAsRead={markAsRead}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}