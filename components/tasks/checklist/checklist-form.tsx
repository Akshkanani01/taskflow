"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { createChecklist } from "@/app/actions/checklist-actions";

type Props = {
  taskId: string;
};

export default function ChecklistForm({
  taskId,
}: Props) {
  const router = useRouter();

  const [title, setTitle] =
    useState("");

  const [pending, start] =
    useTransition();

  function submit() {
    if (!title.trim()) return;

    start(async () => {
      await createChecklist(
        taskId,
        title
      );

      setTitle("");

      router.refresh();
    });
  }

  return (
    <div className="flex gap-3">
      <input
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        placeholder="New checklist item..."
        className="
          h-11
          flex-1
          rounded-xl
          border
          border-border
          bg-background
          px-4
          text-foreground
          outline-none
          transition
          focus:border-primary
        "
      />

      <button
        type="button"
        disabled={pending}
        onClick={submit}
        className="
          flex
          h-11
          items-center
          gap-2
          rounded-xl
          bg-primary
          px-5
          text-primary-foreground
          transition
          hover:bg-primary/90
          disabled:pointer-events-none
          disabled:opacity-50
        "
      >
        <Plus className="h-4 w-4" />

        Add
      </button>
    </div>
  );
}