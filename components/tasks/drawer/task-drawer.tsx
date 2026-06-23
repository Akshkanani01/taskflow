"use client";

import {
X,
Calendar,
Flag,
User,
} from "lucide-react";

export default function TaskDrawer({
open,
task,
onClose,
}: {
open: boolean;
task: any;
onClose: () => void;
}) {
if (!open) return null;

const formattedDate =
task?.dueDate
? new Date(
task.dueDate
).toLocaleDateString(
"en-IN",
{
day: "numeric",
month: "short",
year: "numeric",
}
)
: "Not Set";

return (
<> <div
     onClick={onClose}
     className="
       fixed inset-0
       z-40
       bg-black/50
     "
   />

  <div
    className="
      fixed right-0 top-0
      z-50
      h-screen
      w-[520px]
      overflow-y-auto
      border-l border-white/10
      bg-slate-950
      shadow-2xl
    "
  >
    <div
      className="
        flex items-center
        justify-between
        border-b border-white/10
        p-6
      "
    >
      <h2 className="text-xl font-bold text-white">
        Task Details
      </h2>

      <button
        onClick={onClose}
        className="
          rounded-lg
          p-2
          text-slate-400
          transition
          hover:bg-slate-900
          hover:text-white
        "
      >
        <X size={20} />
      </button>
    </div>

    <div className="space-y-6 p-6">

      <div>
        <h1 className="text-2xl font-bold text-white">
          {task?.title ||
            "Untitled Task"}
        </h1>

        <p className="mt-3 text-slate-400">
          {task?.description ||
            "No description available"}
        </p>
      </div>

      <div className="grid gap-4">

        <div
          className="
            flex items-center
            justify-between
            rounded-xl
            border border-white/10
            p-4
          "
        >
          <div className="flex items-center gap-3">
            <Flag size={18} />
            <span>Status</span>
          </div>

          <span className="text-indigo-400">
            {task?.status ||
              "todo"}
          </span>
        </div>

        <div
          className="
            flex items-center
            justify-between
            rounded-xl
            border border-white/10
            p-4
          "
        >
          <div className="flex items-center gap-3">
            <Flag size={18} />
            <span>Priority</span>
          </div>

          <span className="text-orange-400">
            {task?.priority ||
              "medium"}
          </span>
        </div>

        <div
          className="
            flex items-center
            justify-between
            rounded-xl
            border border-white/10
            p-4
          "
        >
          <div className="flex items-center gap-3">
            <User size={18} />
            <span>Assignee</span>
          </div>

          <span className="text-slate-300">
            {task?.assignee ||
              "Unassigned"}
          </span>
        </div>

        <div
          className="
            flex items-center
            justify-between
            rounded-xl
            border border-white/10
            p-4
          "
        >
          <div className="flex items-center gap-3">
            <Calendar size={18} />
            <span>Due Date</span>
          </div>

          <span className="text-slate-300">
            {formattedDate}
          </span>
        </div>

      </div>

    </div>
  </div>
</>

);
}
