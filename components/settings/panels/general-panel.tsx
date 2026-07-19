"use client";

import { Globe, CalendarDays, Clock3, TimerReset } from "lucide-react";

export default function GeneralPanel() {
  return (
    <div className="space-y-8">
      {/* Page Header */}

      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          General
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Manage your personal preferences across TaskFlow.
        </p>
      </div>

      {/* Language */}

      <section className="rounded-2xl border border-white/10 bg-slate-900/40">
        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-blue-400" />

            <div>
              <h3 className="font-medium text-white">
                Language
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Select your preferred language.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <select
            className="
              h-11
              w-full
              rounded-xl
              border
              border-white/10
              bg-slate-950
              px-4
              text-sm
              text-white
              outline-none
              transition
              focus:border-blue-500/40
              focus:ring-2
              focus:ring-blue-500/20
            "
            defaultValue="en"
          >
            <option value="en">English</option>
            <option value="gu">Gujarati</option>
          </select>
        </div>
      </section>

      {/* Date & Time */}

      <section className="rounded-2xl border border-white/10 bg-slate-900/40">
        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-violet-400" />

            <div>
              <h3 className="font-medium text-white">
                Date & Time
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Configure how dates and times appear.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm text-slate-300">
              Time Zone
            </label>

            <select className="h-11 w-full rounded-xl border border-white/10 bg-slate-950 px-4 text-sm text-white outline-none focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/20">
              <option>Asia/Kolkata</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-300">
              Date Format
            </label>

            <select className="h-11 w-full rounded-xl border border-white/10 bg-slate-950 px-4 text-sm text-white outline-none focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/20">
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-300">
              Time Format
            </label>

            <select className="h-11 w-full rounded-xl border border-white/10 bg-slate-950 px-4 text-sm text-white outline-none focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/20">
              <option>24 Hour</option>
              <option>12 Hour</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-300">
              Week Starts On
            </label>

            <select className="h-11 w-full rounded-xl border border-white/10 bg-slate-950 px-4 text-sm text-white outline-none focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/20">
              <option>Monday</option>
              <option>Sunday</option>
            </select>
          </div>
        </div>
      </section>

      {/* Productivity */}

      <section className="rounded-2xl border border-white/10 bg-slate-900/40">
        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <Clock3 className="h-5 w-5 text-emerald-400" />

            <div>
              <h3 className="font-medium text-white">
                Productivity
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Personal productivity preferences.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5 p-6">
          <label className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white">
                Compact Mode
              </p>

              <p className="text-sm text-slate-400">
                Reduce spacing across the interface.
              </p>
            </div>

            <input type="checkbox" className="h-5 w-5" />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white">
                Auto Save
              </p>

              <p className="text-sm text-slate-400">
                Save supported changes automatically.
              </p>
            </div>

            <input type="checkbox" className="h-5 w-5" defaultChecked />
          </label>
        </div>
      </section>

      {/* Reset */}

      <section className="rounded-2xl border border-amber-500/20 bg-amber-500/5">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <TimerReset className="h-5 w-5 text-amber-400" />

            <div>
              <h3 className="font-medium text-white">
                Reset Preferences
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Restore all personal settings to their defaults.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-4
              py-2
              text-sm
              font-medium
              text-white
              transition
              hover:bg-white/10
            "
          >
            Reset
          </button>
        </div>
      </section>
    </div>
  );
}