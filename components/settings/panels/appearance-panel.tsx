"use client";

import {
  Laptop,
  Moon,
  Palette,
  Sun,
} from "lucide-react";

import {
  AccentColor,
  InterfaceDensity,
  ThemeMode,
} from "@prisma/client";

import {
  useTheme,
} from "@/components/providers/theme-provider";

export default function AppearancePanel() {
  const {
  theme,
  accentColor,
  interfaceDensity,
  reducedMotion,

  setTheme,
  setAccentColor,
  setInterfaceDensity,
  setReducedMotion,

  isUpdating,
} = useTheme();

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
            disabled={isUpdating}
            onClick={() =>
              void setTheme(
                ThemeMode.DARK
              )
            }
            className={`rounded-2xl border p-5 text-left transition ${
              theme ===
              ThemeMode.DARK
                ? "border-blue-500/30 bg-blue-500/10"
                : "border-white/10 bg-slate-950 hover:border-white/20"
            }`}
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
            disabled={isUpdating}
            onClick={() =>
              void setTheme(
                ThemeMode.LIGHT
              )
            }
            className={`rounded-2xl border p-5 text-left transition ${
              theme ===
              ThemeMode.LIGHT
                ? "border-blue-500/30 bg-blue-500/10"
                : "border-white/10 bg-slate-950 hover:border-white/20"
            }`}
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
            disabled={isUpdating}
            onClick={() =>
              void setTheme(
                ThemeMode.SYSTEM
              )
            }
            className={`rounded-2xl border p-5 text-left transition ${
              theme ===
              ThemeMode.SYSTEM
                ? "border-blue-500/30 bg-blue-500/10"
                : "border-white/10 bg-slate-950 hover:border-white/20"
            }`}
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
          <label
            className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
              interfaceDensity ===
              InterfaceDensity.COMFORTABLE
                ? "border-blue-500/30 bg-blue-500/10"
                : "border-white/10 bg-slate-950 hover:border-white/20"
            }`}
          >
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
              checked={
                interfaceDensity ===
                InterfaceDensity.COMFORTABLE
              }
              disabled={isUpdating}
              onChange={() =>
                void setInterfaceDensity(
                  InterfaceDensity.COMFORTABLE
                )
              }
            />
          </label>

          <label
            className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
              interfaceDensity ===
              InterfaceDensity.COMPACT
                ? "border-blue-500/30 bg-blue-500/10"
                : "border-white/10 bg-slate-950 hover:border-white/20"
            }`}
          >
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
              checked={
                interfaceDensity ===
                InterfaceDensity.COMPACT
              }
              disabled={isUpdating}
              onChange={() =>
                void setInterfaceDensity(
                  InterfaceDensity.COMPACT
                )
              }
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
            {
              value: AccentColor.BLUE,
              className: "bg-blue-500",
            },
            {
              value: AccentColor.VIOLET,
              className: "bg-violet-500",
            },
            {
              value: AccentColor.EMERALD,
              className: "bg-emerald-500",
            },
            {
              value: AccentColor.ORANGE,
              className: "bg-orange-500",
            },
            {
              value: AccentColor.ROSE,
              className: "bg-rose-500",
            },
            {
              value: AccentColor.CYAN,
              className: "bg-cyan-500",
            },
          ].map((color) => (
            <button
              key={color.value}
              type="button"
              disabled={isUpdating}
              onClick={() =>
                void setAccentColor(
                  color.value
                )
              }
              className={`h-11 w-11 rounded-full transition hover:scale-105 ${
                color.className
              } ${
                accentColor ===
                color.value
                  ? "ring-4 ring-white"
                  : "ring-2 ring-transparent hover:ring-white/20"
              }`}
            />
          ))}
        </div>
      </section>
            {/* Reduced Motion */}

      <section className="rounded-2xl border border-white/10 bg-slate-900/40">
        <div className="border-b border-white/10 px-6 py-5">
          <h3 className="text-base font-semibold text-white">
            Accessibility
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Reduce interface animations and motion effects.
          </p>
        </div>

        <div className="p-6">
          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-slate-950 p-4 transition hover:border-white/20">
            <div>
              <p className="font-medium text-white">
                Reduced Motion
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Minimize animations throughout TaskFlow.
              </p>
            </div>

            <input
              type="checkbox"
              checked={reducedMotion}
              disabled={isUpdating}
              onChange={(e) =>
                void setReducedMotion(
                  e.target.checked
                )
              }
            />
          </label>
        </div>
      </section>

      {/* Preview */}

      <section className="rounded-2xl border border-dashed border-white/10 bg-slate-950/50 p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">
              Current Theme
            </span>

            <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium uppercase text-white">
              {theme}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">
              Accent
            </span>

            <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium uppercase text-white">
              {accentColor}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">
              Density
            </span>

            <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium uppercase text-white">
              {interfaceDensity}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">
              Motion
            </span>

            <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium uppercase text-white">
              {reducedMotion
                ? "Reduced"
                : "Normal"}
            </span>
          </div>

          {isUpdating && (
            <div className="pt-2 text-sm text-blue-400">
              Saving appearance settings...
            </div>
          )}
        </div>
      </section>
    </div>
  );
}