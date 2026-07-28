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
        border-border
        bg-background/90
        px-8
        backdrop-blur-2xl
      "
    >
      <div className="min-w-0">

        <h1
          id="settings-title"
          className="
            text-xl
            font-semibold
            tracking-tight
            text-foreground
          "
        >
          Settings
        </h1>


        <p className="mt-0.5 text-sm text-muted-foreground">
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
            border-border
            bg-muted
            text-muted-foreground
            transition-all
            duration-200
            hover:border-border
            hover:bg-accent
            hover:text-foreground
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