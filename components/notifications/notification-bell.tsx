"use client";

import { useState } from "react";

import { Bell } from "lucide-react";

import { useNotificationContext } from "@/components/providers/notification-provider";

import NotificationDropdown from "./notification-dropdown";

export default function NotificationBell() {

  const [open, setOpen] =
    useState(false);

  const {
    unreadCount,
    connected,
  } =
    useNotificationContext();

  return (

    <div className="relative">

      <button

        onClick={() =>
          setOpen(
            !open
          )
        }

        className="
          relative
          rounded-xl
          border
          border-border
          bg-card
          p-3
          text-foreground
          transition
          hover:bg-accent
        "
      >

        <Bell size={18} />

        {unreadCount > 0 && (

          <span
            className="
              absolute
              -right-1
              -top-1
              flex
              h-5
              min-w-[20px]
              items-center
              justify-center
              rounded-full
              bg-red-600
              px-1
              text-[10px]
              font-bold
              text-foreground
            "
          >

            {unreadCount > 99
              ? "99+"
              : unreadCount}

          </span>

        )}

        <span
          className={`
            absolute
            bottom-1
            right-1
            h-2
            w-2
            rounded-full
            ${
              connected
                ? "bg-emerald-500"
                : "bg-red-500"
            }
          `}
        />

      </button>

      {open && (

        <NotificationDropdown

          close={() =>
            setOpen(false)
          }

        />

      )}

    </div>

  );

}