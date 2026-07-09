"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  updateComment,
  deleteComment,
} from "@/app/actions/comment-actions";

type Props = {
  id: string;
  content: string;
};

export default function CommentActions({
  id,
  content,
}: Props) {
  const router = useRouter();

  const [editing, setEditing] =
    useState(false);

  const [text, setText] =
    useState(content);

  const [pending, startTransition] =
    useTransition();

  if (editing) {
    return (
      <div className="space-y-3">

        <textarea
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          className="w-full rounded-xl border border-white/10 bg-slate-900 p-3 text-white"
        />

        <div className="flex gap-3">

          <button
            disabled={pending}
            onClick={() =>
              startTransition(async () => {
                await updateComment(
                  id,
                  text
                );

                setEditing(false);

                router.refresh();
              })
            }
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white"
          >
            Save
          </button>

          <button
            onClick={() =>
              setEditing(false)
            }
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white"
          >
            Cancel
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="flex gap-4">

      <button
        onClick={() =>
          setEditing(true)
        }
        className="text-xs text-indigo-400 hover:text-indigo-300"
      >
        Edit
      </button>

      <button
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            await deleteComment(id);

            router.refresh();
          })
        }
        className="text-xs text-red-400 hover:text-red-300"
      >
        Delete
      </button>

    </div>
  );
}