import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import StatusSelect from "./components/status-select";
import PrioritySelect from "./components/priority-select";
import AssigneeSelect from "./components/assignee-select";
import DueDatePicker from "./components/due-date-picker";

export default async function TaskPage({
params,
}: {
params: Promise<{ id: string }>;
}) {
const { id } = await params;

const task = await prisma.task.findUnique({
where: { id },
include: {
project: true,
},
});

if (!task) notFound();

return ( <div className="w-full px-8 py-8 xl:px-12 2xl:px-16">

  {/* HEADER */}

  <div className="mb-8">

    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
      {task.project.name} / TASK
    </p>

    <h1
      className="
        mt-4
        text-5xl
        font-bold
        tracking-tight
        text-white
        xl:text-6xl
      "
    >
      {task.title}
    </h1>

    <p className="mt-4 text-slate-400">
      Enterprise Task Workspace
    </p>

  </div>

  {/* PROPERTY BAR */}

  {/* MAIN GRID */}

  <div className="grid grid-cols-12 gap-6">

    {/* LEFT SIDE */}

    <div className="col-span-12 xl:col-span-8 space-y-6">

      {/* DESCRIPTION */}

      <section
        className="
          rounded-3xl
          border border-white/10
          bg-slate-900
          p-8
          min-h-[300px]
        "
      >
        <h2 className="mb-6 text-2xl font-semibold text-white">
          Description
        </h2>

        <div
          className="
            rounded-2xl
            bg-slate-950
            p-6
            text-slate-300
          "
        >
          {task.description || "No description available"}
        </div>
      </section>

      {/* SUBTASKS */}

      <section
        className="
          rounded-3xl
          border border-white/10
          bg-slate-900
          p-8
        "
      >
        <h2 className="mb-6 text-2xl font-semibold text-white">
          Subtasks
        </h2>

        <div className="space-y-3">

          <div className="rounded-xl bg-slate-800 p-4 text-white">
            ☑ Wireframe Approved
          </div>

          <div className="rounded-xl bg-slate-800 p-4 text-white">
            ☐ Hero Section Design
          </div>

          <div className="rounded-xl bg-slate-800 p-4 text-white">
            ☐ Mobile Responsive Layout
          </div>

        </div>

      </section>

      {/* ATTACHMENTS */}

      <section
        className="
          rounded-3xl
          border border-white/10
          bg-slate-900
          p-8
        "
      >
        <h2 className="mb-6 text-2xl font-semibold text-white">
          Attachments
        </h2>

        <div className="grid gap-4 md:grid-cols-2">

          <div className="rounded-xl bg-slate-800 p-5 text-white">
            📎 landing-page.fig
          </div>

          <div className="rounded-xl bg-slate-800 p-5 text-white">
            📎 requirements.pdf
          </div>

        </div>

      </section>

    </div>

    {/* RIGHT SIDEBAR */}

    <div className="col-span-12 xl:col-span-4">

      <div className="sticky top-24 space-y-6">

        {/* DETAILS */}

        <div
          className="
            rounded-3xl
            border border-white/10
            bg-slate-900
            p-6
          "
        >
          <h3 className="mb-6 text-lg font-semibold text-white">
            Task Details
          </h3>

          <div className="space-y-5">


<div>
  <p className="mb-2 text-xs uppercase text-slate-500">
    Project
  </p>

  <p className="text-white">
    {task.project.name}
  </p>
</div>

<div>
  <p className="mb-2 text-xs uppercase text-slate-500">
    Status
  </p>

  <StatusSelect
    taskId={task.id}
    value={task.status}
  />
</div>

<div>
  <p className="mb-2 text-xs uppercase text-slate-500">
    Priority
  </p>

  <PrioritySelect
    taskId={task.id}
    value={task.priority}
  />
</div>

<div>
  <p className="mb-2 text-xs uppercase text-slate-500">
    Assignee
  </p>

  <AssigneeSelect
    taskId={task.id}
    assigneeId={task.assigneeId}
  />
</div>

<div>
  <p className="mb-2 text-xs uppercase text-slate-500">
    Due Date
  </p>

  <DueDatePicker
    taskId={task.id}
    dueDate={task.dueDate}
  />
</div>


  </div>
</div>

        {/* PROGRESS */}

        <div
          className="
            rounded-3xl
            border border-white/10
            bg-slate-900
            p-6
          "
        >
          <h3 className="mb-5 text-lg font-semibold text-white">
            Progress
          </h3>

          <div className="h-3 rounded-full bg-slate-800">

            <div
              className="
                h-3
                w-[72%]
                rounded-full
                bg-indigo-500
              "
            />

          </div>

          <p className="mt-4 text-sm text-slate-400">
            72% Complete
          </p>

        </div>

        {/* TIME */}

        <div
          className="
            rounded-3xl
            border border-white/10
            bg-slate-900
            p-6
          "
        >
          <h3 className="mb-4 text-lg font-semibold text-white">
            Time Tracking
          </h3>

          <p className="text-slate-300">
            8h logged / 12h estimated
          </p>

        </div>

        {/* AI */}

        <div
          className="
            rounded-3xl
            border border-indigo-500/20
            bg-indigo-500/5
            p-6
          "
        >
          <h3 className="mb-4 text-lg font-semibold text-white">
            AI Summary
          </h3>

          <p className="text-sm text-slate-300">
            Task is progressing normally.
            Mobile responsive work is still pending.
          </p>

        </div>

      </div>

    </div>

    {/* ACTIVITY */}

    <div className="col-span-12">

      <section
        className="
          rounded-3xl
          border border-white/10
          bg-slate-900
          p-8
        "
      >
        <h2 className="mb-6 text-2xl font-semibold text-white">
          Activity Timeline
        </h2>

        <div className="space-y-5">

          <div className="flex gap-4">
            <div className="mt-2 h-3 w-3 rounded-full bg-indigo-500" />
            <div className="text-slate-300">
              Task Created
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-2 h-3 w-3 rounded-full bg-emerald-500" />
            <div className="text-slate-300">
              Status Updated
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-2 h-3 w-3 rounded-full bg-amber-500" />
            <div className="text-slate-300">
              Comment Added
            </div>
          </div>

        </div>

      </section>

    </div>

    {/* COMMENTS */}

    <div className="col-span-12">

      <section
        className="
          rounded-3xl
          border border-white/10
          bg-slate-900
          p-8
        "
      >
        <h2 className="mb-6 text-2xl font-semibold text-white">
          Comments
        </h2>

        <textarea
          placeholder="Write a comment..."
          className="
            h-40
            w-full
            rounded-2xl
            border border-white/10
            bg-slate-950
            p-4
            text-white
          "
        />

      </section>

    </div>

  </div>

</div>

);
}
