"use client";

import { Users, UserPlus, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  totalMembers: number;
  onlineMembers: number;
  onInvite?: () => void;
}

export default function MembersHeader({
  totalMembers,
  onlineMembers,
  onInvite,
}: Props) {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-[#222B37]
        bg-[#111722]
      "
    >
      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#2563eb22,transparent_45%)]" />

      <div className="relative flex items-center justify-between p-8">
        {/* Left */}

        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/15 text-blue-400">
              <Users size={24} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">
                Space Members
              </h1>

              <p className="mt-1 text-sm text-zinc-400">
                Manage members, roles and permissions for this space.
              </p>
            </div>
          </div>
        </div>

        {/* Right */}

        <Button
          onClick={onInvite}
          className="
            h-11
            rounded-xl
            bg-blue-600
            px-5
            hover:bg-blue-500
          "
        >
          <UserPlus className="mr-2 h-4 w-4" />

          Invite Member
        </Button>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-3 gap-4 border-t border-[#222B37] bg-[#0F141C] p-6">
        <div className="rounded-xl border border-[#222B37] bg-[#151C28] p-5">
          <p className="text-sm text-zinc-500">
            Total Members
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {totalMembers}
          </p>
        </div>

        <div className="rounded-xl border border-[#222B37] bg-[#151C28] p-5">
          <p className="text-sm text-zinc-500">
            Online
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {onlineMembers}
          </p>
        </div>

        <div className="rounded-xl border border-[#222B37] bg-[#151C28] p-5">
          <div className="flex items-center gap-2">
            <ShieldCheck
              size={16}
              className="text-violet-400"
            />

            <p className="text-sm text-zinc-500">
              Permission Model
            </p>
          </div>

          <p className="mt-2 text-lg font-semibold text-white">
            Space Based
          </p>
        </div>
      </div>
    </div>
  );
}