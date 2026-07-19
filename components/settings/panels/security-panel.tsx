"use client";

import {
  KeyRound,
  Laptop,
  Link2,
  ShieldCheck,
} from "lucide-react";

export default function SecurityPanel() {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Security
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Manage your account security and active sessions.
        </p>
      </div>

      {/* Authentication */}

      <section className="rounded-2xl border border-white/10 bg-slate-900/40">
        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <KeyRound className="h-5 w-5 text-blue-400" />

            <div>
              <h3 className="font-medium text-white">
                Authentication
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Your account uses passwordless Magic Link authentication.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <div className="rounded-xl border border-white/10 bg-slate-950 p-4">
            <p className="font-medium text-white">
              Sign in Method
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Magic Link via email
            </p>
          </div>

          <button
            type="button"
            className="
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-white/10
            "
          >
            Send New Magic Link
          </button>
        </div>
      </section>

      {/* Sessions */}

      <section className="rounded-2xl border border-white/10 bg-slate-900/40">
        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <Laptop className="h-5 w-5 text-emerald-400" />

            <div>
              <h3 className="font-medium text-white">
                Active Sessions
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Devices currently signed into your account.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <div className="rounded-xl border border-white/10 bg-slate-950 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">
                  Current Device
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Windows • Chrome
                </p>
              </div>

              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                Active
              </span>
            </div>
          </div>

          <button
            type="button"
            className="
              rounded-xl
              border
              border-red-500/20
              bg-red-500/10
              px-5
              py-2.5
              text-sm
              font-medium
              text-red-300
              transition
              hover:bg-red-500/20
            "
          >
            Sign Out Other Sessions
          </button>
        </div>
      </section>

      {/* Connected Providers */}

      <section className="rounded-2xl border border-white/10 bg-slate-900/40">
        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <Link2 className="h-5 w-5 text-violet-400" />

            <div>
              <h3 className="font-medium text-white">
                Connected Providers
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Authentication providers linked to your account.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <div className="rounded-xl border border-white/10 bg-slate-950 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">
                  Email Magic Link
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Connected
                </p>
              </div>

              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}