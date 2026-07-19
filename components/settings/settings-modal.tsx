"use client";

import type { ReactNode } from "react";
import clsx from "clsx";

type SettingsModalProps = {
  children: ReactNode;
  className?: string;
};

export default function SettingsModal({
  children,
  className,
}: SettingsModalProps) {
  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
      className={clsx(
        "relative",
        "flex",
        "h-[90vh]",
        "w-full",
        "max-w-[1450px]",
        "overflow-hidden",
        "rounded-[30px]",
        "border",
        "border-white/10",
        "bg-slate-950",
        "shadow-[0_40px_120px_rgba(0,0,0,0.65)]",
        "ring-1",
        "ring-white/5",
        "transition-all",
        "duration-200",
        className
      )}
    >
      {/* Decorative Background */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />

        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

        <div className="absolute inset-y-0 left-0 w-px bg-white/5" />
      </div>

      {/* Content */}

      <div className="relative z-10 flex h-full w-full overflow-hidden">
        {children}
      </div>
    </section>
  );
}