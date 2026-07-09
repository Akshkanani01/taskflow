"use client";

import { useState, useTransition } from "react";
import { Pencil, Check, X } from "lucide-react";
import { updateTaskTitle } from "@/app/dashboard/spaces/[id]/lists/[listId]/actions";

type Props = {
  taskId: string;
  title: string;
};

export default function TaskTitleEditor({
  taskId,
  title,
}: Props) {
  const [editing, setEditing] =
    useState(false);

  const [value, setValue] =
    useState(title);

  const [pending, startTransition] =
    useTransition();

  function save() {
    startTransition(async () => {
      await updateTaskTitle(
        taskId,
        value
      );

      setEditing(false);
    });
  }

  if (!editing) {
    return (
      <div className="group flex items-center justify-between">

        <h1 className="text-4xl font-bold text-white">
          {title}
        </h1>

        <button
          onClick={() =>
            setEditing(true)
          }
          className="
            rounded-xl
            p-2
            text-slate-400
            opacity-0
            transition
            hover:bg-slate-800
            hover:text-white
            group-hover:opacity-100
          "
        >
          <Pencil size={18} />
        </button>

      </div>
    );
  }

  return (
    <div className="space-y-4">

      <input
        autoFocus
        value={value}
        onChange={(e) =>
          setValue(
            e.target.value
          )
        }
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-slate-950
          p-4
          text-3xl
          font-bold
          text-white
          outline-none
          focus:border-indigo-500
        "
      />

      <div className="flex gap-3">

        <button
          disabled={pending}
          onClick={save}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-emerald-600
            px-4
            py-2
            text-white
          "
        >
          <Check size={16} />
          Save
        </button>

        <button
          onClick={() => {
            setValue(title);
            setEditing(false);
          }}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-slate-700
            px-4
            py-2
            text-white
          "
        >
          <X size={16} />
          Cancel
        </button>

      </div>

    </div>
  );
}