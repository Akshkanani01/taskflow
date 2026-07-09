"use client";

import {
  Mail,
  Shield,
  Calendar,
  CheckCircle2,
  Trash2,
  ArrowUpRight,
} from "lucide-react";

import { SpaceMember } from "../types";

interface Props {
  member: SpaceMember;
}

export default function OverviewTab({
  member,
}: Props) {
  const progress =
    member.taskCount === 0
      ? 0
      : Math.round(
          (member.completedTasks /
            member.taskCount) *
            100
        );

  return (
    <div className="space-y-6">

      {/* Member Information */}

      <section className="rounded-[28px] border border-zinc-800 bg-[#141A24] p-7">

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-xl font-semibold text-white">
              Member Information
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Basic information about this member.
            </p>

          </div>

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <InfoCard
            icon={<Mail size={18} />}
            label="Email"
            value={member.email}
          />

          <InfoCard
            icon={<Shield size={18} />}
            label="Role"
            value={member.role}
          />

          <InfoCard
            icon={<Calendar size={18} />}
            label="Joined"
            value={member.joinedAt}
          />

        </div>

      </section>

      {/* Statistics */}

      <section className="rounded-3xl border border-zinc-800 bg-[#141A24] p-7">

        <div className="mb-6">

          <h2 className="text-xl font-semibold text-white">
            Workspace Statistics
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Task performance inside this Space.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-5">

          <StatCard
            title="Assigned"
            value={member.taskCount}
          />

          <StatCard
            title="Completed"
            value={member.completedTasks}
          />

        </div>

        <div className="mt-8">

          <div className="mb-3 flex items-center justify-between">

            <span className="text-sm text-zinc-400">
              Completion Rate
            </span>

            <span className="font-semibold text-white">
              {progress}%
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      </section>

      {/* Danger */}

      <section className="rounded-3xl border border-red-900 bg-red-950/20 p-7">

        <div className="flex items-start justify-between">

          <div>

            <h2 className="text-xl font-semibold text-red-300">
              Danger Zone
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Remove this member from the current Space.
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
              text-sm
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

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#1A2230] p-5">

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
          {icon}
        </div>

        <div>

          <p className="text-xs uppercase tracking-wider text-zinc-500">
            {label}
          </p>

          <p className="mt-1 font-medium text-white">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#1A2230] p-6">

      <p className="text-sm text-zinc-500">
        {title}
      </p>

      <div className="mt-4 flex items-center gap-3">

        <CheckCircle2
          size={20}
          className="text-emerald-400"
        />

        <span className="text-3xl font-bold text-white">
          {value}
        </span>

      </div>

    </div>
  );
}