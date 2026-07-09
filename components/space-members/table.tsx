"use client";

import MemberRow from "./row";
import { SpaceMember } from "./types";

interface Props {
  members: SpaceMember[];
  spaceId: string;
}
export default function MembersTable({
  members,
  spaceId,
}: Props) {
  if (!members.length) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-2xl border border-zinc-800 bg-[#121722]">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white">
            No Members Found
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Invite members to start collaborating.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-[#232B38]
        bg-[#121722]
      "
    >
      {/* Header */}

      <div
        className="
          sticky
          top-0
          z-20
          grid
          grid-cols-[1.8fr_160px_110px_130px_140px_70px]
          items-center
          gap-5
          border-b
          border-[#232B38]
          bg-[#171E29]
          px-6
          py-3
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.14em]
          text-zinc-500
        "
      >
        <div>Member</div>

        <div>Role</div>

        <div className="text-center">
          Tasks
        </div>

        <div className="text-center">
          Completed
        </div>

        

        <div />
      </div>

      {/* Body */}

      <div className="divide-y divide-[#202735]">
        {members.map((member) => (
  <MemberRow
  key={member.id}
  member={member}
  spaceId={spaceId}
/>
        ))}
      </div>

      {/* Footer */}

      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-[#232B38]
          bg-[#171E29]
          px-6
          py-3
        "
      >
        <p className="text-sm text-zinc-500">
          {members.length} member
          {members.length !== 1 ? "s" : ""}
        </p>

        <div className="flex items-center gap-2">
          <button
            className="
              rounded-lg
              border
              border-zinc-700
              px-3
              py-1.5
              text-sm
              text-zinc-300
              transition
              hover:border-zinc-500
              hover:bg-zinc-800
            "
          >
            Previous
          </button>

          <button
            className="
              rounded-lg
              border
              border-zinc-700
              px-3
              py-1.5
              text-sm
              text-zinc-300
              transition
              hover:border-zinc-500
              hover:bg-zinc-800
            "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}