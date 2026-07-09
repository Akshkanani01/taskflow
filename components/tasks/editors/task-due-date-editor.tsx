"use client";

import {
  useState,
  useTransition,
} from "react";

import {
  Calendar,
  Check,
} from "lucide-react";

import { updateTaskDueDate } from "@/app/dashboard/spaces/[id]/lists/[listId]/actions";

type Props = {
  taskId: string;
  value: Date | null;
};

export default function TaskDueDateEditor({
  taskId,
  value,
}: Props) {

  const [
    pending,
    startTransition,
  ] = useTransition();

  const [date, setDate] =
    useState(
      value
        ? new Date(value)
            .toISOString()
            .slice(0, 10)
        : ""
    );

  function save(
    next: string
  ) {

    setDate(next);

    startTransition(async () => {

      await updateTaskDueDate(
        taskId,
        next
          ? new Date(next)
          : null
      );

    });

  }

  return (

    <div>

      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">

        Due Date

      </label>

      <div className="relative">

        <Calendar
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          type="date"
          value={date}
          disabled={pending}
          onChange={(e) =>
            save(
              e.target.value
            )
          }
          className="
            h-11
            w-full
            rounded-xl
            border
            border-white/10
            bg-slate-900
            pl-10
            pr-4
            text-white
            outline-none
            focus:border-indigo-500
          "
        />

      </div>

      {pending && (

        <div className="mt-2 flex items-center gap-2 text-xs text-emerald-400">

          <Check size={14} />

          Updating...

        </div>

      )}

    </div>

  );

}