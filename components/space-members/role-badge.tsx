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
      "bg-amber-500/10 text-amber-300 border-amber-500/20",
  },
  MANAGER: {
    icon: ShieldCheck,
    className:
      "bg-blue-500/10 text-blue-300 border-blue-500/20",
  },
  MEMBER: {
    icon: User,
    className:
      "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  },
  VIEWER: {
    icon: Eye,
    className:
      "bg-zinc-500/10 text-zinc-300 border-zinc-500/20",
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