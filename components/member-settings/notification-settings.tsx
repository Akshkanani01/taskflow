"use client";

import { useState, useTransition } from "react";
import { Bell } from "lucide-react";

import { updateNotificationPreferences } from "@/app/actions/member-actions";

interface Props {
  preference: any;
}

type Settings = {
  emailEnabled: boolean;
  pushEnabled: boolean;
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
      emailEnabled:
        preference?.emailEnabled ?? true,
      pushEnabled:
        preference?.pushEnabled ?? true,
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
      key: "emailEnabled",
      title: "Email Notifications",
      description:
        "Receive important updates by email.",
    },

    {
      key: "pushEnabled",
      title: "Push Notifications",
      description:
        "Receive browser push notifications.",
    },

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

    <section className="rounded-3xl border border-white/10 bg-[#111827] p-7">

      <div className="mb-8 flex items-center gap-3">

        <Bell className="h-6 w-6 text-indigo-400" />

        <h2 className="text-xl font-semibold text-white">

          Notification Preferences

        </h2>

      </div>

      <div className="space-y-4">

        {rows.map((row) => (

          <div
            key={row.key}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900 p-5"
          >

            <div>

              <h3 className="font-semibold text-white">

                {row.title}

              </h3>

              <p className="mt-1 text-sm text-slate-500">

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
                  ? "bg-indigo-600"
                  : "bg-slate-700"
              }`}

            >

              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
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