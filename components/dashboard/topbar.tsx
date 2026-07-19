"use client";

import { Command, Search } from "lucide-react";

import NotificationBell from "@/components/notifications/notification-bell";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { UserMenu } from "./user-menu";

export function Topbar() {
  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-20
        items-center
        justify-between
        border-b
        border-white/10
        bg-slate-950/80
        px-8
        backdrop-blur-2xl
      "
    >
      {/* Left */}

      <div className="flex shrink-0 items-center">
        <WorkspaceSwitcher />
      </div>

      {/* Center */}

      <div className="mx-10 flex min-w-0 flex-1 justify-center">
        <div className="relative w-full max-w-2xl">
          <Search
            size={18}
            className="
              pointer-events-none
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-500
            "
          />

          <input
            type="search"
            aria-label="Search"
            autoComplete="off"
            spellCheck={false}
            placeholder="Search workspaces, spaces, lists and tasks..."
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-white/10
              bg-slate-900/70
              pl-11
              pr-20
              text-sm
              text-white
              placeholder:text-slate-500
              outline-none
              transition-all
              duration-200
              focus:border-blue-500/40
              focus:ring-2
              focus:ring-blue-500/20
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              right-3
              top-1/2
              flex
              -translate-y-1/2
              items-center
              gap-1
              rounded-lg
              border
              border-white/10
              bg-white/5
              px-2.5
              py-1
              text-xs
              text-slate-400
            "
          >
            <Command size={12} />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right */}

      <div className="flex shrink-0 items-center gap-3">
        <NotificationBell />

        <UserMenu />
      </div>
    </header>
  );
}