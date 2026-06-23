import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

import {
  Users,
  Shield,
  Clock3,
  UserCheck,
  UserPlus,
} from "lucide-react";

import InviteModal from "@/components/team/invite-modal";
import MembersTable from "@/components/team/members-table";
import PendingInvites from "@/components/team/pending-invites";

export default async function TeamPage() {
  const cookieStore = await cookies();

  const workspaceId =
    cookieStore.get("workspaceId")?.value;

  if (!workspaceId) {
    return (
      <div className="flex h-[500px] items-center justify-center text-slate-400">
        No workspace selected
      </div>
    );
  }

  const workspace =
    await prisma.workspace.findUnique({
      where: {
        id: workspaceId,
      },

      include: {
        members: {
          include: {
            user: true,
          },
        },

        invites: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

  if (!workspace) {
    return (
      <div className="flex h-[500px] items-center justify-center text-slate-400">
        Workspace not found
      </div>
    );
  }

  const admins =
    workspace.members.filter(
      (m) => m.role === "ADMIN"
    ).length;

  const pendingInvites =
    workspace.invites.filter(
      (i) =>
        i.status.toLowerCase() ===
        "pending"
    ).length;

  return (
    <div className="space-y-8">
      {/* Hero */}

      <section
        className="
          relative
          overflow-hidden
          rounded-[32px]
          border
          border-white/10
          bg-slate-900
          p-10
        "
      >
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-indigo-500/10
            via-violet-500/10
            to-fuchsia-500/10
          "
        />

        <div
          className="
            absolute
            -right-24
            -top-24
            h-80
            w-80
            rounded-full
            bg-indigo-500/20
            blur-3xl
          "
        />

        <div className="relative z-10">
          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            <div>
              <div
                className="
                  inline-flex
                  rounded-full
                  border
                  border-indigo-500/20
                  bg-indigo-500/10
                  px-4
                  py-1
                  text-xs
                  font-medium
                  text-indigo-300
                "
              >
                TEAM MANAGEMENT
              </div>

              <h1
                className="
                  mt-5
                  text-5xl
                  font-bold
                  text-white
                "
              >
                Manage Your Team
              </h1>

              <p
                className="
                  mt-3
                  max-w-3xl
                  text-lg
                  text-slate-400
                "
              >
                Invite members, control
                permissions, manage access
                levels and collaborate
                securely across your
                workspace.
              </p>
            </div>

            <div
              className="
                hidden
                lg:flex
                h-24
                w-24
                items-center
                justify-center
                rounded-3xl
                bg-white/5
              "
            >
              <Users
                size={42}
                className="text-indigo-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* KPI Row */}

      <section
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        <StatCard
          title="Total Members"
          value={workspace.members.length}
          icon={<Users size={22} />}
        />

        <StatCard
          title="Administrators"
          value={admins}
          icon={<Shield size={22} />}
        />

        <StatCard
          title="Pending Invites"
          value={pendingInvites}
          icon={<Clock3 size={22} />}
        />

        <StatCard
          title="Active Access"
          value={workspace.members.length}
          icon={<UserCheck size={22} />}
        />
      </section>

      {/* Main Grid */}

      <section
        className="
          grid
          gap-8
          xl:grid-cols-[minmax(0,1fr)_380px]
        "
      >
        {/* Left */}

        <div className="space-y-8">
          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-slate-900
            "
          >
            <div
              className="
                border-b
                border-white/10
                p-6
              "
            >
              <h2
                className="
                  text-xl
                  font-semibold
                  text-white
                "
              >
                Team Members
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Manage workspace members
                and permissions.
              </p>
            </div>

            <MembersTable
              members={workspace.members}
            />
          </div>

          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-slate-900
            "
          >
            <div
              className="
                border-b
                border-white/10
                p-6
              "
            >
              <h2
                className="
                  text-xl
                  font-semibold
                  text-white
                "
              >
                Pending Invitations
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Outstanding invitations
                waiting to be accepted.
              </p>
            </div>

            <PendingInvites
              invites={workspace.invites}
            />
          </div>
        </div>

        {/* Right Sidebar */}

        <div className="sticky top-24 space-y-6">
          <InviteModal
            workspaceId={workspace.id}
          />

          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-slate-900
              p-6
            "
          >
            <div className="flex items-center gap-3">
              <UserPlus
                className="
                  text-indigo-400
                "
                size={20}
              />

              <h3
                className="
                  text-lg
                  font-semibold
                  text-white
                "
              >
                Workspace Overview
              </h3>
            </div>

            <div className="mt-6 space-y-4">
              <OverviewRow
                label="Members"
                value={
                  workspace.members.length
                }
              />

              <OverviewRow
                label="Admins"
                value={admins}
              />

              <OverviewRow
                label="Pending Invites"
                value={pendingInvites}
              />

              <OverviewRow
                label="Workspace"
                value={workspace.name}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-white/10
        bg-slate-900
        p-6
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h3
            className="
              mt-2
              text-3xl
              font-bold
              text-white
            "
          >
            {value}
          </h3>
        </div>

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-indigo-500/10
            text-indigo-400
          "
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function OverviewRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-400">
        {label}
      </span>

      <span className="font-medium text-white">
        {value}
      </span>
    </div>
  );
}