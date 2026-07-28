"use client";

import Link from "next/link";

import {
  Bell,
  CheckCheck,
  Trash2,
  ExternalLink,
} from "lucide-react";

import {
  formatDistanceToNowStrict,
} from "date-fns";

import {
  useNotificationContext,
} from "@/components/providers/notification-provider";

type Props = {
  close: () => void;
};

export default function NotificationDropdown({
  close,
}: Props) {

  const {
    notifications,
    unreadCount,
    markRead,
    markAllRead,
    remove,
  } =
    useNotificationContext();

  return (

    <div
      className="
        absolute
        right-0
        top-14
        z-50
        w-[430px]
        overflow-hidden
        rounded-2xl
        border
        border-border
        bg-card
        shadow-2xl
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-border
          px-5
          py-4
        "
      >

        <div>

          <h3
            className="
              text-lg
              font-semibold
              text-foreground
            "
          >
            Notifications
          </h3>


          <p
            className="
              mt-1
              text-xs
              text-muted-foreground
            "
          >
            {unreadCount} unread
          </p>

        </div>


        <button

          onClick={() =>
            markAllRead()
          }

          className="
            flex
            items-center
            gap-2
            rounded-lg
            border
            border-border
            px-3
            py-2
            text-xs
            text-muted-foreground
            transition
            hover:bg-accent
          "
        >

          <CheckCheck size={15} />

          Mark all

        </button>

      </div>


      <div
        className="
          max-h-[550px]
          overflow-y-auto
        "
      >

        {notifications.length === 0 && (

          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              px-10
              py-16
            "
          >

            <Bell
              size={42}
              className="text-muted-foreground"
            />

            <h4
              className="
                mt-5
                text-lg
                font-semibold
                text-foreground
              "
            >
              No notifications
            </h4>

            <p
              className="
                mt-2
                text-center
                text-sm
                text-muted-foreground
              "
            >
              Everything is up to date.
            </p>

          </div>

        )}
        
        {notifications.map(
          (notification) => {

            const priorityColor =

              notification.priority ===
              "URGENT"

                ? "border-red-500/40"

                : notification.priority ===
                  "HIGH"

                ? "border-orange-500/40"

                : notification.priority ===
                  "MEDIUM"

                ? "border-indigo-500/30"

                : "border-border";


            return (

              <div
                key={notification.id}
                className={`
                  group
                  relative
                  border-b
                  ${priorityColor}
                  transition
                  hover:bg-accent/50
                `}
              >

                {!notification.read && (

                  <div
                    className="
                      absolute
                      left-3
                      top-7
                      h-2
                      w-2
                      rounded-full
                      bg-indigo-500
                    "
                  />

                )}


                <div
                  className="
                    flex
                    items-start
                    gap-4
                    px-5
                    py-4
                  "
                >

                  <div
                    className="
                      mt-1
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-muted
                    "
                  >

                    <Bell
                      size={18}
                      className="text-indigo-400"
                    />

                  </div>


                  <div
                    className="
                      min-w-0
                      flex-1
                    "
                  >

                    <h4
                      className="
                        truncate
                        font-medium
                        text-foreground
                      "
                    >
                      {notification.title}
                    </h4>


                    <p
                      className="
                        mt-1
                        line-clamp-2
                        text-sm
                        text-muted-foreground
                      "
                    >
                      {notification.message}
                    </p>


                    <p
                      className="
                        mt-3
                        text-xs
                        text-muted-foreground
                      "
                    >
                      {formatDistanceToNowStrict(
                        new Date(
                          notification.createdAt
                        ),
                        {
                          addSuffix: true,
                        }
                      )}
                    </p>

                  </div>


                  <div
                    className="
                      flex
                      flex-col
                      items-end
                      gap-2
                    "
                  >

                    {notification.link && (

                      <Link

                        href={
                          notification.link
                        }

                        onClick={async () => {

                          if (
                            !notification.read
                          ) {

                            await markRead(
                              notification.id
                            );

                          }

                          close();

                        }}

                        className="
                          rounded-lg
                          border
                          border-border
                          p-2
                          text-muted-foreground
                          transition
                          hover:bg-accent
                          hover:text-foreground
                        "
                      >

                        <ExternalLink
                          size={15}
                        />

                      </Link>

                    )}


                    <button

                      onClick={async () => {

                        await remove(
                          notification.id
                        );

                      }}

                      className="
                        rounded-lg
                        border
                        border-red-500/20
                        p-2
                        text-red-400
                        transition
                        hover:bg-red-500/10
                      "
                    >

                      <Trash2
                        size={15}
                      />

                    </button>

                  </div>


                </div>

              </div>

            );

          }
        )}

      </div>


      <div
        className="
          border-t
          border-border
          p-4
        "
      >

        <Link

          href="/dashboard/notifications"

          onClick={close}

          className="
            flex
            w-full
            items-center
            justify-center
            rounded-xl
            border
            border-border
            bg-muted
            py-3
            text-sm
            font-medium
            text-foreground
            transition
            hover:bg-accent
          "
        >

          View All Notifications

        </Link>

      </div>


    </div>

  );

}