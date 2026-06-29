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
  const workspaceId = (await cookies()).get("workspaceId")?.value;

  if (!workspaceId) {
    return (
      <div className="flex h-[500px] items-center justify-center text-slate-400">
        No workspace selected
      </div>
    );
  }

  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    include: {
      members: { include: { user: true } },
      invites: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!workspace) {
    return (
      <div className="flex h-[500px] items-center justify-center text-slate-400">
        Workspace not found
      </div>
    );
  }

  const admins = workspace.members.filter(
    (m) => m.role === "ADMIN"
  ).length;

  const pendingInvites = workspace.invites.filter(
    (i) => i.status === "pending"
  ).length;

  return (
    <div className="space-y-8">

      {/* HERO */}
      <section className="rounded-[32px] border border-white/10 bg-slate-900 p-10">
        <h1 className="text-5xl font-bold text-white">
          Manage Your Team
        </h1>
        <p className="mt-3 text-slate-400">
          Invite members and manage roles securely.
        </p>
      </section>

      {/* STATS */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Stat title="Members" value={workspace.members.length} icon={<Users />} />
        <Stat title="Admins" value={admins} icon={<Shield />} />
        <Stat title="Invites" value={pendingInvites} icon={<Clock3 />} />
        <Stat title="Active" value={workspace.members.length} icon={<UserCheck />} />
      </section>

      {/* CONTENT */}
      <div className="grid gap-8 xl:grid-cols-[1fr_380px]">

        <div className="space-y-6">

          <div className="rounded-3xl border border-white/10 bg-slate-900">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-white font-semibold">Members</h2>
            </div>

            <MembersTable members={workspace.members} />
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-white font-semibold">Invites</h2>
            </div>

            <PendingInvites invites={workspace.invites} />
          </div>

        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          <InviteModal workspaceId={workspace.id} />
        </div>

      </div>
    </div>
  );
}

function Stat({ title, value, icon }: any) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <p className="text-slate-400">{title}</p>
      <div className="mt-2 flex items-center justify-between">
        <h3 className="text-3xl font-bold text-white">{value}</h3>
        <div className="text-indigo-400">{icon}</div>
      </div>
    </div>
  );
}