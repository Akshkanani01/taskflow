"use client";

import {
  useState,
  useTransition,
} from "react";

import {
  Pencil,
  Check,
  X,
} from "lucide-react";

import { updateTaskDescription } from "@/app/dashboard/spaces/[id]/lists/[listId]/actions";

type Props = {
  taskId: string;

  description: string;
};

export default function DescriptionEditor({
  taskId,
  description,
}: Props) {

  const [editing, setEditing] =
    useState(false);

  const [value, setValue] =
    useState(description);

  const [
    pending,
    startTransition,
  ] = useTransition();

  function save() {

    startTransition(async () => {

      await updateTaskDescription(
        taskId,
        value
      );

      setEditing(false);

    });

  }

  if (!editing) {

    return (

      <div className="group">

        <div className="mb-4 flex items-center justify-between">

          <h2 className="text-lg font-semibold text-white">

            Description

          </h2>

          <button
            onClick={() =>
              setEditing(true)
            }
            className="
              rounded-lg
              p-2
              text-slate-500
              opacity-0
              transition
              hover:bg-slate-800
              hover:text-white
              group-hover:opacity-100
            "
          >

            <Pencil size={16} />

          </button>

        </div>

        <p className="whitespace-pre-wrap leading-7 text-slate-300">

          {description ||
            "No description"}

        </p>

      </div>

    );

  }

  return (

    <div>

      <textarea
        rows={8}
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
          p-5
          text-white
          outline-none
          focus:border-indigo-500
        "
      />

      <div className="mt-5 flex gap-3">

        <button
          disabled={pending}
          onClick={save}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-emerald-600
            px-5
            py-2
            text-white
          "
        >

          <Check size={16} />

          Save

        </button>

        <button
          onClick={() => {

            setValue(description);

            setEditing(false);

          }}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-slate-700
            px-5
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