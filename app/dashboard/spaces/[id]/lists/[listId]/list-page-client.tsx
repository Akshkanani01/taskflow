"use client";

import { useMemo, useState } from "react";

import {
  ArrowUpDown,
  Filter,
  Plus,
  Search,
} from "lucide-react";

import TaskTable from "@/components/tasks/task-table";
import CreateTaskModal from "@/components/tasks/create/create-task-modal";
import CreateTaskForm from "./create-task-form";

type Props = {
  project: any;

  tasks: any[];

  members: any[];

  spaceId: string;

  listId: string;

  currentUserId: string;

  search: string;

  status: string;

  priority: string;

  sort: string;

  totalTasks: number;

  completedTasks: number;

  overdueTasks: number;

  completionRate: number;

   title: string;
};

export default function ListPageClient({
  project,
  tasks,
  members,

  spaceId,
  listId,

  currentUserId,

  search,
  status,
  priority,
  sort,

  totalTasks,
  completedTasks,
  overdueTasks,
  completionRate,
}: Props) {

  const [openCreate, setOpenCreate] =
    useState(false);

  const progressColor =
    useMemo(() => {

      if (completionRate >= 80)
        return "bg-emerald-500";

      if (completionRate >= 50)
        return "bg-indigo-500";

      return "bg-orange-500";

    }, [completionRate]);
      return (
    <>

      <CreateTaskModal
        open={openCreate}
        onClose={() =>
          setOpenCreate(false)
        }
      >

        <CreateTaskForm
          listId={listId}
          spaceId={spaceId}
          createdById={currentUserId}
          members={members.map(
            (member: any) => ({
              id: member.user.id,
              name:
                member.user.name ??
                member.user.email,
            })
          )}
          onSuccess={() =>
            setOpenCreate(false)
          }
        />

      </CreateTaskModal>

      <div className="min-h-screen bg-[#0B1220]">

        {/* HEADER */}

        <div className="border-b border-white/10 bg-[#111827]">

          <div className="mx-auto flex max-w-7xl items-start justify-between px-8 py-8">

            <div>

              <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
                LIST
              </span>

              <h1 className="mt-4 text-4xl font-bold text-white">

                {project.name}

              </h1>

              <p className="mt-2 max-w-2xl text-slate-400">

                {project.description ??
                  "Manage every task from one place."}

              </p>

            </div>

            <button
              onClick={() =>
                setOpenCreate(true)
              }
              className="
                flex
                h-12
                items-center
                gap-2
                rounded-2xl
                bg-indigo-600
                px-6
                font-semibold
                text-white
                transition
                hover:bg-indigo-500
              "
            >

              <Plus size={18} />

              Create Task

            </button>

          </div>

        </div>
                {/* CONTENT */}

        <div className="mx-auto max-w-7xl px-8 py-8">

          {/* STATS */}

          <div className="mb-8 grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

              <p className="text-xs uppercase tracking-widest text-slate-500">
                Total Tasks
              </p>

              <h2 className="mt-3 text-4xl font-bold text-white">
                {totalTasks}
              </h2>

            </div>

            <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

              <p className="text-xs uppercase tracking-widest text-slate-500">
                Completed
              </p>

              <h2 className="mt-3 text-4xl font-bold text-emerald-400">
                {completedTasks}
              </h2>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">

                <div
                  className={`h-full ${progressColor}`}
                  style={{
                    width: `${completionRate}%`,
                  }}
                />

              </div>

              <p className="mt-2 text-xs text-slate-500">
                {completionRate}% completed
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

              <p className="text-xs uppercase tracking-widest text-slate-500">
                Overdue
              </p>

              <h2 className="mt-3 text-4xl font-bold text-red-400">
                {overdueTasks}
              </h2>

            </div>

          </div>

          {/* TOOLBAR */}

          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-[#111827] p-5">

            <div className="relative w-full max-w-md">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                defaultValue={search}
                placeholder="Search task..."
                className="
                  h-12
                  w-full
                  rounded-2xl
                  border
                  border-white/10
                  bg-slate-950
                  pl-11
                  pr-4
                  text-white
                  outline-none
                  focus:border-indigo-500
                "
              />

            </div>

            <div className="flex flex-wrap gap-3">

              <button
                className="
                  flex
                  h-11
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/10
                  bg-slate-900
                  px-4
                  text-white
                "
              >
                <Filter size={16} />
                Status
              </button>

              <button
                className="
                  flex
                  h-11
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/10
                  bg-slate-900
                  px-4
                  text-white
                "
              >
                <Filter size={16} />
                Priority
              </button>

              <button
                className="
                  flex
                  h-11
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/10
                  bg-slate-900
                  px-4
                  text-white
                "
              >
                <ArrowUpDown size={16} />
                Sort
              </button>

            </div>

          </div>
                    {/* TASK TABLE */}

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111827]">

            {tasks.length === 0 ? (

              <div className="flex flex-col items-center justify-center py-28">

                <div className="mb-6 rounded-full bg-slate-800 p-5">

                  <Plus
                    size={36}
                    className="text-slate-500"
                  />

                </div>

                <h3 className="text-2xl font-semibold text-white">
                  No Tasks Yet
                </h3>

                <p className="mt-3 max-w-md text-center text-slate-500">
                  Start organizing this project by creating your first task.
                </p>

                <button
                  onClick={() =>
                    setOpenCreate(true)
                  }
                  className="
                    mt-8
                    flex
                    items-center
                    gap-2
                    rounded-2xl
                    bg-indigo-600
                    px-6
                    py-3
                    font-medium
                    text-white
                    transition
                    hover:bg-indigo-500
                  "
                >
                  <Plus size={18} />

                  Create First Task

                </button>

              </div>

            ) : (

              <TaskTable
                title={project.name}
                color="bg-indigo-500"
                spaceId={spaceId}
                listId={listId}
                tasks={tasks}
              />

            )}

          </div>

        </div>

      </div>

    </>
  );
}