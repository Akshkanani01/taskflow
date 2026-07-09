"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import TaskRow from "./task-row";

type Props = {
  title: string;

  color: string;

  spaceId: string;

  listId: string;

  tasks: any[];
};

export default function TaskTable({
  title,
  color,
  spaceId,
  listId,
  tasks,
}: Props) {

  const [open, setOpen] =
    useState(true);

  return (
    <div className="overflow-hidden rounded-2xl">

      {/* HEADER */}

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          flex
          w-full
          items-center
          justify-between
          border-b
          border-white/10
          bg-[#0F172A]
          px-6
          py-5
          transition
          hover:bg-[#172033]
        "
      >

        <div className="flex items-center gap-3">

          <ChevronDown
            size={18}
            className={`transition ${
              open
                ? "rotate-0"
                : "-rotate-90"
            }`}
          />

          <div
            className={`h-3 w-3 rounded-full ${color}`}
          />

          <h2 className="font-semibold text-white">

            {title}

          </h2>

          <span className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-400">

            {tasks.length}

          </span>

        </div>

      </button>

      {open && (

        <>

          {/* TABLE HEADER */}

          <div
            className="
              grid
              grid-cols-[3fr_160px_160px_160px]
              border-b
              border-white/10
              bg-[#111827]
              px-6
              py-4
              text-xs
              uppercase
              tracking-wider
              text-slate-500
            "
          >

            <div>Task</div>

            <div>Status</div>

            <div>Priority</div>

            <div>Assignee</div>

          </div>

          {/* ROWS */}

          <div className="divide-y divide-white/5">

            {tasks.length === 0 ? (

              <div className="p-10 text-center text-slate-500">

                No Tasks

              </div>

            ) : (

              tasks.map((task) => (

                <TaskRow
                  key={task.id}

                  taskId={task.id}

                  spaceId={spaceId}

                  listId={listId}

                  title={task.title}

                  assignee={
                    task.taskAssignees?.[0]
                      ?.user?.name ??
                    "Unassigned"
                  }

                  status={task.status}

                  priority={
                    task.priority
                  }

                  dueDate={
                    task.dueDate
                      ? task.dueDate
                      : undefined
                  }

                  comments={
                    task.comments
                      ?.length ?? 0
                  }

                  attachments={
                    task.attachments
                      ?.length ?? 0
                  }

                  completed={
                    task.status ===
                    "DONE"
                  }

                />

              ))

            )}

          </div>

        </>

      )}

    </div>
  );
}