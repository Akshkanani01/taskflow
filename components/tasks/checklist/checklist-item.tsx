"use client";

import {
  Check,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import {
  useState,
  useTransition,
} from "react";

import { useRouter } from "next/navigation";

import {
  toggleChecklist,
  updateChecklist,
  deleteChecklist,
} from "@/app/actions/checklist-actions";

type Props = {
  item: {
    id: string;
    title: string;
    completed: boolean;
  };
};

export default function ChecklistItem({
  item,
}: Props) {
  const router = useRouter();

  const [editing, setEditing] =
    useState(false);

  const [title, setTitle] =
    useState(item.title);

  const [pending, start] =
    useTransition();

  function save() {
    start(async () => {
      await updateChecklist(
        item.id,
        title
      );

      setEditing(false);

      router.refresh();
    });
  }

  function remove() {
    start(async () => {
      await deleteChecklist(item.id);

      router.refresh();
    });
  }

  return (
    <div className="group flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3">
      <div className="flex flex-1 items-center gap-3">
        <input
          type="checkbox"
          checked={item.completed}
          disabled={pending}
          onChange={() =>
            start(async () => {
              await toggleChecklist(
                item.id
              );

              router.refresh();
            })
          }
          className="
            h-4
            w-4
            rounded
            accent-primary
            disabled:pointer-events-none
            disabled:opacity-50
          "
        />

        {editing ? (
          <input
            autoFocus
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="
              h-10
              flex-1
              rounded-lg
              border
              border-border
              bg-card
              px-3
              text-foreground
              outline-none
              transition
              focus:border-primary
            "
          />
        ) : (
          <span
            className={`flex-1 ${
              item.completed
                ? "line-through text-muted-foreground"
                : "text-foreground"
            }`}
          >
            {item.title}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {editing ? (
          <>
            <button
              type="button"
              disabled={pending}
              onClick={save}
              className="
                rounded-lg
                p-2
                text-primary
                transition
                hover:bg-primary/10
                disabled:pointer-events-none
                disabled:opacity-50
              "
            >
              <Check size={16} />
            </button>

            <button
              type="button"
              onClick={() => {
                setEditing(false);

                setTitle(
                  item.title
                );
              }}
              className="
                rounded-lg
                p-2
                text-muted-foreground
                transition
                hover:bg-background
              "
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() =>
                setEditing(true)
              }
              className="
                rounded-lg
                p-2
                text-muted-foreground
                transition
                hover:bg-background
              "
            >
              <Pencil size={16} />
            </button>

            <button
              type="button"
              disabled={pending}
              onClick={remove}
              className="
                rounded-lg
                p-2
                text-destructive
                transition
                hover:bg-destructive/10
                disabled:pointer-events-none
                disabled:opacity-50
              "
            >
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}