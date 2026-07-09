"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Priority } from "@prisma/client";

import { updateTaskPriority } from "@/app/actions/update-task";

type Props = {
  taskId: string;
  value: Priority | string;
};

export default function TaskPrioritySelect({
  taskId,
  value,
}: Props) {
  const router = useRouter();

  const [pending, startTransition] =
    useTransition();

  return (
    <select
      disabled={pending}
      value={value}
      onClick={(e) =>
        e.stopPropagation()
      }
      onChange={(e) =>
        startTransition(async () => {
          await updateTaskPriority(
            taskId,
            e.target.value as Priority
          );

          router.refresh();
        })
      }
      className="h-8 rounded-lg border border-white/10 bg-slate-900 px-2 text-xs text-white outline-none"
    >
      {Object.values(Priority).map(
        (priority) => (
          <option
            key={priority}
            value={priority}
          >
            {priority}
          </option>
        )
      )}
    </select>
  );
}