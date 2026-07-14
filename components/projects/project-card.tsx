"use client";

import Link from "next/link";
import ProjectActions from "./project-actions";

type Project = {
  id: string;
  name: string;
  description: string | null;
  tasks: {
    id: string;
  }[];
};

type Props = {
  spaceId: string;
  project: Project;
};

export default function ProjectCard({
  spaceId,
  project,
}: Props) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-slate-900
        transition-all
        hover:border-indigo-500
      "
    >
      <div className="flex items-start justify-between p-5">
        <Link
          href={`/dashboard/spaces/${spaceId}/lists/${project.id}`}
          className="flex-1"
        >
          <div>
            <h3 className="text-lg font-semibold text-white">
              {project.name}
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              {project.description || "No description"}
            </p>
          </div>

          <div className="mt-4 text-right">
            <p className="text-sm text-slate-400">
              Tasks
            </p>

            <p className="font-semibold text-white">
              {project.tasks.length}
            </p>
          </div>
        </Link>

        <div className="ml-4 shrink-0">
          <ProjectActions
            projectId={project.id}
            projectName={project.name}
          />
        </div>
      </div>
    </div>
  );
}