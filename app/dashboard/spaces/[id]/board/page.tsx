import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function SpaceBoardPage({
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
      },
    },
  });

  if (!space) {
    notFound();
  }

  const tasks = space.projects.flatMap(
    (project) => project.tasks
  );

  const todo = tasks.filter(
    (task) => task.status === "todo"
  );

  const inProgress = tasks.filter(
    (task) =>
      task.status === "in_progress" ||
      task.status === "progress"
  );

  const done = tasks.filter(
    (task) => task.status === "done"
  );

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-4xl font-bold text-white">
          {space.name}
        </h1>

        <p className="mt-2 text-slate-400">
          Space Board
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        {/* TODO */}

        <div className="rounded-3xl bg-slate-900 p-5">
          <h2 className="mb-4 font-semibold text-white">
            Todo ({todo.length})
          </h2>

          <div className="space-y-3">
            {todo.map((task) => (
              <div
                key={task.id}
                className="
                  rounded-2xl
                  border border-white/10
                  bg-slate-950
                  p-4
                "
              >
                <p className="font-medium text-white">
                  {task.title}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  {task.priority}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* IN PROGRESS */}

        <div className="rounded-3xl bg-slate-900 p-5">
          <h2 className="mb-4 font-semibold text-white">
            In Progress ({inProgress.length})
          </h2>

          <div className="space-y-3">
            {inProgress.map((task) => (
              <div
                key={task.id}
                className="
                  rounded-2xl
                  border border-white/10
                  bg-slate-950
                  p-4
                "
              >
                <p className="font-medium text-white">
                  {task.title}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  {task.priority}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* DONE */}

        <div className="rounded-3xl bg-slate-900 p-5">
          <h2 className="mb-4 font-semibold text-white">
            Done ({done.length})
          </h2>

          <div className="space-y-3">
            {done.map((task) => (
              <div
                key={task.id}
                className="
                  rounded-2xl
                  border border-white/10
                  bg-slate-950
                  p-4
                "
              >
                <p className="font-medium text-white">
                  {task.title}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  {task.priority}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}