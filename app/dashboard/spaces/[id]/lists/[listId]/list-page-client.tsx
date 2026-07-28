"use client";

import { useMemo, useState } from "react";

import {
  Plus,
  Search,
  Filter,
} from "lucide-react";

import TaskTable from "@/components/tasks/task-table";
import CreateTaskModal from "@/components/tasks/dialogs/create-task-modal";
import CreateTaskForm from "./create-task-form";
import type { TaskTableItem } from "@/components/tasks/task-table";
type Member = {
  id: string;
  name: string;
  email: string;
};

type Props = {
  spaceId: string;
  listId: string;

  currentUserId: string;

  project: {
    id: string;
    name: string;
  };

  tasks: TaskTableItem[];

  members: Member[];
};

export default function ListPageClient({
  spaceId,
  listId,
  currentUserId,
  project,
  tasks,
  members,
}: Props) {
    const [search, setSearch] =
    useState("");

  const [open, setOpen] =
    useState(false);

  const filteredTasks =
    useMemo(() => {

      if (!search.trim()) {
        return tasks;
      }

      return tasks.filter((task) =>
        task.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );

    }, [tasks, search]);
      return (

    <>

      <CreateTaskModal

        open={open}

        onClose={() =>
          setOpen(false)
        }

      >

        <CreateTaskForm

          listId={listId}

          spaceId={spaceId}

          createdById={
            currentUserId
          }

          members={members}

          onSuccess={() =>
            setOpen(false)
          }

        />

      </CreateTaskModal>
            <div className="space-y-8">

        {/* HEADER */}

        <section className="rounded-3xl border border-border bg-[#111827] p-8">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-muted-foreground">
                Project
              </p>

              <h1 className="mt-2 text-3xl font-bold text-foreground">
                {project.name}
              </h1>

            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="
                flex
                items-center
                gap-2
                rounded-2xl
                bg-indigo-600
                px-5
                py-3
                font-semibold
                text-foreground
                transition-all
                hover:bg-indigo-500
              "
            >
              <Plus size={18} />

              Create Task

            </button>

          </div>

          {/* SEARCH */}

          <div className="mt-8 flex items-center gap-4">

            <div className="relative flex-1">

              <Search
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-muted-foreground
                "
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search tasks..."
                className="
                  h-12
                  w-full
                  rounded-2xl
                  border
                  border-border
                  bg-background
                  pl-12
                  pr-4
                  text-foreground
                  outline-none
                "
              />

            </div>

            <button
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                border
                border-border
                bg-card
                transition
                hover:bg-background
              "
            >
              <Filter size={18} />
            </button>

          </div>

        </section>
                {/* TASKS */}

        {filteredTasks.length === 0 ? (

          <section
            className="
              rounded-3xl
              border
              border-dashed
              border-border
              bg-[#111827]
              py-24
              text-center
            "
          >

            <h2 className="text-2xl font-semibold text-foreground">
              No Tasks Found
            </h2>

            <p className="mt-3 text-muted-foreground">
              Create your first task to get started.
            </p>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="
                mt-8
                inline-flex
                items-center
                gap-2
                rounded-2xl
                bg-indigo-600
                px-6
                py-3
                font-medium
                text-foreground
                transition
                hover:bg-indigo-500
              "
            >
              <Plus size={18} />

              Create First Task

            </button>

          </section>

        ) : (

          <section
            className="
              overflow-hidden
              rounded-3xl
              border
              border-border
              bg-[#111827]
            "
          >

            <TaskTable
              tasks={filteredTasks}
            />

          </section>

        )}

      </div>

    </>

  );

}