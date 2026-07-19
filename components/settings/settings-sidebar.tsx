"use client";

import {
  AlertTriangle,
  Bell,
  Monitor,
  Settings2,
  Shield,
  User,
} from "lucide-react";

import SettingsNavItem from "./settings-nav-item";
import type { SettingsSection } from "./settings-provider";

type NavigationItem = {
  label: string;
  section: SettingsSection;
  icon: React.ElementType;
  danger?: boolean;
};

const NAV_ITEMS: NavigationItem[] = [
  {
    label: "General",
    section: "general",
    icon: Settings2,
  },
  {
    label: "Profile",
    section: "profile",
    icon: User,
  },
  {
    label: "Appearance",
    section: "appearance",
    icon: Monitor,
  },
  {
    label: "Notifications",
    section: "notifications",
    icon: Bell,
  },
  {
    label: "Security",
    section: "security",
    icon: Shield,
  },
  {
    label: "Danger Zone",
    section: "danger-zone",
    icon: AlertTriangle,
    danger: true,
  },
];

export default function SettingsSidebar() {
  return (
    <>
      {/* Header */}

      <div className="shrink-0 border-b border-white/10 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 ring-1 ring-blue-500/20">
            <Settings2 className="h-5 w-5 text-blue-400" />
          </div>

          <div>
            <h2
              id="settings-title"
              className="text-lg font-semibold tracking-tight text-white"
            >
              Settings
            </h2>

            <p className="mt-0.5 text-xs text-slate-400">
              Manage your preferences
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}

      <nav
        aria-label="Settings navigation"
        className="
          flex-1
          overflow-y-auto
          px-3
          py-4
        "
      >
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <SettingsNavItem
              key={item.section}
              label={item.label}
              section={item.section}
              icon={item.icon}
              danger={item.danger}
            />
          ))}
        </div>
      </nav>
    </>
  );
}