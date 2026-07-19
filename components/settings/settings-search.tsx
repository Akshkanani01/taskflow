"use client";

import { Search } from "lucide-react";

type SettingsSearchProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export default function SettingsSearch({
  value = "",
  onChange,
  placeholder = "Search settings...",
}: SettingsSearchProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search
        className="
          pointer-events-none
          absolute
          left-4
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          text-slate-500
        "
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="
          h-11
          w-full
          rounded-xl
          border
          border-white/10
          bg-slate-900
          pl-11
          pr-4
          text-sm
          text-white
          placeholder:text-slate-500
          outline-none
          transition-all
          duration-200
          focus:border-blue-500/40
          focus:ring-2
          focus:ring-blue-500/20
        "
      />
    </div>
  );
}