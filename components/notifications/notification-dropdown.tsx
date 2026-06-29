"use client";

import { useState } from "react";

export default function NotificationDropdown({
  notifications,
  loading,
  markAsRead,
  onClose,
}: any) {
  const [tab, setTab] = useState<"all" | "unread">("all");

  const filtered =
    tab === "unread"
      ? notifications.filter((n: any) => !n.read)
      : notifications;

  return (
    <div className="absolute right-0 mt-3 w-96 bg-white shadow-xl rounded-xl border z-50">
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="font-semibold">Notifications</h2>
        <button onClick={onClose} className="text-gray-500">
          ✕
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b text-sm">
        <button
          onClick={() => setTab("all")}
          className={`flex-1 p-2 ${
            tab === "all" ? "font-bold border-b-2" : ""
          }`}
        >
          All
        </button>

        <button
          onClick={() => setTab("unread")}
          className={`flex-1 p-2 ${
            tab === "unread" ? "font-bold border-b-2" : ""
          }`}
        >
          Unread
        </button>
      </div>

      {/* List */}
      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <p className="p-4 text-sm text-gray-500">
            Loading...
          </p>
        ) : filtered.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">
            No notifications
          </p>
        ) : (
          filtered.map((n: any) => (
            <div
              key={n.id}
              className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${
                !n.read ? "bg-blue-50" : ""
              }`}
              onClick={() => {
                markAsRead(n.id);
                if (n.link) window.location.href = n.link;
              }}
            >
              <p className="font-medium text-sm">
                {n.title}
              </p>
              <p className="text-xs text-gray-500">
                {n.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}