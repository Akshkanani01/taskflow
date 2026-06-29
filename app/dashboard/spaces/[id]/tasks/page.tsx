import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function TasksPage() {
  const tasks = await prisma.task.findMany({
    include: {
      project: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">
          Tasks
        </h1>

        <Link
          href="/dashboard/tasks/create"
          className="
            rounded-xl
            bg-indigo-600
            px-4 py-2
            text-white
          "
        >
          Create Task
        </Link>
      </div>

      <div className="grid gap-4">

{tasks.map((task) => (
  <Link
    key={task.id}
    href={`/dashboard/tasks/${task.id}`}
    className="
      block
      rounded-2xl
      border border-white/10
      bg-slate-900
      p-5
      transition
      hover:border-indigo-500/50
      hover:bg-slate-800
      cursor-pointer
    "
  >
    <h3 className="font-semibold text-white">
      {task.title}
    </h3>

    <p className="mt-1 text-slate-400">
      {task.description}
    </p>

    <div className="mt-3 flex gap-2">
      <span
        className="
          rounded-lg
          bg-indigo-500/20
          px-3 py-1
          text-xs
          text-indigo-300
        "
      >
        {task.project.name}
      </span>

      <span
        className="
          rounded-lg
          bg-emerald-500/20
          px-3 py-1
          text-xs
          text-emerald-300
        "
      >
        {task.status}
      </span>
    </div>
  </Link>
))}

      </div>
    </div>
  );
}