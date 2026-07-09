"use client";

import { Mail, Calendar, CheckCircle2, ClipboardList } from "lucide-react";

import { SpaceMember } from "../types";
import RoleBadge from "../role-badge";
import MemberAvatar from "../member-avatar";

interface Props {
  member: SpaceMember;
}

export default function GeneralTab({
  member,
}: Props) {
  const completion =
    member.taskCount === 0
      ? 0
      : Math.round(
          (member.completedTasks /
            member.taskCount) *
            100
        );

  return (
    <div className="space-y-6 p-6">

      {/* Member */}

      <div className="rounded-2xl border border-zinc-800 bg-[#141A24] p-6">

        <div className="flex items-center gap-5">

          <MemberAvatar
            name={member.name}
            avatar={member.avatar}
            size="lg"
          />

          <div className="flex-1">

            <h2 className="text-xl font-semibold text-white">
              {member.name}
            </h2>

            <div className="mt-2 flex items-center gap-2 text-sm text-zinc-400">
              <Mail size={15} />
              {member.email}
            </div>

            <div className="mt-4">
              <RoleBadge
                role={member.role}
              />
            </div>

          </div>

        </div>

      </div>

      {/* Information */}

      <div className="rounded-2xl border border-zinc-800 bg-[#141A24]">

        <div className="border-b border-zinc-800 p-5">

          <h3 className="font-semibold text-white">
            Information
          </h3>

        </div>

        <div className="space-y-5 p-5">

          <div className="flex items-center justify-between">

            <span className="text-zinc-500">
              Joined
            </span>

            <div className="flex items-center gap-2">

              <Calendar
                size={15}
                className="text-zinc-500"
              />

              <span className="text-white">
                {member.joinedAt}
              </span>

            </div>

          </div>

          <div className="flex items-center justify-between">

            <span className="text-zinc-500">
              Assigned Tasks
            </span>

            <div className="flex items-center gap-2">

              <ClipboardList
                size={15}
                className="text-blue-400"
              />

              <span className="font-medium text-white">
                {member.taskCount}
              </span>

            </div>

          </div>

          <div className="flex items-center justify-between">

            <span className="text-zinc-500">
              Completed Tasks
            </span>

            <div className="flex items-center gap-2">

              <CheckCircle2
                size={15}
                className="text-emerald-400"
              />

              <span className="font-medium text-white">
                {member.completedTasks}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Progress */}

      <div className="rounded-2xl border border-zinc-800 bg-[#141A24] p-5">

        <div className="flex items-center justify-between">

          <span className="text-sm text-zinc-500">
            Completion Rate
          </span>

          <span className="font-semibold text-white">
            {completion}%
          </span>

        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">

          <div
            className="h-full rounded-full bg-blue-500 transition-all"
            style={{
              width: `${completion}%`,
            }}
          />

        </div>

      </div>

      {/* Danger Zone */}

      <div className="rounded-2xl border border-red-500/20 bg-red-500/5">

        <div className="border-b border-red-500/20 p-5">

          <h3 className="font-semibold text-red-400">
            Danger Zone
          </h3>

        </div>

        <div className="flex items-center justify-between p-5">

          <div>

            <h4 className="font-medium text-white">
              Remove Member
            </h4>

            <p className="mt-1 text-sm text-zinc-500">
              This member will lose access to this space.
            </p>

          </div>

          <button
            className="
              rounded-xl
              bg-red-600
              px-5
              py-2
              text-sm
              font-medium
              transition
              hover:bg-red-500
            "
          >
            Remove
          </button>

        </div>

      </div>

    </div>
  );
}