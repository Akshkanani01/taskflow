"use client";

import { Mail, X } from "lucide-react";

import MemberAvatar from "./member-avatar";
import RoleBadge from "./role-badge";
import { SpaceMember } from "./types";

interface Props {
  member: SpaceMember;
  onClose: () => void;
}

export default function DrawerHeader({
  member,
  onClose,
}: Props) {
  return (
    <div className="relative border-b border-zinc-800 bg-gradient-to-b from-[#101826] to-[#0B1017]">

      <button
        onClick={onClose}
        className="
          absolute
          right-6
          top-6

          flex
          h-10
          w-10
          items-center
          justify-center

          rounded-xl

          border
          border-zinc-800

          bg-[#171F2B]

          transition

          hover:bg-[#232E3F]
        "
      >
        <X size={18} />
      </button>

      <div className="flex items-center gap-6 px-8 py-8">

        <MemberAvatar
          name={member.name}
          avatar={member.avatar}
          size="xl"
        />

        <div className="min-w-0 flex-1">

          <h1 className="truncate text-3xl font-bold text-white">
            {member.name}
          </h1>

          <div className="mt-3 flex items-center gap-2 text-zinc-400">

            <Mail size={16} />

            <span className="truncate">
              {member.email}
            </span>

          </div>

          <div className="mt-5">

            <RoleBadge
              role={member.role}
            />

          </div>

        </div>

      </div>

    </div>
  );
}