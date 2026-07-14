"use client";

import { useState } from "react";
import Link from "next/link";
import CreateProjectDialog from "@/components/projects/create-project-dialog";

type Project = {
  id: string;
  name: string;
};

type Props = {
  projects: Project[];
};

export default function ProjectsClient({
  projects,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Lists
          </h1>

          <button
            onClick={() => setOpen(true)}
            className="
              rounded-xl
              bg-indigo-600
              px-4
              py-2
              font-medium
              text-white
              transition
              hover:bg-indigo-500
            "
          >
            Create List
          </button>
        </div>

        <div className="grid gap-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/dashboard/projects/${project.id}`}
              className="
                rounded-2xl
                border
                border-white/10
                bg-slate-900
                p-5
                transition-all
                hover:border-indigo-500
                hover:bg-slate-800
              "
            >
              <h3 className="font-semibold text-white">
                {project.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      <CreateProjectDialog
  open={open}
  onOpenChange={setOpen}
  spaceId=""
/>
    </>
  );
}