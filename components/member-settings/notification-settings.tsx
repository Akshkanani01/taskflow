"use client";

import { useState, useTransition } from "react";
import { Bell } from "lucide-react";

import { updateNotificationPreferences } from "@/app/actions/member-actions";
import type { NotificationPreference } from "@prisma/client";

interface Props {
  preference: NotificationPreference | null;
}

type Settings = {
  taskAssigned: boolean;
  taskCompleted: boolean;
  taskCommented: boolean;
  mentions: boolean;
  invites: boolean;
};

export default function NotificationSettings({
  preference,
}: Props) {
  const [pending, startTransition] =
    useTransition();

  const [settings, setSettings] =
    useState<Settings>({
      taskAssigned:
        preference?.taskAssigned ?? true,

      taskCompleted:
        preference?.taskCompleted ?? true,

      taskCommented:
        preference?.taskCommented ?? true,

      mentions:
        preference?.mentions ?? true,

      invites:
        preference?.invites ?? true,
    });

  function toggle(
    key: keyof Settings
  ) {
    const updated = {
      ...settings,
      [key]: !settings[key],
    };

    setSettings(updated);

    startTransition(async () => {
      await updateNotificationPreferences(
        updated
      );
    });
  }

  const rows = [
    {
      key: "taskAssigned",
      title: "Task Assigned",
      description:
        "Notify when a task is assigned.",
    },

    {
      key: "taskCompleted",
      title: "Task Completed",
      description:
        "Notify when assigned tasks are completed.",
    },

    {
      key: "taskCommented",
      title: "Task Comments",
      description:
        "Notify when someone comments.",
    },

    {
      key: "mentions",
      title: "Mentions",
      description:
        "Notify when someone mentions you.",
    },

    {
      key: "invites",
      title: "Workspace Invites",
      description:
        "Receive workspace invitation alerts.",
    },
  ] as const;

  return (
    <section className="rounded-3xl border border-border bg-card p-7">

      <div className="mb-8 flex items-center gap-3">

        <Bell className="h-6 w-6 text-primary" />

        <h2 className="text-xl font-semibold text-foreground">
          Notification Preferences
        </h2>

      </div>

      <div className="space-y-4">

        {rows.map((row) => (

          <div
            key={row.key}
            className="flex items-center justify-between rounded-2xl border border-border bg-card p-5"
          >

            <div>

              <h3 className="font-semibold text-foreground">
                {row.title}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {row.description}
              </p>

            </div>

            <button
              disabled={pending}
              onClick={() =>
                toggle(row.key)
              }
              className={`relative h-7 w-14 rounded-full transition ${
                settings[row.key]
                  ? "bg-primary"
                  : "bg-muted"
              }`}
            >

              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-background transition ${
                  settings[row.key]
                    ? "left-8"
                    : "left-1"
                }`}
              />

            </button>

          </div>

        ))}

      </div>

    </section>
  );
}