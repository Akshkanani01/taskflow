
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function BoardPage() {
  const tasks = await prisma.task.findMany({
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
  });

  const columns = [
    {
      title: "Todo",
      color: "bg-slate-500/20 text-slate-300",
      tasks: tasks.filter(
        (task) => task.status === "todo"
      ),
    },

    {
      title: "In Progress",
      color: "bg-blue-500/20 text-blue-300",
      tasks: tasks.filter(
        (task) =>
          task.status === "in_progress"
      ),
    },

    {
      title: "Review",
      color: "bg-yellow-500/20 text-yellow-300",
      tasks: tasks.filter(
        (task) => task.status === "review"
      ),
    },

    {
      title: "Done",
      color: "bg-green-500/20 text-green-300",
      tasks: tasks.filter(
        (task) => task.status === "done"
      ),
    },
  ];

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
                inline-flex
                rounded-full
                bg-indigo-500/10
                px-3 py-1
                text-xs
                font-medium
                text-indigo-300
              "
            >
              Enterprise Kanban
            </div>

            <h1
              className="
                mt-4
                text-4xl
                font-bold
                text-white
              "
            >
              Board View
            </h1>

            <p className="mt-2 text-slate-400">
              Manage tasks visually across workflows.
            </p>
          </div>

          <div
            className="
              rounded-2xl
              border border-white/10
              bg-white/5
              px-6 py-4
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
              {tasks.length}
            </div>
          </div>
        </div>
      </div>

      {/* Board */}

      <div
        className="
          grid
          gap-6
          xl:grid-cols-4
        "
      >
        {columns.map((column) => (
          <div
            key={column.title}
            className="
              rounded-3xl
              border border-white/10
              bg-slate-900
              p-5
            "
          >
            {/* Column Header */}

            <div
              className="
                mb-5
                flex
                items-center
                justify-between
              "
            >
              <div
                className={`
                  rounded-full
                  px-3 py-1
                  text-sm font-medium
                  ${column.color}
                `}
              >
                {column.title}
              </div>

              <div
                className="
                  rounded-full
                  bg-white/5
                  px-3 py-1
                  text-sm
                  text-slate-400
                "
              >
                {column.tasks.length}
              </div>
            </div>

            {/* Cards */}

            <div className="space-y-4">
              {column.tasks.map((task) => (
                <Link
                  key={task.id}
                  href={`/dashboard/tasks/${task.id}`}
                >
                  <div
                    className="
                      group
                      cursor-pointer
                      rounded-2xl
                      border border-white/5
                      bg-slate-950
                      p-4
                      transition
                      hover:border-indigo-500/40
                      hover:bg-slate-900
                    "
                  >
                    {/* Title */}

                    <h3
                      className="
                        font-medium
                        text-white
                        group-hover:text-indigo-400
                      "
                    >
                      {task.title}
                    </h3>

                    {/* Description */}

                    {task.description && (
                      <p
                        className="
                          mt-2
                          line-clamp-2
                          text-sm
                          text-slate-400
                        "
                      >
                        {task.description}
                      </p>
                    )}

                    {/* Priority */}

                    <div className="mt-4">
                      <span
                        className={`
                          rounded-full
                          px-3 py-1
                          text-xs
                          font-medium

                          ${
                            task.priority === "urgent"
                              ? "bg-red-500/20 text-red-300"
                              : task.priority === "high"
                              ? "bg-orange-500/20 text-orange-300"
                              : task.priority === "normal"
                              ? "bg-blue-500/20 text-blue-300"
                              : "bg-slate-500/20 text-slate-300"
                          }
                        `}
                      >
                        {task.priority}
                      </span>
                    </div>

                    {/* Footer */}

                    <div
                      className="
                        mt-4
                        flex
                        items-center
                        justify-between
                      "
                    >
                      {/* Attachments */}

                      <div
                        className="
                          text-xs
                          text-slate-500
                        "
                      >
                        📎 {task.attachments.length}
                      </div>

                      {/* Assignees */}

                      <div className="flex -space-x-2">
                        {task.assignees
                          .slice(0, 3)
                          .map(
                            (assignee) => (
                              <div
                                key={assignee.id}
                                className="
                                  flex
                                  h-8
                                  w-8
                                  items-center
                                  justify-center
                                  rounded-full
                                  border
                                  border-slate-900
                                  bg-indigo-600
                                  text-xs
                                  font-bold
                                  text-white
                                "
                              >
                                {(
                                  assignee.user
                                    .name ??
                                  "U"
                                )
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>
                            )
                          )}
                      </div>
                    </div>

                    {/* Due Date */}

                    {task.dueDate && (
                      <div
                        className="
                          mt-4
                          text-xs
                          text-slate-500
                        "
                      >
                        Due:{" "}
                        {new Date(
                          task.dueDate
                        ).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </Link>
              ))}

              {column.tasks.length === 0 && (
                <div
                  className="
                    rounded-2xl
                    border border-dashed
                    border-white/10
                    p-6
                    text-center
                  "
                >
                  <div className="text-3xl">
                    📭
                  </div>

                  <p
                    className="
                      mt-2
                      text-sm
                      text-slate-500
                    "
                  >
                    No tasks
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

