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
    <div className="group flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950 px-4 py-3">

      <div className="flex items-center gap-3 flex-1">

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
          className="h-4 w-4 rounded"
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
            className="h-10 flex-1 rounded-lg border border-white/10 bg-slate-900 px-3 text-white outline-none"
          />

        ) : (

          <span
            className={`flex-1 ${
              item.completed
                ? "text-slate-500 line-through"
                : "text-white"
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
              disabled={pending}
              onClick={save}
              className="rounded-lg p-2 text-emerald-400 hover:bg-emerald-500/10"
            >
              <Check
                size={16}
              />
            </button>

            <button
              onClick={() => {
                setEditing(false);

                setTitle(
                  item.title
                );
              }}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() =>
                setEditing(true)
              }
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800"
            >
              <Pencil
                size={16}
              />
            </button>

            <button
              disabled={pending}
              onClick={remove}
              className="rounded-lg p-2 text-red-400 hover:bg-red-500/10"
            >
              <Trash2
                size={16}
              />
            </button>
          </>
        )}

      </div>

    </div>
  );
}