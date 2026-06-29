import { prisma } from "@/lib/prisma";

export default async function TeamInvitesPage() {
  // ⚠️ replace with auth workspaceId
  const workspaceId = "your-workspace-id";

  const invites = await prisma.workspaceInvite.findMany({
    where: {
      workspaceId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8 p-6">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          Team Invites
        </h1>
        <p className="text-slate-400 mt-2">
          Manage pending and accepted invitations
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">
        <StatBox
          label="Total Invites"
          value={invites.length}
        />
        <StatBox
          label="Pending"
          value={
            invites.filter(i => i.status === "pending").length
          }
        />
        <StatBox
          label="Accepted"
          value={
            invites.filter(i => i.status === "accepted").length
          }
        />
      </div>

      {/* INVITES LIST */}
      <div className="space-y-3">

        {invites.length === 0 && (
          <div className="text-center text-slate-500 py-10">
            No invites found
          </div>
        )}

        {invites.map((invite) => (
          <div
            key={invite.id}
            className="
              flex items-center justify-between
              rounded-2xl
              border border-white/10
              bg-slate-900/60
              p-5
              hover:border-white/20
              transition
            "
          >

            {/* LEFT */}
            <div>
              <p className="text-white font-medium">
                {invite.email}
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Role: {invite.role}
              </p>

              <p className="text-xs text-slate-500">
                Created:{" "}
                {new Date(invite.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* STATUS BADGE */}
            <StatusBadge status={invite.status} />

          </div>
        ))}

      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatBox({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
      <p className="text-slate-400 text-xs">{label}</p>
      <p className="text-2xl font-bold text-white mt-1">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    accepted: "bg-green-500/10 text-green-400 border-green-500/20",
    revoked: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs border ${map[status]}`}
    >
      {status.toUpperCase()}
    </span>
  );
}