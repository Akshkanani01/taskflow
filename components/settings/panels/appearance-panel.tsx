"use client";

import { Laptop, Moon, Palette, Sun } from "lucide-react";

export default function AppearancePanel() {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Appearance
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Customize how TaskFlow looks and feels.
        </p>
      </div>

      {/* Theme */}

      <section className="rounded-2xl border border-white/10 bg-slate-900/40">
        <div className="border-b border-white/10 px-6 py-5">
          <h3 className="text-base font-semibold text-white">
            Theme
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Select your preferred appearance.
          </p>
        </div>

        <div className="grid gap-4 p-6 md:grid-cols-3">
          <button
            type="button"
            className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5 text-left transition hover:border-blue-400"
          >
            <Moon className="mb-4 h-6 w-6 text-blue-400" />

            <h4 className="font-medium text-white">
              Dark
            </h4>

            <p className="mt-1 text-sm text-slate-400">
              Optimized for low-light environments.
            </p>
          </button>

          <button
            type="button"
            className="rounded-2xl border border-white/10 bg-slate-950 p-5 text-left transition hover:border-white/20"
          >
            <Sun className="mb-4 h-6 w-6 text-amber-400" />

            <h4 className="font-medium text-white">
              Light
            </h4>

            <p className="mt-1 text-sm text-slate-400">
              Bright interface for daytime use.
            </p>
          </button>

          <button
            type="button"
            className="rounded-2xl border border-white/10 bg-slate-950 p-5 text-left transition hover:border-white/20"
          >
            <Laptop className="mb-4 h-6 w-6 text-violet-400" />

            <h4 className="font-medium text-white">
              System
            </h4>

            <p className="mt-1 text-sm text-slate-400">
              Follow your operating system.
            </p>
          </button>
        </div>
      </section>

      {/* Density */}

      <section className="rounded-2xl border border-white/10 bg-slate-900/40">
        <div className="border-b border-white/10 px-6 py-5">
          <h3 className="text-base font-semibold text-white">
            Interface Density
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Adjust spacing across the application.
          </p>
        </div>

        <div className="space-y-5 p-6">
          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-slate-950 p-4 transition hover:border-white/20">
            <div>
              <p className="font-medium text-white">
                Comfortable
              </p>

              <p className="mt-1 text-sm text-slate-400">
                More spacing for easier reading.
              </p>
            </div>

            <input
              type="radio"
              name="density"
              defaultChecked
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-slate-950 p-4 transition hover:border-white/20">
            <div>
              <p className="font-medium text-white">
                Compact
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Fit more information on screen.
              </p>
            </div>

            <input
              type="radio"
              name="density"
            />
          </label>
        </div>
      </section>

      {/* Accent */}

      <section className="rounded-2xl border border-white/10 bg-slate-900/40">
        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-pink-400" />

            <h3 className="text-base font-semibold text-white">
              Accent Color
            </h3>
          </div>

          <p className="mt-1 text-sm text-slate-400">
            Choose the primary accent color.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 p-6">
          {[
            "bg-blue-500",
            "bg-violet-500",
            "bg-emerald-500",
            "bg-orange-500",
            "bg-rose-500",
            "bg-cyan-500",
          ].map((color) => (
            <button
              key={color}
              type="button"
              className={`h-11 w-11 rounded-full ring-2 ring-transparent transition hover:scale-105 hover:ring-white/20 ${color}`}
            />
          ))}
        </div>
      </section>

      {/* Preview */}

      <section className="rounded-2xl border border-dashed border-white/10 bg-slate-950/50 p-6">
        <p className="text-sm text-slate-400">
          Theme changes will preview instantly after appearance settings are connected to persistence.
        </p>
      </section>
    </div>
  );
}