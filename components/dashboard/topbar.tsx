"use client";

import {
  Bell,
  Search,
  Settings,
  ChevronDown,
  Command,
} from "lucide-react";

import { WorkspaceSwitcher } from "./workspace-switcher";
import { useNotificationStream } from "@/hooks/notifications/use-notification-stream";
import { useState } from "react";

export function Topbar() {
  const userId = "test-user"; // 🔥 replace with session user id

  const { notifications } = useNotificationStream(userId);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-white/10 bg-slate-950/90 px-8 backdrop-blur-xl">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <WorkspaceSwitcher />
      </div>

      {/* CENTER SEARCH */}
      <div className="flex flex-1 justify-center px-8">
        <div className="relative w-full max-w-xl">
          <Search size={18} className="absolute left-4 top-3.5 text-slate-500" />

          <input
            placeholder="Search spaces, lists, tasks..."
            className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 pl-11 pr-20 text-white outline-none"
          />

          <div className="absolute right-3 top-2.5 flex items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-xs text-slate-400">
            <Command size={12} />
            K
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 relative">

        {/* 🔔 NOTIFICATION */}
        <button
          onClick={() => setOpen(!open)}
          className="relative rounded-xl border border-white/10 bg-slate-900 p-3 text-slate-300"
        >
          <Bell size={18} />

          {/* 🔴 unread badge */}
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] text-white">
              {unreadCount}
            </span>
          )}
        </button>

        {/* SETTINGS */}
        <button className="rounded-xl border border-white/10 bg-slate-900 p-3 text-slate-300">
          <Settings size={18} />
        </button>

        {/* PROFILE */}
        <button className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900 px-3 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
            A
          </div>

          <div className="hidden text-left lg:block">
            <p className="text-sm font-medium text-white">Aksh Kanani</p>
            <p className="text-xs text-slate-400">Owner</p>
          </div>

          <ChevronDown size={16} className="text-slate-500" />
        </button>

        {/* 🔥 DROPDOWN (optional simple version) */}
        {open && (
          <div className="absolute right-0 top-14 w-80 rounded-xl border border-white/10 bg-slate-900 shadow-xl">
            <div className="p-3 border-b border-white/10 text-white font-medium">
              Notifications
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="p-4 text-sm text-slate-400">
                  No notifications
                </p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className="border-b border-white/10 p-3 hover:bg-slate-800"
                  >
                    <p className="text-sm text-white">{n.title}</p>
                    <p className="text-xs text-slate-400">
                      {n.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </header>
  );
}