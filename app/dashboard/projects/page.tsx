import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Projects
        </h1>

        <Link
          href="/dashboard/projects/create"
          className="rounded-xl bg-indigo-600 px-4 py-2 text-white"
        >
          Create Project
        </Link>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/dashboard/projects/${project.id}`}
            className="rounded-xl border p-5"
          >
            <h3 className="font-semibold">
              {project.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}