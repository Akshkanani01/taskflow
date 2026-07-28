"use client";

import {
  Crown,
  ShieldCheck,
  User,
  Eye,
} from "lucide-react";

interface Props {
  role: string;
}

const roles = {
  OWNER: {
    icon: Crown,
    className:
      "border-amber-500/20 bg-amber-500/10 text-amber-300",
  },
  MANAGER: {
    icon: ShieldCheck,
    className:
      "border-blue-500/20 bg-blue-500/10 text-blue-300",
  },
  MEMBER: {
    icon: User,
    className:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  },
  VIEWER: {
    icon: Eye,
    className:
      "border-border bg-muted text-muted-foreground",
  },
} as const;

export default function RoleBadge({
  role,
}: Props) {
  const config =
    roles[
      role as keyof typeof roles
    ] ?? roles.MEMBER;

  const Icon = config.icon;

  return (
    <div
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        px-4
        py-2
        text-sm
        font-medium
        ${config.className}
      `}
    >
      <Icon size={16} />
      {role}
    </div>
  );
}