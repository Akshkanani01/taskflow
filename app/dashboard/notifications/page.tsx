import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  AlertCircle,
  Bell,
  CheckCircle,
  Clock3,
  ExternalLink,
  FolderKanban,
  MessageSquare,
} from "lucide-react";

import { formatDistanceToNowStrict } from "date-fns";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function NotificationsPage() {
  const session =
    await auth.api.getSession({
      headers: await headers(),
    });

  if (!session?.user) {
    redirect("/login");
  }

  const notifications =
    await prisma.notification.findMany({
      where: {
        userId: session.user.id,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 100,
    });

  const totalNotifications =
    notifications.length;

  const unreadNotifications =
    notifications.filter(
      (notification) =>
        !notification.read
    );

  const importantNotifications =
    notifications.filter(
      (notification) =>
        notification.priority ===
          "HIGH" ||
        notification.priority ===
          "URGENT"
    );

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-foreground">
            Notifications
          </h1>

          <p className="mt-2 text-muted-foreground">
            Stay updated with workspace activity.
          </p>

        </div>

        <button
          className="
            rounded-xl
            border
            border-border
            px-4
            py-3
            text-foreground
          "
        >
          Mark All Read
        </button>

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <div
          className="
            rounded-3xl
            border
            border-border
            bg-card
            p-6
          "
        >

          <Bell
            className="
              mb-4
              text-indigo-400
            "
          />

          <h2
            className="
              text-3xl
              font-bold
              text-foreground
            "
          >
            {totalNotifications}
          </h2>

          <p
            className="
              text-muted-foreground
            "
          >
            Total Notifications
          </p>

        </div>

        <div
          className="
            rounded-3xl
            border
            border-border
            bg-card
            p-6
          "
        >

          <CheckCircle
            className="
              mb-4
              text-emerald-400
            "
          />

          <h2
            className="
              text-3xl
              font-bold
              text-foreground
            "
          >
            {unreadNotifications.length}
          </h2>

          <p
            className="
              text-muted-foreground
            "
          >
            Unread
          </p>

        </div>

        <div
          className="
            rounded-3xl
            border
            border-border
            bg-card
            p-6
          "
        >

          <AlertCircle
            className="
              mb-4
              text-amber-400
            "
          />

          <h2
            className="
              text-3xl
              font-bold
              text-foreground
            "
          >
            {importantNotifications.length}
          </h2>

          <p
            className="
              text-muted-foreground
            "
          >
            Important Alerts
          </p>

        </div>

      </div>

      <div
        className="
          rounded-3xl
          border
          border-border
          bg-card
          p-6
        "
      >

        <h2
          className="
            mb-6
            text-xl
            font-semibold
            text-foreground
          "
        >
          Recent Notifications
        </h2>

        <div className="space-y-4">
                    {notifications.length === 0 ? (

            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-dashed
                border-border
                py-20
              "
            >

              <Bell
                size={48}
                className="text-slate-600"
              />

              <h3
                className="
                  mt-6
                  text-2xl
                  font-semibold
                  text-foreground
                "
              >
                No Notifications
              </h3>

             <p
  className="
    mt-2
    text-muted-foreground
  "
>
  You&apos;re all caught up.
</p>
            </div>

          ) : (

            notifications.map(
              (notification) => {

                const Icon =

                  notification.type.includes(
                    "COMMENT"
                  )

                    ? MessageSquare

                    : notification.type.includes(
                        "TASK"
                      )

                    ? CheckCircle

                    : notification.type.includes(
                        "FILE"
                      )

                    ? FolderKanban

                    : notification.type.includes(
                        "SYSTEM"
                      )

                    ? Clock3

                    : Bell;

                const color =

                  notification.priority ===
                  "URGENT"

                    ? "text-red-400"

                    : notification.priority ===
                      "HIGH"

                    ? "text-orange-400"

                    : notification.priority ===
                      "MEDIUM"

                    ? "text-indigo-400"

                    : "text-muted-foreground";

                return (

                  <div
                    key={notification.id}
                    className={`
                      flex
                      items-start
                      gap-4
                      rounded-2xl
                      border
                      ${
                        notification.read

                          ? "border-border"

                          : "border-indigo-500/30"
                      }
                      bg-background
                      p-5
                      transition
                      hover:border-indigo-500/40
                    `}
                  >

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        bg-background
                      "
                    >

                      <Icon
                        size={20}
                        className={color}
                      />

                    </div>

                    <div className="flex-1">

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          gap-6
                        "
                      >

                        <h3
                          className="
                            font-semibold
                            text-foreground
                          "
                        >
                          {notification.title}
                        </h3>

                        <span
                          className="
                            whitespace-nowrap
                            text-xs
                            text-muted-foreground
                          "
                        >
                          {formatDistanceToNowStrict(
                            notification.createdAt,
                            {
                              addSuffix: true,
                            }
                          )}
                        </span>

                      </div>

                      <p
                        className="
                          mt-2
                          text-sm
                          text-muted-foreground
                        "
                      >
                        {notification.message}
                      </p>

                      {notification.link && (

                        <Link
                          href={
                            notification.link
                          }
                          className="
                            mt-4
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            font-medium
                            text-indigo-400
                            hover:text-indigo-300
                          "
                        >

                          Open

                          <ExternalLink
                            size={15}
                          />

                        </Link>

                      )}

                    </div>

                  </div>

                );

              }

            )

          )}
                  </div>

      </div>

      <div
        className="
          flex
          items-center
          justify-between
          rounded-3xl
          border
          border-border
          bg-card
          p-6
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
            Notification Summary
          </h3>

          <p
            className="
              mt-2
              text-sm
              text-muted-foreground
            "
          >
            Total {totalNotifications} notifications
            •
            {" "}
            {unreadNotifications.length}
            {" "}
            unread
            •
            {" "}
            {importantNotifications.length}
            {" "}
            important
          </p>

        </div>

        <Link
          href="/dashboard"
          className="
            rounded-xl
            border
            border-border
            bg-background
            px-5
            py-3
            text-sm
            font-medium
            text-foreground
            transition
            hover:bg-slate-700
          "
        >
          Back to Dashboard
        </Link>

      </div>

    </div>

  );

}