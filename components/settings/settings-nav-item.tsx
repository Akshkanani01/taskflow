"use client";

import clsx from "clsx";
import type { ElementType } from "react";

import {
  useSettings,
  type SettingsSection,
} from "./settings-provider";

type SettingsNavItemProps = {
  label: string;
  section: SettingsSection;
  icon: ElementType;
  danger?: boolean;
};

export default function SettingsNavItem({
  label,
  section,
  icon: Icon,
  danger = false,
}: SettingsNavItemProps) {
  const {
    section: activeSection,
    setSection,
  } = useSettings();

  const active = activeSection === section;

  return (
    <button
      type="button"
      onClick={() => setSection(section)}
      aria-current={active ? "page" : undefined}
      className={clsx(
        "group relative flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-200",
        "outline-none",
        "focus-visible:ring-2 focus-visible:ring-blue-500/30",

        active
          ? "bg-blue-500/10 text-white ring-1 ring-blue-500/20"
          : danger
          ? "text-red-300 hover:bg-red-500/10 hover:text-red-200"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      )}
    >
      {/* Active Indicator */}

      <span
        className={clsx(
          "absolute left-0 top-2 bottom-2 w-1 rounded-r-full transition-all duration-200",
          active ? "bg-blue-500" : "bg-transparent"
        )}
      />

      {/* Icon */}

      <Icon
        className={clsx(
          "h-5 w-5 shrink-0 transition-colors duration-200",
          active
            ? "text-blue-400"
            : danger
            ? "text-red-400"
            : "text-slate-500 group-hover:text-white"
        )}
      />

      {/* Label */}

      <span className="truncate text-sm font-medium">
        {label}
      </span>
    </button>
  );
}