"use client";

import { useSettings } from "./settings-provider";

import GeneralPanel from "./panels/general-panel";
import ProfilePanel from "./panels/profile-panel";
import AppearancePanel from "./panels/appearance-panel";
import NotificationsPanel from "./panels/notifications-panel";
import SecurityPanel from "./panels/security-panel";
import DangerZonePanel from "./panels/danger-zone-panel";

const PANELS = {
  general: GeneralPanel,
  profile: ProfilePanel,
  appearance: AppearancePanel,
  notifications: NotificationsPanel,
  security: SecurityPanel,
  "danger-zone": DangerZonePanel,
} as const;

export default function SettingsPanelRenderer() {
  const { section } = useSettings();

  const ActivePanel =
    PANELS[section] ?? GeneralPanel;

  return <ActivePanel />;
}