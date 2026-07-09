"use client";

import {
  Mail,
  Shield,
  Calendar,
  CheckCircle2,
  Clock,
  FolderKanban,
  ArrowUpRight,
  AlertTriangle,
} from "lucide-react";

interface Props {
  member: {
    id: string;
    name: string | null;
    email: string;
    role?: string;
    createdAt?: Date;
  };
}

export default function MemberOverview({
  member,
}: Props) {
  return (
    <div className="mx-auto max-w-7xl space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-bold text-white">
          Member Overview
        </h1>

        <p className="mt-2 text-zinc-400">
          View member profile, performance and
          workspace information.
        </p>

      </div>

      {/* Stats */}

      <div className="grid gap-6 lg:grid-cols-4">

        <StatCard
          title="Assigned Tasks"
          value="24"
          icon={<FolderKanban size={22} />}
        />

        <StatCard
          title="Completed"
          value="18"
          icon={<CheckCircle2 size={22} />}
        />

        <StatCard
          title="Pending"
          value="6"
          icon={<Clock size={22} />}
        />

        <StatCard
          title="Completion"
          value="75%"
          icon={<ArrowUpRight size={22} />}
        />

      </div>

      {/* Info + Progress */}

      <div className="grid gap-8 xl:grid-cols-3">

        {/* Information */}

        <section
          className="
            rounded-[28px]
            border
            border-zinc-800
            bg-[#121A26]
            p-8
          "
        >

          <h2 className="text-xl font-semibold text-white">
            Member Information
          </h2>

          <div className="mt-8 space-y-6">

            <InfoRow
              icon={<Mail size={18} />}
              label="Email"
              value={member.email}
            />

            <InfoRow
              icon={<Shield size={18} />}
              label="Role"
              value={
                member.role ??
                "MEMBER"
              }
            />

            <InfoRow
              icon={<Calendar size={18} />}
              label="Joined"
              value={
                member.createdAt
                  ? new Date(
                      member.createdAt
                    ).toLocaleDateString()
                  : "-"
              }
            />

          </div>

        </section>

        {/* Progress */}

        <section
          className="
            xl:col-span-2

            rounded-[28px]
            border
            border-zinc-800

            bg-[#121A26]

            p-8
          "
        >

          <h2 className="text-xl font-semibold text-white">
            Workspace Progress
          </h2>

          <p className="mt-2 text-zinc-500">
            Overall task completion.
          </p>

          <div className="mt-10">

            <div className="mb-3 flex justify-between">

              <span className="text-zinc-400">
                Progress
              </span>

              <span className="font-semibold text-white">
                75%
              </span>

            </div>

            <div className="h-4 rounded-full bg-zinc-800">

              <div
                className="
                  h-4
                  rounded-full

                  bg-gradient-to-r
                  from-blue-500
                  via-indigo-500
                  to-violet-500
                "
                style={{
                  width: "75%",
                }}
              />

            </div>

          </div>

        </section>

      </div>

      {/* Recent Tasks */}

      <section
        className="
          rounded-[28px]

          border
          border-zinc-800

          bg-[#121A26]

          p-8
        "
      >

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-semibold text-white">
              Recent Tasks
            </h2>

            <p className="mt-2 text-zinc-500">
              Latest assigned work.
            </p>

          </div>

        </div>

        <div className="mt-8 space-y-4">

          <TaskItem
            title="Landing Page"
            status="In Progress"
          />

          <TaskItem
            title="Dashboard"
            status="Completed"
          />

          <TaskItem
            title="Authentication"
            status="Todo"
          />

        </div>

      </section>

      {/* Danger */}

      <section
        className="
          rounded-[28px]

          border
          border-red-900

          bg-red-950/10

          p-8
        "
      >

        <div className="flex items-center justify-between">

          <div>

            <h2 className="flex items-center gap-3 text-xl font-semibold text-red-300">

              <AlertTriangle size={22} />

              Danger Zone

            </h2>

            <p className="mt-2 text-zinc-400">
              Remove this member from the
              current Space.
            </p>

          </div>

          <button
            className="
              rounded-2xl

              bg-red-600

              px-6
              py-3

              font-medium

              text-white

              transition

              hover:bg-red-500
            "
          >
            Remove Member
          </button>

        </div>

      </section>

    </div>
  );
}

/* ---------- Components ---------- */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-[24px] border border-zinc-800 bg-[#121A26] p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-zinc-500">
            {title}
          </p>

          <h3 className="mt-3 text-3xl font-bold text-white">
            {value}
          </h3>

        </div>

        <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
          {icon}
        </div>

      </div>

    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4">

      <div className="rounded-xl bg-zinc-800 p-3">
        {icon}
      </div>

      <div>

        <p className="text-sm text-zinc-500">
          {label}
        </p>

        <p className="font-medium text-white">
          {value}
        </p>

      </div>

    </div>
  );
}

function TaskItem({
  title,
  status,
}: {
  title: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-[#171F2B] px-5 py-4">

      <span className="font-medium text-white">
        {title}
      </span>

      <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-300">
        {status}
      </span>

    </div>
  );
}