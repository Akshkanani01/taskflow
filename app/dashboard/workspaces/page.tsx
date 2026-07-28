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
      <h1 className="text-4xl font-bold text-foreground">
        Workspaces
      </h1>

      <p className="mt-2 text-muted-foreground">
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
        text-foreground
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
          border border-border
          bg-card
          p-6
        "
      >
        <h2 className="text-xl font-semibold text-foreground">
          {workspace.name}
        </h2>

        <p className="mt-4 text-muted-foreground">
          {workspace.spaces.length} Spaces
        </p>

        <p className="mt-2 text-xs text-muted-foreground">
          {workspace.slug}
        </p>
      </div>
    ))}

  </div>

</div>

);
}
