"use client";

import {
  MoreHorizontal,
} from "lucide-react";

export default function MemberActions() {
  return (
    <button
      className="
        rounded-xl
        p-2
        text-slate-400
        transition
        hover:bg-slate-800
        hover:text-white
      "
    >
      <MoreHorizontal size={16} />
    </button>
  );
}