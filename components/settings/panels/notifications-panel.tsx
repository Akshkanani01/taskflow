"use client";

import { Bell, Mail, MessageSquare, CalendarClock } from "lucide-react";

export default function NotificationsPanel() {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Notifications
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Choose when and how you want to receive notifications.
        </p>
      </div>

      {/* In-App */}

      <section className="rounded-2xl border border-white/10 bg-slate-900/40">
        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-blue-400" />

            <div>
              <h3 className="font-medium text-white">
                In-App Notifications
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Notifications shown inside TaskFlow.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5 p-6">
          {[
            {
              title: "Task Assignments",
              description: "Notify me when I'm assigned to a task.",
            },
            {
              title: "Task Status Changes",
              description: "Notify me when assigned task status changes.",
            },
            {
              title: "Comments & Mentions",
              description: "Notify me when someone comments or mentions me.",
            },
            {
              title: "Due Date Reminders",
              description: "Notify me before tasks become due.",
            },
          ].map((item) => (
            <label
              key={item.title}
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
                defaultChecked
                className="h-5 w-5"
              />
            </label>
          ))}
        </div>
      </section>

      {/* Email */}

      <section className="rounded-2xl border border-white/10 bg-slate-900/40">
        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-emerald-400" />

            <div>
              <h3 className="font-medium text-white">
                Email Notifications
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Receive important updates by email.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5 p-6">
          {[
            "Daily Summary",
            "Weekly Summary",
            "Workspace Invitations",
            "Security Alerts",
          ].map((label) => (
            <label
              key={label}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950 p-4"
            >
              <span className="font-medium text-white">
                {label}
              </span>

              <input
                type="checkbox"
                className="h-5 w-5"
                defaultChecked={label !== "Weekly Summary"}
              />
            </label>
          ))}
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
                Pause notifications during selected hours.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              From
            </label>

            <input
              type="time"
              defaultValue="22:00"
              className="h-11 w-full rounded-xl border border-white/10 bg-slate-950 px-4 text-white outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Until
            </label>

            <input
              type="time"
              defaultValue="08:00"
              className="h-11 w-full rounded-xl border border-white/10 bg-slate-950 px-4 text-white outline-none"
            />
          </div>
        </div>
      </section>

      {/* Chat */}

      <section className="rounded-2xl border border-dashed border-white/10 bg-slate-950/50 p-6">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-5 w-5 text-violet-400" />

          <div>
            <h3 className="font-medium text-white">
              Future Integrations
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Slack, Microsoft Teams and Discord notification channels will be available in a future release.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}