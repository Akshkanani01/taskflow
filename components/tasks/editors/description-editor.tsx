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
          <h2 className="text-lg font-semibold text-foreground">
            Description
          </h2>

          <button
            onClick={() =>
              setEditing(true)
            }
            className="
              rounded-lg
              p-2
              text-muted-foreground
              opacity-0
              transition
              hover:bg-background
              hover:text-foreground
              group-hover:opacity-100
            "
          >
            <Pencil size={16} />
          </button>
        </div>

        <p className="whitespace-pre-wrap leading-7 text-foreground">
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
          border-border
          bg-background
          p-5
          text-foreground
          outline-none
          focus:border-primary
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
            bg-primary
            px-5
            py-2
            text-primary-foreground
            transition
            hover:bg-primary/90
            disabled:pointer-events-none
            disabled:opacity-50
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
            bg-muted
            px-5
            py-2
            text-foreground
          "
        >
          <X size={16} />
          Cancel
        </button>
      </div>
    </div>
  );
}