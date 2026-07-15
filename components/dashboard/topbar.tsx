"use client";

import {
  Bell,
  Search,
  Plus,
  Command,
  Settings,
  ChevronDown,
} from "lucide-react";
import NotificationBell from "@/components/notifications/notification-bell";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { CreateMenu } from "@/components/create/create-menu";
export function Topbar() {
  return (
    <header
      className="
        sticky top-0 z-40
        flex h-20 items-center justify-between
        border-b border-white/10
        bg-slate-950/90
        px-8
        backdrop-blur-xl
      "
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <WorkspaceSwitcher />
      </div>

      {/* Center Search */}
      <div className="flex flex-1 justify-center px-8">
        <div className="relative w-full max-w-xl">
          <Search
            size={18}
            className="
              absolute left-4 top-3.5
              text-slate-500
            "
          />

          <input
            placeholder="Search spaces, lists, tasks..."
            className="
              h-11 w-full
              rounded-xl
              border border-white/10
              bg-slate-900
              pl-11 pr-20
              text-white
              outline-none
            "
          />

          <div
            className="
              absolute right-3 top-2.5
              flex items-center gap-1
              rounded-lg
              border border-white/10
              px-2 py-1
              text-xs text-slate-400
            "
          >
            <Command size={12} />
            K
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
      <CreateMenu />

        <NotificationBell />

        <button
          className="
            rounded-xl
            border border-white/10
            bg-slate-900
            p-3
            text-slate-300
          "
        >
          <Settings size={18} />
        </button>

        <button
          className="
            flex items-center gap-3
            rounded-xl
            border border-white/10
            bg-slate-900
            px-3 py-2
          "
        >
          <div
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-full
              bg-indigo-600
              font-semibold
              text-white
            "
          >
            A
          </div>

          <div className="hidden text-left lg:block">
            <p className="text-sm font-medium text-white">
              Aksh Kanani
            </p>

            <p className="text-xs text-slate-400">
              Owner
            </p>
          </div>

          <ChevronDown
            size={16}
            className="text-slate-500"
          />
        </button>
      </div>
    </header>
  );
}