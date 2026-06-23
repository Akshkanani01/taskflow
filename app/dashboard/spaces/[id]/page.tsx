import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function SpacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const space = await prisma.space.findUnique({
    where: {
      id,
    },
    include: {
      projects: {
        include: {
          tasks: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!space) {
    return (
      <div className="text-white">
        Space not found
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-white">
            {space.name}
          </h1>

          <p className="mt-2 text-slate-400">
            Lists in this Space
          </p>
        </div>

        <Link
          href="/dashboard/projects/create"
          className="
            rounded-xl
            bg-indigo-600
            px-5 py-3
            text-white
            font-medium
          "
        >
          + Create List
        </Link>

      </div>

      <div className="grid gap-4">

        {space.projects.map((project) => (
          <Link
            key={project.id}
            href={`/dashboard/spaces/${space.id}/lists/${project.id}`}
            className="
              rounded-2xl
              border border-white/10
              bg-slate-900
              p-5
              transition-all
              hover:border-indigo-500
            "
          >
            <div className="flex items-center justify-between">

              <div>
                <h3 className="text-lg font-semibold text-white">
                  {project.name}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {project.description || "No description"}
                </p>
              </div>

              <div className="text-right">
                <p className="text-slate-400 text-sm">
                  Tasks
                </p>

                <p className="text-white font-semibold">
                  {project.tasks.length}
                </p>
              </div>

            </div>
          </Link>
        ))}

        {space.projects.length === 0 && (
          <div
            className="
              rounded-2xl
              border border-dashed border-white/10
              p-10
              text-center
              text-slate-500
            "
          >
            No Lists Found
          </div>
        )}

      </div>

    </div>
  );
}