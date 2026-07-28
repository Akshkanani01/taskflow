"use client";

import {
  useState,
  useTransition,
} from "react";

import {
  Clock3,
  Check,
} from "lucide-react";

import { updateTaskEstimate } from "@/app/dashboard/spaces/[id]/lists/[listId]/actions";

type Props = {
  taskId: string;
  value: number | null;
};

export default function EstimateEditor({
  taskId,
  value,
}: Props) {
  const [
    pending,
    startTransition,
  ] = useTransition();

  const [
    estimate,
    setEstimate,
  ] = useState(
    value?.toString() ?? ""
  );

  function save(
    next: string
  ) {
    setEstimate(next);

    startTransition(async () => {
      await updateTaskEstimate(
        taskId,
        next
          ? Number(next)
          : null
      );
    });
  }

  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Estimate (Hours)
      </label>

      <div className="relative">
        <Clock3
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <input
          type="number"
          min={0}
          value={estimate}
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
            border-border
            bg-card
            pl-10
            pr-4
            text-foreground
            outline-none
            focus:border-primary
          "
        />
      </div>

      {pending && (
        <div className="mt-2 flex items-center gap-2 text-xs text-primary">
          <Check size={14} />
          Updating...
        </div>
      )}
    </div>
  );
}