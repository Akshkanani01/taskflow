"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import SettingsModal from "./settings-modal";
import SettingsShell from "./settings-shell";
import { useSettings } from "./settings-provider";

export default function SettingsOverlay() {
  const { open, closeSettings } = useSettings();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSettings();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, closeSettings]);

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        p-6
      "
    >
      {/* Overlay */}

      <button
        type="button"
        aria-label="Close settings"
        onClick={closeSettings}
        className="
          absolute
          inset-0
          cursor-default
          bg-black/55
          backdrop-blur-md
        "
      />

      {/* Modal */}

      <div
        className="
          relative
          animate-in
          fade-in
          zoom-in-95
          duration-200
        "
      >
        <SettingsModal>
          <SettingsShell />
        </SettingsModal>
      </div>
    </div>,
    document.body
  );
}