"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  CheckCheck,
  Filter,
} from "lucide-react";

type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [tab, setTab] = useState<"all" | "unread">("all");

  // 🔥 fetch notifications
  useEffect(() => {
    fetch("/api/notifications/list")
      .then((res) => res.json())
      .then((data) => setNotifications(data.notifications || []));
  }, []);

  const filtered = notifications.filter((n) =>
    tab === "unread" ? !n.read : true
  );

  const markAsRead = async (id: string) => {
    await fetch("/api/notifications/mark-read", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const markAll = async () => {
    await fetch("/api/notifications/mark-all-read", {
      method: "POST",
    });

    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bell size={22} />
            Notifications
          </h1>
          <p className="text-slate-400 text-sm">
            Your activity inbox
          </p>
        </div>

        <button
          onClick={markAll}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm hover:bg-indigo-700"
        >
          <CheckCheck size={16} />
          Mark all as read
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-2 mb-6">
        <TabButton active={tab === "all"} onClick={() => setTab("all")}>
          All ({notifications.length})
        </TabButton>

        <TabButton
          active={tab === "unread"}
          onClick={() => setTab("unread")}
        >
          Unread ({notifications.filter(n => !n.read).length})
        </TabButton>
      </div>

      {/* LIST */}
      <div className="space-y-3">

        {filtered.length === 0 && (
          <div className="text-center text-slate-500 py-20">
            No notifications found
          </div>
        )}

        {groupByDate(filtered).map((group) => (
          <div key={group.label}>
            
            {/* GROUP TITLE */}
            <p className="text-xs text-slate-500 uppercase mb-2">
              {group.label}
            </p>

            <div className="space-y-2">

              {group.items.map((n) => (
                <div
                  key={n.id}
                  className={`
                    flex items-start justify-between
                    rounded-xl border border-white/10
                    p-4 cursor-pointer
                    hover:bg-slate-900
                    ${!n.read ? "bg-slate-900/50" : ""}
                  `}
                  onClick={() => markAsRead(n.id)}
                >
                  <div>
                    <p className="font-medium text-white">
                      {n.title}
                    </p>
                    <p className="text-sm text-slate-400">
                      {n.message}
                    </p>
                  </div>

                  {!n.read && (
                    <span className="h-2 w-2 rounded-full bg-red-500 mt-2" />
                  )}
                </div>
              ))}

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

/* TAB BUTTON */
function TabButton({
  active,
  onClick,
  children,
}: any) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-xl text-sm
        border border-white/10
        transition
        ${
          active
            ? "bg-indigo-600 text-white"
            : "text-slate-400 hover:bg-slate-900"
        }
      `}
    >
      {children}
    </button>
  );
}

/* GROUP BY DATE */
function groupByDate(items: any[]) {
  const today: any[] = [];
  const earlier: any[] = [];

  items.forEach((n) => {
    const isToday =
      new Date(n.createdAt).toDateString() ===
      new Date().toDateString();

    if (isToday) today.push(n);
    else earlier.push(n);
  });

  const result = [];

  if (today.length)
    result.push({ label: "Today", items: today });

  if (earlier.length)
    result.push({ label: "Earlier", items: earlier });

  return result;
}