"use client";

import {
  Bell,
  CalendarClock,
  Volume2,
  MonitorSmartphone,
} from "lucide-react";

import {
  useEffect,
  useState,
  useTransition,
} from "react";

import { getNotificationPreferences } from "@/app/actions/preferences/get-notification-preferences";
import { updateNotificationPreferences } from "@/app/actions/preferences/update-notification-preferences";

type NotificationPreferences = {
  enabled: boolean;

  desktopNotifications: boolean;

  soundEnabled: boolean;

  doNotDisturb: boolean;

  dndFrom: string;

  dndUntil: string;

  taskAssigned: boolean;

  taskCompleted: boolean;

  taskCommented: boolean;

  mentions: boolean;

  invites: boolean;
};

const DEFAULT_PREFERENCES: NotificationPreferences = {
  enabled: true,

  desktopNotifications: true,

  soundEnabled: true,

  doNotDisturb: false,

  dndFrom: "22:00",

  dndUntil: "08:00",

  taskAssigned: true,

  taskCompleted: true,

  taskCommented: true,

  mentions: true,

  invites: true,
};

export default function NotificationsPanel() {
  const [preferences, setPreferences] =
    useState<NotificationPreferences>(
      DEFAULT_PREFERENCES
    );

  const [loading, setLoading] =
    useState(true);

  const [isPending, startTransition] =
    useTransition();

  useEffect(() => {
    async function load() {
      try {
        const data =
          await getNotificationPreferences();

        if (data) {
          setPreferences({
            enabled: data.enabled,

            desktopNotifications:
              data.desktopNotifications,

            soundEnabled:
              data.soundEnabled,

            doNotDisturb:
              data.doNotDisturb,

            dndFrom:
              data.dndFrom,

            dndUntil:
              data.dndUntil,

            taskAssigned:
              data.taskAssigned,

            taskCompleted:
              data.taskCompleted,

            taskCommented:
              data.taskCommented,

            mentions:
              data.mentions,

            invites:
              data.invites,
          });
        }
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  function updatePreference<
    K extends keyof NotificationPreferences
  >(
    key: K,
    value: NotificationPreferences[K]
  ) {
    setPreferences((previous) => ({
      ...previous,
      [key]: value,
    }));

    startTransition(async () => {
      await updateNotificationPreferences({
        [key]: value,
      });
    });
  }

  if (loading) {
    return (
      <div className="py-16 text-center text-slate-400">
        Loading notification preferences...
      </div>
    );
  }
    return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Notifications
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Configure your in-app notification preferences.
        </p>
      </div>

      {/* In-App Notifications */}

      <section className="rounded-2xl border border-white/10 bg-slate-900/40">
        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-blue-400" />

            <div>
              <h3 className="font-medium text-white">
                In-App Notifications
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Receive important updates directly inside TaskFlow.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5 p-6">
          {[
            {
              key: "taskAssigned",
              title: "Task Assigned",
              description:
                "Notify when a task is assigned to you.",
            },
            {
              key: "taskCompleted",
              title: "Task Completed",
              description:
                "Notify when assigned tasks are completed.",
            },
            {
              key: "taskCommented",
              title: "Comments",
              description:
                "Notify when someone comments on your task.",
            },
            {
              key: "mentions",
              title: "@Mentions",
              description:
                "Notify when someone mentions you.",
            },
            {
              key: "invites",
              title: "Workspace Invites",
              description:
                "Notify when you're invited to a workspace.",
            },
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950 p-4"
            >
              <div>
                <p className="font-medium text-white">
                  {item.title}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  {item.description}
                </p>
              </div>

              <input
                type="checkbox"
                checked={
                  preferences[
                    item.key as keyof NotificationPreferences
                  ] as boolean
                }
                disabled={isPending}
                onChange={(event) =>
                  updatePreference(
                    item.key as keyof NotificationPreferences,
                    event.target.checked as never
                  )
                }
                className="h-5 w-5"
              />
            </label>
          ))}
        </div>
      </section>
            {/* Notification Behavior */}

      <section className="rounded-2xl border border-white/10 bg-slate-900/40">
        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <MonitorSmartphone className="h-5 w-5 text-emerald-400" />

            <div>
              <h3 className="font-medium text-white">
                Notification Behavior
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Configure how TaskFlow delivers notifications.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5 p-6">
          <label className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950 p-4">
            <div>
              <p className="font-medium text-white">
                Desktop Notifications
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Show browser notifications when TaskFlow is open.
              </p>
            </div>

            <input
              type="checkbox"
              checked={preferences.desktopNotifications}
              disabled={isPending}
              onChange={(event) =>
                updatePreference(
                  "desktopNotifications",
                  event.target.checked
                )
              }
              className="h-5 w-5"
            />
          </label>

          <label className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950 p-4">
            <div className="flex items-start gap-3">
              <Volume2 className="mt-0.5 h-5 w-5 text-violet-400" />

              <div>
                <p className="font-medium text-white">
                  Notification Sound
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Play a sound whenever a new notification arrives.
                </p>
              </div>
            </div>

            <input
              type="checkbox"
              checked={preferences.soundEnabled}
              disabled={isPending}
              onChange={(event) =>
                updatePreference(
                  "soundEnabled",
                  event.target.checked
                )
              }
              className="h-5 w-5"
            />
          </label>
        </div>
      </section>

      {/* Do Not Disturb */}

      <section className="rounded-2xl border border-white/10 bg-slate-900/40">
        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <CalendarClock className="h-5 w-5 text-orange-400" />

            <div>
              <h3 className="font-medium text-white">
                Do Not Disturb
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Pause notification delivery during selected hours.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <label className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950 p-4">
            <div>
              <p className="font-medium text-white">
                Enable Do Not Disturb
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Temporarily silence all notifications.
              </p>
            </div>

            <input
              type="checkbox"
              checked={preferences.doNotDisturb}
              disabled={isPending}
              onChange={(event) =>
                updatePreference(
                  "doNotDisturb",
                  event.target.checked
                )
              }
              className="h-5 w-5"
            />
          </label>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                From
              </label>

              <input
                type="time"
                value={preferences.dndFrom}
                disabled={isPending}
                onChange={(event) =>
                  updatePreference(
                    "dndFrom",
                    event.target.value
                  )
                }
                className="h-11 w-full rounded-xl border border-white/10 bg-slate-950 px-4 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Until
              </label>

              <input
                type="time"
                value={preferences.dndUntil}
                disabled={isPending}
                onChange={(event) =>
                  updatePreference(
                    "dndUntil",
                    event.target.value
                  )
                }
                className="h-11 w-full rounded-xl border border-white/10 bg-slate-950 px-4 text-white outline-none"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}