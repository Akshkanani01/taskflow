import { prisma } from "@/lib/prisma";
import MembersTable from "@/components/team/members-table";

export default async function TeamMembersPage() {
  const workspace =
    await prisma.workspace.findFirst({
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    });

  if (!workspace) {
    return (
      <div className="text-slate-400">
        Workspace not found
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Members
        </h1>

        <p className="mt-2 text-slate-400">
          Manage workspace members
        </p>
      </div>

      <MembersTable
        members={workspace.members}
      />

    </div>
  );
}