"use client";

import { useSettings } from "./settings-provider";

import ProfilePanel from "./panels/profile-panel";
import AppearancePanel from "./panels/appearance-panel";
import NotificationsPanel from "./panels/notifications-panel";
import DangerZonePanel from "./panels/danger-zone-panel";

const PANELS = {
  profile: ProfilePanel,
  appearance: AppearancePanel,
  notifications: NotificationsPanel,
  "danger-zone": DangerZonePanel,
} as const;

export default function SettingsPanelRenderer() {
  const { section } = useSettings();

  const ActivePanel =
    PANELS[section as keyof typeof PANELS] ??
    ProfilePanel;

  return <ActivePanel />;
}