"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Calendar,
  Clock3,
  Flag,
  Users,
  Plus,
} from "lucide-react";

import { createTask } from "./actions";
import {
  Priority,
  TaskStatus,
} from "@prisma/client";
type Member = {
  id: string;
  name: string;
  email: string;
};

type Props = {
  listId: string;
  spaceId: string;
  createdById: string;
  members: Member[];
  onSuccess?: () => void;
};

export default function CreateTaskForm({
  listId,
  spaceId,
  createdById,
  members,
  onSuccess,
}: Props) {

  const router =
    useRouter();
      const [title, setTitle] =
    useState("");
const [memberSearch, setMemberSearch] =
  useState("");
const filteredMembers =
  members.filter((member) => {

    const value =
      (
        member.name +
        " " +
        member.email
      ).toLowerCase();

    return value.includes(
      memberSearch.toLowerCase()
    );

  });

  const [
    description,
    setDescription,
  ] = useState("");

  const [priority, setPriority] =
    useState("MEDIUM");

  const [status, setStatus] =
    useState("TODO");

  const [dueDate, setDueDate] =
    useState("");

  const [
    estimatedHours,
    setEstimatedHours,
  ] = useState("");

  const [
    assignees,
    setAssignees,
  ] = useState<string[]>([]);

  const [loading, setLoading] =
    useState(false);
      async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    if (!title.trim()) return;

    try {

      setLoading(true);

      await createTask({

        title:
          title.trim(),

        description:
          description.trim(),

        projectId:
          listId,

        // createdById is not a valid property for createTask; removed to match the expected input

       priority: priority as Priority,

status: status as TaskStatus,

        dueDate:
          dueDate
            ? new Date(dueDate)
            : undefined,

        estimatedHours:
          estimatedHours
            ? Number(
                estimatedHours
              )
            : undefined,

        assignees,

      });

      onSuccess?.();

      router.refresh();

    } finally {

      setLoading(false);

    }

  }
    return (

    <form

      onSubmit={handleSubmit}

      className="space-y-8"

    >

      <div>

        <h2 className="text-3xl font-bold text-white">

          Create Task

        </h2>

        <p className="mt-2 text-slate-400">

          Create a new task for this project.

        </p>

      </div>
            {/* TITLE */}

      <div className="space-y-2">

        <label className="text-sm font-medium text-slate-300">
          Task Title
        </label>

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Enter task title..."
          className="
            h-12
            w-full
            rounded-2xl
            border
            border-white/10
            bg-slate-950
            px-4
            text-white
            outline-none
            transition
            focus:border-indigo-500
          "
        />

      </div>

      {/* DESCRIPTION */}

      <div className="space-y-2">

        <label className="text-sm font-medium text-slate-300">
          Description
        </label>

        <textarea
          rows={5}
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          placeholder="Describe this task..."
          className="
            w-full
            rounded-2xl
            border
            border-white/10
            bg-slate-950
            p-4
            text-white
            outline-none
            transition
            focus:border-indigo-500
          "
        />

      </div>
            <div className="grid gap-6 md:grid-cols-2">

        {/* PRIORITY */}

        <div className="space-y-2">

          <label className="flex items-center gap-2 text-sm font-medium text-slate-300">

            <Flag size={16} />

            Priority

          </label>

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value
              )
            }
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-white/10
              bg-slate-950
              px-4
              text-white
            "
          >

            <option value="LOW">
              Low
            </option>

            <option value="MEDIUM">
              Medium
            </option>

            <option value="HIGH">
              High
            </option>

            <option value="URGENT">
              Urgent
            </option>

          </select>

        </div>

        {/* STATUS */}

        <div className="space-y-2">

          <label className="text-sm font-medium text-slate-300">

            Status

          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-white/10
              bg-slate-950
              px-4
              text-white
            "
          >

            <option value="TODO">
              Todo
            </option>

            <option value="IN_PROGRESS">
              In Progress
            </option>

            <option value="IN_REVIEW">
              In Review
            </option>

            <option value="DONE">
              Done
            </option>

          </select>

        </div>

      </div>
            <div className="grid gap-6 md:grid-cols-2">

        {/* DUE DATE */}

        <div className="space-y-2">

          <label className="flex items-center gap-2 text-sm font-medium text-slate-300">

            <Calendar size={16} />

            Due Date

          </label>

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-white/10
              bg-slate-950
              px-4
              text-white
              outline-none
              transition
              focus:border-indigo-500
            "
          />

        </div>

        {/* ESTIMATE */}

        <div className="space-y-2">

          <label className="flex items-center gap-2 text-sm font-medium text-slate-300">

            <Clock3 size={16} />

            Estimated Hours

          </label>

          <input
            type="number"
            min={0}
            value={estimatedHours}
            onChange={(e) =>
              setEstimatedHours(
                e.target.value
              )
            }
            placeholder="8"
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-white/10
              bg-slate-950
              px-4
              text-white
              outline-none
              transition
              focus:border-indigo-500
            "
          />

        </div>

      </div>

      {/* ASSIGNEES */}

<div className="space-y-4">

  <div className="flex items-center justify-between">

    <label className="flex items-center gap-2 text-sm font-medium text-slate-300">

      <Users size={16} />

      Assign Members

    </label>

    <span className="text-xs text-slate-500">

      {assignees.length} Selected

    </span>

  </div>

  <input
    value={memberSearch}
    onChange={(e) =>
      setMemberSearch(e.target.value)
    }
    placeholder="Search member..."
    className="
      h-11
      w-full
      rounded-xl
      border
      border-white/10
      bg-slate-950
      px-4
      text-white
    "
  />

  <div
    className="
      max-h-64
      overflow-y-auto
      rounded-2xl
      border
      border-white/10
      bg-slate-950
      divide-y
      divide-white/5
    "
  >
{filteredMembers.map((member) => {

  const checked =
    assignees.includes(member.id);

  return (

    <label

      key={member.id}

      className="
        flex
        cursor-pointer
        items-center
        justify-between
        px-4
        py-3
        hover:bg-slate-900
      "

    >

      <div className="flex items-center gap-3">

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-indigo-600
            font-semibold
            text-white
          "
        >

          {(member.name.trim() ||
            member.email)
            .charAt(0)
            .toUpperCase()}

        </div>

        <div>

          <p className="text-sm text-white">

            {member.name.trim() ||
              member.email}

          </p>

          <p className="text-xs text-slate-500">

            {member.email}

          </p>

        </div>

      </div>

      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {

          if (e.target.checked) {

            setAssignees([
              ...assignees,
              member.id,
            ]);

          } else {

            setAssignees(
              assignees.filter(
                (id) =>
                  id !== member.id
              )
            );

          }

        }}
        className="
          h-4
          w-4
          accent-indigo-600
        "
      />

    </label>

  );

})}
</div>
</div>
            {/* ACTIONS */}

      <div
        className="
          flex
          items-center
          justify-end
          gap-4
          border-t
          border-white/10
          pt-8
        "
      >

        <button
          type="button"
          onClick={() => onSuccess?.()}
          className="
            rounded-2xl
            border
            border-white/10
            px-6
            py-3
            font-medium
            text-slate-300
            transition
            hover:bg-slate-800
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            loading ||
            !title.trim()
          }
          className="
            flex
            items-center
            gap-2
            rounded-2xl
            bg-indigo-600
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-indigo-500
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <Plus size={18} />

          {loading
            ? "Creating..."
            : "Create Task"}

        </button>

      </div>

    </form>

  );

}