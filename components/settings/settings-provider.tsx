"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type SettingsSection =
  | "general"
  | "profile"
  | "appearance"
  | "notifications"
  | "security"
  | "danger-zone";

type SettingsContextType = {
  open: boolean;
  section: SettingsSection;
  openSettings: (section?: SettingsSection) => void;
  closeSettings: () => void;
  setSection: (section: SettingsSection) => void;
};

const SettingsContext =
  createContext<SettingsContextType | null>(null);

type Props = {
  children: ReactNode;
};

export function SettingsProvider({
  children,
}: Props) {
  const [open, setOpen] = useState(false);

  const [section, setSection] =
    useState<SettingsSection>("general");

  const openSettings = useCallback(
    (
      nextSection: SettingsSection = "general"
    ) => {
      setSection(nextSection);
      setOpen(true);
    },
    []
  );

  const closeSettings = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      open,
      section,
      openSettings,
      closeSettings,
      setSection,
    }),
    [open, section, openSettings, closeSettings]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettings must be used inside SettingsProvider."
    );
  }

  return context;
}