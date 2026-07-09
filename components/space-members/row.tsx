"use client";

import { useRouter } from "next/navigation";

import MemberAvatar from "./member-avatar";
import RoleBadge from "./role-badge";
import MemberActions from "./member-actions";
import { SpaceMember } from "./types";

interface Props {
  member: SpaceMember;
  spaceId: string;
}

export default function MemberRow({
  member,
  spaceId,
}: Props) {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(
          `/dashboard/spaces/${spaceId}/members/${member.id}`
        )
      }
      className="
        cursor-pointer
        group
        grid
        grid-cols-[1.8fr_160px_110px_130px_140px_70px]
        items-center
        gap-5
        border-b
        border-[#202735]
        px-6
        py-4
        transition-all
        duration-200
        hover:bg-[#171D27]
      "
    >
      {/* User */}

      <div className="flex min-w-0 items-center gap-4">
        <MemberAvatar
          name={member.name}
          avatar={member.avatar}
        />

        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-white">
            {member.name}
          </h3>

          <p className="truncate text-xs text-zinc-500">
            {member.email}
          </p>
        </div>
      </div>

      {/* Role */}

      <RoleBadge role={member.role} />

      {/* Tasks */}

      <div className="text-center">
        <p className="text-sm font-semibold text-white">
          {member.taskCount}
        </p>

        <p className="text-[11px] text-zinc-500">
          Tasks
        </p>
      </div>

      {/* Completed */}

      <div className="text-center">
        <p className="text-sm font-semibold text-emerald-400">
          {member.completedTasks}
        </p>

        <p className="text-[11px] text-zinc-500">
          Completed
        </p>
      </div>

      {/* Actions */}

      <div
        className="flex justify-end"
        onClick={(e) => e.stopPropagation()}
      >
        <MemberActions />
      </div>
    </div>
  );
}