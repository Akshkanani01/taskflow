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
        text-muted-foreground
        transition
        hover:bg-background
        hover:text-foreground
      "
    >
      <MoreHorizontal size={16} />
    </button>
  );
}