import {
  Calendar,
  Flag,
  FolderKanban,
  Users,
  Paperclip,
  Activity,
  Hash,
  Clock3,
} from "lucide-react";

export default function TaskSidebar({
  task,
}: {
  task: any;
}) {
  const statusColor = {
    todo: "bg-slate-700 text-slate-200",
    in_progress:
      "bg-blue-500/20 text-blue-300",
    review:
      "bg-yellow-500/20 text-yellow-300",
    done:
      "bg-emerald-500/20 text-emerald-300",
  };

  const priorityColor = {
    low: "bg-slate-700 text-slate-200",
    normal:
      "bg-blue-500/20 text-blue-300",
    high:
      "bg-orange-500/20 text-orange-300",
    urgent:
      "bg-red-500/20 text-red-300",
  };

  return (
    <div
      className="
        sticky top-6
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-slate-900
      "
    >
      {/* Header */}

      <div
        className="
          border-b border-white/10
          bg-gradient-to-r
          from-indigo-600/20
          to-purple-600/20
          p-6
        "
      >
        <h3
          className="
            text-xl
            font-bold
            text-white
          "
        >
          Task Details
        </h3>

        <p
          className="
            mt-1
            text-sm
            text-slate-400
          "
        >
          Enterprise task metadata
        </p>
      </div>

      <div className="space-y-6 p-6">

        {/* Task ID */}

        <div
          className="
            rounded-2xl
            border border-white/10
            bg-slate-950
            p-4
          "
        >
          <div
            className="
              flex items-center gap-2
              text-xs text-slate-500
            "
          >
            <Hash size={14} />
            Task ID
          </div>

          <div
            className="
              mt-2
              truncate
              text-sm
              text-white
            "
          >
            {task.id}
          </div>
        </div>

        {/* Project */}

        <div>
          <div
            className="
              flex items-center gap-2
              text-xs text-slate-500
            "
          >
            <FolderKanban size={14} />
            Project
          </div>

          <p
            className="
              mt-2
              text-white
              font-medium
            "
          >
            {task.project?.name}
          </p>
        </div>

        {/* Status */}

        <div>
          <div
            className="
              mb-2
              text-xs
              text-slate-500
            "
          >
            Status
          </div>

          <span
            className={`
              inline-flex
              rounded-full
              px-3 py-1
              text-sm
              font-medium
              ${
                statusColor[
                  task.status as keyof typeof statusColor
                ] ||
                "bg-slate-700 text-slate-200"
              }
            `}
          >
            {task.status}
          </span>
        </div>

        {/* Priority */}

        <div>
          <div
            className="
              mb-2
              flex items-center gap-2
              text-xs text-slate-500
            "
          >
            <Flag size={14} />
            Priority
          </div>

          <span
            className={`
              inline-flex
              rounded-full
              px-3 py-1
              text-sm
              font-medium
              ${
                priorityColor[
                  task.priority as keyof typeof priorityColor
                ] ||
                "bg-slate-700 text-slate-200"
              }
            `}
          >
            {task.priority}
          </span>
        </div>

        {/* Assignees */}

        <div>
          <div
            className="
              mb-3
              flex items-center gap-2
              text-xs text-slate-500
            "
          >
            <Users size={14} />
            Assignees
          </div>

          <div className="flex flex-wrap gap-2">
            {task.assignees?.length ? (
              task.assignees.map(
                (assignee: any) => (
                  <div
                    key={assignee.id}
                    className="
                      rounded-full
                      bg-indigo-500/10
                      px-3 py-1
                      text-xs
                      text-indigo-300
                    "
                  >
                    {assignee.user?.name ||
                      assignee.user?.email}
                  </div>
                )
              )
            ) : (
              <span className="text-slate-500">
                Unassigned
              </span>
            )}
          </div>
        </div>

        {/* Attachments */}

        <div>
          <div
            className="
              flex items-center gap-2
              text-xs text-slate-500
            "
          >
            <Paperclip size={14} />
            Attachments
          </div>

          <p
            className="
              mt-2
              text-white
            "
          >
            {task.attachments?.length || 0}
            {" "}Files
          </p>
        </div>

        {/* Due Date */}

        <div>
          <div
            className="
              flex items-center gap-2
              text-xs text-slate-500
            "
          >
            <Calendar size={14} />
            Due Date
          </div>

          <p
            className="
              mt-2
              text-white
            "
          >
            {task.dueDate
              ? new Intl.DateTimeFormat(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                ).format(
                  new Date(
                    task.dueDate
                  )
                )
              : "No Due Date"}
          </p>
        </div>

        {/* Created */}

        <div>
          <div
            className="
              flex items-center gap-2
              text-xs text-slate-500
            "
          >
            <Clock3 size={14} />
            Created
          </div>

          <p
            className="
              mt-2
              text-white
            "
          >
            {new Intl.DateTimeFormat(
              "en-IN",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              }
            ).format(
              new Date(
                task.createdAt
              )
            )}
          </p>
        </div>

        {/* Updated */}

        <div>
          <div
            className="
              flex items-center gap-2
              text-xs text-slate-500
            "
          >
            <Activity size={14} />
            Last Updated
          </div>

          <p
            className="
              mt-2
              text-white
            "
          >
            {new Intl.DateTimeFormat(
              "en-IN",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              }
            ).format(
              new Date(
                task.updatedAt
              )
            )}
          </p>
        </div>

        {/* Progress */}

        <div>
          <div
            className="
              mb-2
              text-xs
              text-slate-500
            "
          >
            Progress
          </div>

          <div
            className="
              h-3
              overflow-hidden
              rounded-full
              bg-slate-800
            "
          >
            <div
              className={`
                h-full
                ${
                  task.status === "done"
                    ? "w-full bg-emerald-500"
                    : task.status ===
                      "in_progress"
                    ? "w-1/2 bg-blue-500"
                    : "w-1/4 bg-slate-500"
                }
              `}
            />
          </div>
        </div>
      </div>
    </div>
  );
}