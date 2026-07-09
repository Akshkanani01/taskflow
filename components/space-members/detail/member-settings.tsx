"use client";

import {
  Shield,
  Trash2,
  Crown,
  AlertTriangle,
} from "lucide-react";

interface Props {
  member: {
    id: string;
    name: string | null;
    role?: string | null;
  };
}

export default function MemberSettings({
  member,
}: Props) {
  return (
    <div className="mx-auto max-w-5xl space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-white">
          Member Settings
        </h1>

        <p className="mt-2 text-zinc-500">
          Manage permissions and membership for{" "}
          {member.name}.
        </p>
      </div>

      {/* Role */}

      <section className="rounded-[28px] border border-zinc-800 bg-[#121A26] p-8">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-blue-500/10 p-4 text-blue-400">
            <Shield size={22} />
          </div>

          <div className="flex-1">

            <h2 className="text-xl font-semibold text-white">
              Change Role
            </h2>

            <p className="mt-1 text-zinc-500">
              Current Role:{" "}
              <span className="font-medium text-white">
                {member.role ?? "MEMBER"}
              </span>
            </p>

          </div>

          <button
            className="
              rounded-2xl
              bg-blue-600
              px-5
              py-3
              font-medium
              text-white
              transition
              hover:bg-blue-500
            "
          >
            Change Role
          </button>

        </div>

      </section>

      {/* Transfer Ownership */}

      <section className="rounded-[28px] border border-amber-700 bg-amber-950/10 p-8">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-amber-500/10 p-4 text-amber-400">
            <Crown size={22} />
          </div>

          <div className="flex-1">

            <h2 className="text-xl font-semibold text-white">
              Transfer Ownership
            </h2>

            <p className="mt-1 text-zinc-500">
              Available only if this member becomes the new Space Owner.
            </p>

          </div>

          <button
            className="
              rounded-2xl
              border
              border-amber-500/40
              bg-amber-500/10
              px-5
              py-3
              font-medium
              text-amber-300
              transition
              hover:bg-amber-500/20
            "
          >
            Transfer
          </button>

        </div>

      </section>

      {/* Danger Zone */}

      <section className="rounded-[28px] border border-red-900 bg-red-950/10 p-8">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-red-500/10 p-4 text-red-400">
            <AlertTriangle size={22} />
          </div>

          <div className="flex-1">

            <h2 className="text-xl font-semibold text-red-300">
              Remove Member
            </h2>

            <p className="mt-1 text-zinc-400">
              This action removes the member from the current Space.
            </p>

          </div>

          <button
            className="
              flex
              items-center
              gap-2

              rounded-2xl

              bg-red-600

              px-5
              py-3

              font-medium
              text-white

              transition

              hover:bg-red-500
            "
          >
            <Trash2 size={18} />

            Remove
          </button>

        </div>

      </section>

    </div>
  );
}