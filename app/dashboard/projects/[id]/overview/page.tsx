import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import {
Activity,
CheckCircle2,
Clock3,
FolderOpen,
Users,
Target,
TrendingUp,
} from "lucide-react";
import { TaskStatus } from "@prisma/client";
export default async function ProjectOverviewPage({
params,
}: {
params: Promise<{ id: string }>;
}) {
const { id } = await params;

const project = await prisma.project.findUnique({
where: { id },
include: {
tasks: true,
space: true,
},
});

if (!project) notFound();

const totalTasks = project.tasks.length;

const completedTasks = project.tasks.filter(
(t) => t.status === TaskStatus.DONE
).length;

const progress =
totalTasks === 0
? 0
: Math.round(
(completedTasks / totalTasks) * 100
);

return ( <div className="space-y-8">

  <section className="rounded-3xl border border-white/10 bg-slate-900 p-8">

    <div className="flex items-start justify-between">

      <div>
        <p className="text-sm text-slate-400">
          {project.space.name}
        </p>

        <h1 className="mt-2 text-5xl font-bold text-white">
          {project.name}
        </h1>

        <p className="mt-4 max-w-3xl text-slate-400">
          {project.description ||
            "No description available."}
        </p>
      </div>

      <div className="rounded-2xl bg-indigo-600 px-5 py-3 text-white">
        {project.status}
      </div>

    </div>

  </section>

  <div className="grid gap-6 xl:grid-cols-4">

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Target className="mb-4 text-indigo-400" />

      <p className="text-slate-400">
        Total Tasks
      </p>

      <h2 className="mt-2 text-4xl font-bold text-white">
        {totalTasks}
      </h2>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <CheckCircle2 className="mb-4 text-emerald-400" />

      <p className="text-slate-400">
        Completed
      </p>

      <h2 className="mt-2 text-4xl font-bold text-white">
        {completedTasks}
      </h2>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <TrendingUp className="mb-4 text-cyan-400" />

      <p className="text-slate-400">
        Progress
      </p>

      <h2 className="mt-2 text-4xl font-bold text-white">
        {progress}%
      </h2>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Users className="mb-4 text-violet-400" />

      <p className="text-slate-400">
        Team
      </p>

      <h2 className="mt-2 text-4xl font-bold text-white">
        5
      </h2>
    </div>

  </div>

  <section className="rounded-3xl border border-white/10 bg-slate-900 p-8">

    <div className="mb-4 flex items-center gap-2">
      <Activity className="text-indigo-400" />

      <h2 className="text-2xl font-semibold text-white">
        Project Health
      </h2>
    </div>

    <div className="h-4 rounded-full bg-slate-800">

      <div
        className="h-4 rounded-full bg-indigo-500"
        style={{
          width: `${progress}%`,
        }}
      />

    </div>

    <p className="mt-4 text-slate-400">
      Overall completion: {progress}%
    </p>

  </section>

  <div className="grid gap-6 xl:grid-cols-2">

    <section className="rounded-3xl border border-white/10 bg-slate-900 p-8">

      <h2 className="mb-6 text-2xl font-semibold text-white">
        Recent Activity
      </h2>

      <div className="space-y-4">

        <div className="rounded-xl bg-slate-800 p-4">
          Project created
        </div>

        <div className="rounded-xl bg-slate-800 p-4">
          Tasks updated
        </div>

        <div className="rounded-xl bg-slate-800 p-4">
          Team assigned
        </div>

      </div>

    </section>

    <section className="rounded-3xl border border-white/10 bg-slate-900 p-8">

      <h2 className="mb-6 text-2xl font-semibold text-white">
        Upcoming Deadlines
      </h2>

      <div className="space-y-4">

        <div className="flex items-center gap-3 rounded-xl bg-slate-800 p-4">
          <Clock3 size={18} />
          No upcoming deadlines
        </div>

      </div>

    </section>

  </div>

  <section className="rounded-3xl border border-white/10 bg-slate-900 p-8">

    <div className="mb-6 flex items-center gap-2">

      <FolderOpen className="text-indigo-400" />

      <h2 className="text-2xl font-semibold text-white">
        Recent Files
      </h2>

    </div>

    <div className="grid gap-4 md:grid-cols-3">

      <div className="rounded-xl bg-slate-800 p-5">
        requirements.pdf
      </div>

      <div className="rounded-xl bg-slate-800 p-5">
        wireframe.fig
      </div>

      <div className="rounded-xl bg-slate-800 p-5">
        assets.zip
      </div>

    </div>

  </section>

</div>

);
}
