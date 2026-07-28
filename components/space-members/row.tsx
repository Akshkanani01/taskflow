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
      onClick={() => {
        router.push(
          `/dashboard/spaces/${spaceId}/members/${member.id}`
        );
      }}
      className="
        group
        grid
        cursor-pointer
        grid-cols-[1.8fr_160px_110px_130px_140px_70px]
        items-center
        gap-5
        border-b
        border-border
        px-6
        py-4
        transition
        hover:bg-muted/60
      "
    >
      {/* User */}

      <div className="flex min-w-0 items-center gap-4">
        <MemberAvatar
          name={member.name}
          avatar={member.avatar}
        />

        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-foreground">
            {member.name}
          </h3>

          <p className="truncate text-xs text-muted-foreground">
            {member.email}
          </p>
        </div>
      </div>

      {/* Role */}

      <RoleBadge role={member.role} />

      {/* Tasks */}

      <div className="text-center">
        <p className="text-sm font-semibold text-foreground">
          {member.taskCount}
        </p>

        <p className="text-[11px] text-muted-foreground">
          Tasks
        </p>
      </div>

      {/* Completed */}

      <div className="text-center">
        <p className="text-sm font-semibold text-primary">
          {member.completedTasks}
        </p>

        <p className="text-[11px] text-muted-foreground">
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