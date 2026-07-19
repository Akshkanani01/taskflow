"use client";

import { X } from "lucide-react";

import SettingsSearch from "./settings-search";
import { useSettings } from "./settings-provider";

export default function SettingsHeader() {
  const { closeSettings } = useSettings();

  return (
    <header
      className="
        sticky
        top-0
        z-20
        flex
        h-[68px]
        shrink-0
        items-center
        justify-between
        border-b
        border-white/10
        bg-slate-950/90
        px-8
        backdrop-blur-2xl
      "
    >
      <div className="min-w-0">
        <h1
          id="settings-title"
          className="text-xl font-semibold tracking-tight text-white"
        >
          Settings
        </h1>

        <p className="mt-0.5 text-sm text-slate-400">
          Manage your TaskFlow preferences.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <SettingsSearch />

        <button
          type="button"
          onClick={closeSettings}
          aria-label="Close settings"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            bg-white/5
            text-slate-400
            transition-all
            duration-200
            hover:border-white/20
            hover:bg-white/10
            hover:text-white
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500/20
          "
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}