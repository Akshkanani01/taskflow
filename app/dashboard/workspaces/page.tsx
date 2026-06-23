import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function WorkspacesPage() {
const workspaces = await prisma.workspace.findMany({
include: {
spaces: true,
},
orderBy: {
createdAt: "desc",
},
});

return ( <div className="space-y-8">


  <div className="flex items-center justify-between">

    <div>
      <h1 className="text-4xl font-bold text-white">
        Workspaces
      </h1>

      <p className="mt-2 text-slate-400">
        Manage all company workspaces.
      </p>
      <p className="text-red-500">
        Total Workspaces: {workspaces.length}
      </p>
    </div>

    <Link
      href="/dashboard/workspaces/create"
      className="
        rounded-xl
        bg-indigo-600
        px-5 py-3
        text-white
      "
    >
      New Workspace
    </Link>

  </div>

  <div className="grid gap-6 lg:grid-cols-3">

    {workspaces.map((workspace) => (
      <div
        key={workspace.id}
        className="
          rounded-3xl
          border border-white/10
          bg-slate-900
          p-6
        "
      >
        <h2 className="text-xl font-semibold text-white">
          {workspace.name}
        </h2>

        <p className="mt-4 text-slate-400">
          {workspace.spaces.length} Spaces
        </p>

        <p className="mt-2 text-xs text-slate-500">
          {workspace.slug}
        </p>
      </div>
    ))}

  </div>

</div>

);
}
