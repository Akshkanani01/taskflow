"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { TaskStatus } from "@prisma/client";

import { updateTaskStatus } from "@/app/actions/update-task";

type Props = {
  taskId: string;
  value: TaskStatus | string;
};

export default function TaskStatusSelect({
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
          await updateTaskStatus(
            taskId,
            e.target.value as TaskStatus
          );

          router.refresh();
        })
      }
      className="h-8 rounded-lg border border-white/10 bg-slate-900 px-2 text-xs text-white outline-none"
    >
      {Object.values(TaskStatus).map(
        (status) => (
          <option
            key={status}
            value={status}
          >
            {status.replaceAll("_", " ")}
          </option>
        )
      )}
    </select>
  );
}