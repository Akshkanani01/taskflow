"use client";

import {
  useState,
  useTransition,
} from "react";

import {
  Check,
  ChevronDown,
} from "lucide-react";

import { updateTaskStatus } from "@/app/dashboard/spaces/[id]/lists/[listId]/actions";

type Props = {
  taskId: string;
  value: string;
};

const STATUS = [
  "BACKLOG",
  "TODO",
  "IN_PROGRESS",
  "REVIEW",
  "TESTING",
  "DONE",
  "CANCELLED",
];

export default function TaskStatusEditor({
  taskId,
  value,
}: Props) {

  const [status, setStatus] =
    useState(value);

  const [
    pending,
    startTransition,
  ] = useTransition();

  function change(
    next: string
  ) {

    setStatus(next);

    startTransition(async () => {

      await updateTaskStatus(
        taskId,
        next as any
      );

    });

  }

  return (

    <div>

      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">

        Status

      </label>

      <div className="relative">

        <select
          value={status}
          disabled={pending}
          onChange={(e) =>
            change(
              e.target.value
            )
          }
          className="
            h-11
            w-full
            appearance-none
            rounded-xl
            border
            border-white/10
            bg-slate-900
            px-4
            text-white
            outline-none
            focus:border-indigo-500
          "
        >

          {STATUS.map((item) => (

            <option
              key={item}
              value={item}
            >
              {item.replaceAll(
                "_",
                " "
              )}
            </option>

          ))}

        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
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