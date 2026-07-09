"use client";

import Link from "next/link";

import {
  Calendar,
  CheckSquare,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  dueDate: string;
}

interface Props {
  member: {
    name: string | null;
  };

  tasks: Task[];
}

export default function MemberTasks({
  member,
  tasks,
}: Props) {
  return (
    <div className="mx-auto max-w-7xl">

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-white">
          Assigned Tasks
        </h1>

        <p className="mt-2 text-zinc-500">
          Tasks currently assigned to {member.name}.
        </p>

      </div>

      <div className="overflow-hidden rounded-[28px] border border-zinc-800 bg-[#121A26]">

        {/* Header */}

        <div className="grid grid-cols-[2fr_150px_150px_170px] border-b border-zinc-800 bg-[#161F2D] px-6 py-4 text-sm font-semibold text-zinc-400">

          <div>Task</div>

          <div>Status</div>

          <div>Priority</div>

          <div>Due Date</div>

        </div>

        {/* Rows */}

        {tasks.map((task) => (
          <Link
            key={task.id}
            href={`/dashboard/tasks/${task.id}`}
            className="
              grid
              grid-cols-[2fr_150px_150px_170px]

              items-center

              border-b
              border-zinc-800

              px-6
              py-5

              transition

              hover:bg-[#1B2432]
            "
          >
            <div className="flex items-center gap-3">

              <CheckSquare
                size={18}
                className="text-blue-400"
              />

              <span className="font-medium text-white">
                {task.title}
              </span>

            </div>

            <div>

              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-300">
                {task.status}
              </span>

            </div>

            <div>

              <span className="text-zinc-300">
                {task.priority}
              </span>

            </div>

            <div className="flex items-center gap-2 text-zinc-400">

              <Calendar size={16} />

              {task.dueDate}

            </div>

          </Link>
        ))}

      </div>

    </div>
  );
}