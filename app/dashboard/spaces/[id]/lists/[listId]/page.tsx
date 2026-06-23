import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

import CreateTaskForm from "./create-task-form";

import StatusSelect from "./components/status-select";
import PrioritySelect from "./components/priority-select";
import DueDatePicker from "./components/due-date-picker";
import TaskActions from "./components/task-actions";

export default async function ListPage({
  params,
}: {
  params: Promise<{
    id: string;
    listId: string;
  }>;
}) {
  const { listId } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id: listId,
    },

    include: {
      tasks: {
        orderBy: {
          createdAt: "desc",
        },

        include: {
          assignees: {
            include: {
              user: true,
            },
          },

          attachments: true,
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  const totalTasks = project.tasks.length;

  const completedTasks =
    project.tasks.filter(
      (task) => task.status === "done"
    ).length;

  const inProgressTasks =
    project.tasks.filter(
      (task) =>
        task.status === "in_progress"
    ).length;

  const todoTasks =
    project.tasks.filter(
      (task) => task.status === "todo"
    ).length;

  return (
    <div className="space-y-8">

      {/* Header */}

      <div
        className="
          rounded-3xl
          border border-white/10
          bg-gradient-to-br
          from-slate-900
          to-slate-950
          p-8
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <div
              className="
                mb-3
                inline-flex
                rounded-full
                border
                border-indigo-500/30
                bg-indigo-500/10
                px-3
                py-1
                text-xs
                font-medium
                text-indigo-300
              "
            >
              Project Workspace
            </div>

            <h1
              className="
                text-4xl
                font-bold
                text-white
              "
            >
              {project.name}
            </h1>

            <p
              className="
                mt-2
                text-slate-400
              "
            >
              Enterprise Task Management
            </p>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-5
              py-4
            "
          >
            <div className="text-xs text-slate-500">
              Total Tasks
            </div>

            <div
              className="
                mt-1
                text-3xl
                font-bold
                text-white
              "
            >
              {totalTasks}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}

      <div
        className="
          grid
          gap-5
          md:grid-cols-4
        "
      >
        <StatCard
          title="Total"
          value={totalTasks}
        />

        <StatCard
          title="Todo"
          value={todoTasks}
        />

        <StatCard
          title="In Progress"
          value={inProgressTasks}
        />

        <StatCard
          title="Completed"
          value={completedTasks}
        />
      </div>

      {/* Views */}

      <div
        className="
          flex
          items-center
          gap-2
          rounded-2xl
          border
          border-white/10
          bg-slate-900
          p-3
        "
      >
        <button
          className="
            rounded-xl
            bg-indigo-600
            px-4
            py-2
            text-sm
            text-white
          "
        >
          List
        </button>

        <button
          className="
            rounded-xl
            px-4
            py-2
            text-sm
            text-slate-400
            hover:text-white
          "
        >
          Board
        </button>

        <button
          className="
            rounded-xl
            px-4
            py-2
            text-sm
            text-slate-400
            hover:text-white
          "
        >
          Calendar
        </button>

        <button
          className="
            rounded-xl
            px-4
            py-2
            text-sm
            text-slate-400
            hover:text-white
          "
        >
          Timeline
        </button>
      </div>

      {/* Create Task */}

      <CreateTaskForm
        projectId={project.id}
      />

      {/* Tasks Table */}

      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-slate-900
        "
      >
        <div
          className="
            grid
            grid-cols-7
            border-b
            border-white/10
            px-6
            py-4
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-slate-500
          "
        >
          <div>Task</div>
          <div>Assignees</div>
          <div>Files</div>
          <div>Due Date</div>
          <div>Priority</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {project.tasks.map((task) => (
          <div
            key={task.id}
            className="
              grid
              grid-cols-7
              items-center
              border-b
              border-white/5
              px-6
              py-4
              hover:bg-white/[0.02]
            "
          >
            {/* Task */}

            <div>
              <Link
                href={`/dashboard/tasks/${task.id}`}
                className="
                  font-medium
                  text-white
                  transition
                  hover:text-indigo-400
                "
              >
                {task.title}
              </Link>
            </div>

            {/* Assignees */}

            <div
              className="
                flex
                flex-wrap
                gap-2
              "
            >
              {task.assignees.length === 0 && (
                <span
                  className="
                    text-sm
                    text-slate-500
                  "
                >
                  Unassigned
                </span>
              )}

              {task.assignees.map(
                (assignee) => (
                  <div
                    key={assignee.id}
                    className="
                      rounded-full
                      bg-indigo-500/10
                      px-3
                      py-1
                      text-xs
                      text-indigo-300
                    "
                  >
                    {assignee.user.name ??
                      "User"}
                  </div>
                )
              )}
            </div>

            {/* Files */}

            <div>
              <span
                className="
                  rounded-xl
                  bg-slate-800
                  px-3
                  py-1
                  text-sm
                  text-slate-300
                "
              >
                📎 {task.attachments.length}
              </span>
            </div>

            {/* Due Date */}

            <DueDatePicker
              taskId={task.id}
              dueDate={task.dueDate}
            />

            {/* Priority */}

            <PrioritySelect
              taskId={task.id}
              value={task.priority}
            />

            {/* Status */}

            <StatusSelect
              taskId={task.id}
              value={task.status}
            />

            {/* Actions */}

            <TaskActions
              taskId={task.id}
            />
          </div>
        ))}

        {project.tasks.length === 0 && (
          <div
            className="
              p-16
              text-center
            "
          >
            <div className="text-6xl">
              📋
            </div>

            <h3
              className="
                mt-4
                text-xl
                font-semibold
                text-white
              "
            >
              No Tasks Yet
            </h3>

            <p
              className="
                mt-2
                text-slate-500
              "
            >
              Create your first task to
              start managing work.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-slate-900
        p-5
      "
    >
      <p
        className="
          text-sm
          text-slate-500
        "
      >
        {title}
      </p>

      <h3
        className="
          mt-2
          text-3xl
          font-bold
          text-white
        "
      >
        {value}
      </h3>
    </div>
  );
}