"use client";

import {
  AlertTriangle,
  Download,
  Eraser,
  Trash2,
} from "lucide-react";

export default function DangerZonePanel() {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Danger Zone
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          These actions may permanently affect your account and data. Please
          proceed carefully.
        </p>
      </div>

      {/* Export Data */}

      <section className="rounded-2xl border border-white/10 bg-slate-900/40">
        <div className="flex items-start justify-between gap-6 p-6">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
              <Download className="h-5 w-5 text-blue-400" />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Export Personal Data
              </h3>

              <p className="mt-1 max-w-2xl text-sm text-slate-400">
                Download a copy of your profile information and personal
                preferences.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Export
          </button>
        </div>
      </section>

      {/* Reset Preferences */}

      <section className="rounded-2xl border border-amber-500/20 bg-amber-500/5">
        <div className="flex items-start justify-between gap-6 p-6">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
              <Eraser className="h-5 w-5 text-amber-400" />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Reset Preferences
              </h3>

              <p className="mt-1 max-w-2xl text-sm text-slate-400">
                Restore your appearance, notification and personal settings to
                their default values.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-300 transition hover:bg-amber-500/20"
          >
            Reset
          </button>
        </div>
      </section>

      {/* Delete Account */}

      <section className="rounded-2xl border border-red-500/20 bg-red-500/5">
        <div className="flex items-start justify-between gap-6 p-6">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Delete Account
              </h3>

              <p className="mt-1 max-w-2xl text-sm text-slate-400">
                Permanently delete your account and remove all personal data.
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500"
          >
            <Trash2 className="h-4 w-4" />
            Delete Account
          </button>
        </div>
      </section>
    </div>
  );
}