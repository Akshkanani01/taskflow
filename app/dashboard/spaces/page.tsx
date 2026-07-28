import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FolderKanban, Plus } from "lucide-react";

export default async function SpacesPage() {
  const spaces = await prisma.space.findMany({
    include: {
      workspace: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold text-foreground">
            Spaces
          </h1>

          <p className="mt-2 text-muted-foreground">
            Organize workspaces into spaces.
          </p>
        </div>

        <Link
          href="/dashboard/spaces/create"
          className="
            flex items-center gap-2
            rounded-2xl
            bg-primary
            px-5 py-3
            text-primary-foreground
          "
        >
          <Plus size={18} />
          New Space
        </Link>
      </div>

      {spaces.length === 0 ? (
        <div
          className="
            flex h-96 flex-col items-center
            justify-center rounded-3xl
            border border-dashed border-border
            bg-card
          "
        >
          <FolderKanban
            size={60}
            className="mb-4 text-muted-foreground"
          />

          <h2 className="text-2xl font-semibold text-foreground">
            No Spaces Found
          </h2>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {spaces.map((space) => (
            <Link
              key={space.id}
              href={`/dashboard/spaces/${space.id}`}
              className="
                rounded-3xl
                border border-border
                bg-card
                p-6
                transition
                hover:border-primary/50
              "
            >
              <div
                className="mb-4 h-3 w-3 rounded-full"
                style={{
                  backgroundColor: space.color,
                }}
              />

              <h2 className="text-xl font-semibold text-foreground">
                {space.name}
              </h2>

              <p className="mt-2 text-muted-foreground">
                Workspace: {space.workspace.name}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}