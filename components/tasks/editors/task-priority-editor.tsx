"use client";

import {
  useState,
  useTransition,
} from "react";
import type { Priority } from "@prisma/client";
import {
  ChevronDown,
  Check,
} from "lucide-react";

import { updateTaskPriority } from "@/app/dashboard/spaces/[id]/lists/[listId]/actions";

type Props = {
  taskId: string;
  value: string;
};

const PRIORITIES: Priority[] = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "URGENT",
];
export default function TaskPriorityEditor({
  taskId,
  value,
}: Props) {

  const [priority, setPriority] =
  useState<Priority>(
    value as Priority
  );

  const [
    pending,
    startTransition,
  ] = useTransition();

  function change(
  next: Priority
) {

    setPriority(next);

    startTransition(async () => {

      await updateTaskPriority(
  taskId,
  next
);

    });

  }

  return (

    <div>

      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">

        Priority

      </label>

      <div className="relative">

        <select
          value={priority}
          disabled={pending}
          onChange={(e) =>
            change(
              e.target.value as Priority
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

          {PRIORITIES.map((item) => (

            <option
              key={item}
              value={item}
            >
              {item}
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