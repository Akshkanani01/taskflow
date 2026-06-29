import { prisma } from "@/lib/prisma";
import {
  changeMemberRole,
  removeMember,
  transferOwnership,
} from "./actions";
import { WorkspaceRole } from "@prisma/client";

export default async function TeamMembersPage() {
  const workspaceId = "your-workspace-id"; // 🔥 replace with auth

  const members = await prisma.workspaceMember.findMany({
    where: { workspaceId },
    include: {
      user: true,
    },
    orderBy: {
      joinedAt: "asc",
    },
  });

  return (
    <div className="space-y-8 p-6">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          Team Members
        </h1>
        <p className="text-slate-400 mt-2">
          Manage workspace roles and access
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4">
        <Stat label="Total" value={members.length} />
        <Stat
          label="Owners"
          value={members.filter(m => m.role === "OWNER").length}
        />
        <Stat
          label="Admins"
          value={members.filter(m => m.role === "ADMIN").length}
        />
        <Stat
          label="Members"
          value={members.filter(m => m.role === "MEMBER").length}
        />
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 overflow-hidden">

        {/* HEADER */}
        <div className="grid grid-cols-5 gap-4 p-4 text-xs text-slate-400 border-b border-white/10">
          <div>User</div>
          <div>Email</div>
          <div>Role</div>
          <div>Joined</div>
          <div>Actions</div>
        </div>

        {/* ROWS */}
        {members.map((member) => (
          <div
            key={member.id}
            className="grid grid-cols-5 gap-4 p-4 items-center border-b border-white/10 hover:bg-slate-800/30"
          >

            {/* USER */}
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs">
                {member.user.name?.[0] || "U"}
              </div>
              {member.user.name || "Unknown"}
            </div>

            {/* EMAIL */}
            <div className="text-slate-400 text-sm">
              {member.user.email}
            </div>

            {/* ROLE CHANGE (FIXED) */}
            <div>
              <form action={changeMemberRole}>
                <input type="hidden" name="workspaceId" value={workspaceId} />
                <input type="hidden" name="userId" value={member.userId} />

                <select
                  name="role"
                  defaultValue={member.role as WorkspaceRole}
                  onChange={(e) => e.currentTarget.form?.requestSubmit()}
                  className="bg-slate-800 text-white text-sm rounded-lg px-2 py-1 border border-white/10"
                >
                  <option value="OWNER">OWNER</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="MEMBER">MEMBER</option>
                  <option value="VIEWER">VIEWER</option>
                </select>
              </form>
            </div>

            {/* JOINED */}
            <div className="text-slate-500 text-sm">
              {new Date(member.joinedAt).toLocaleDateString()}
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">

              {/* REMOVE */}
              {member.role !== "OWNER" && (
                <form action={removeMember}>
                  <input type="hidden" name="workspaceId" value={workspaceId} />
                  <input type="hidden" name="userId" value={member.userId} />

                  <button className="text-xs px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700">
                    Remove
                  </button>
                </form>
              )}

              {/* TRANSFER OWNERSHIP */}
              {member.role !== "OWNER" && (
                <form action={transferOwnership}>
                  <input type="hidden" name="workspaceId" value={workspaceId} />
                  <input type="hidden" name="newOwnerId" value={member.userId} />

                  <button className="text-xs px-3 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                    Make Owner
                  </button>
                </form>
              )}

              {/* OWNER BADGE */}
              {member.role === "OWNER" && (
                <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                  OWNER
                </span>
              )}

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

/* ---------------- COMPONENT ---------------- */

function Stat({
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