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
          className="
            w-full
            rounded-xl
            border
            border-border
            bg-card
            p-3
            text-foreground
            outline-none
            focus:border-primary
          "
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
            className="
              rounded-lg
              bg-primary
              px-4
              py-2
              text-sm
              text-primary-foreground
              transition
              hover:bg-primary/90
              disabled:pointer-events-none
              disabled:opacity-50
            "
          >
            Save
          </button>

          <button
            onClick={() =>
              setEditing(false)
            }
            className="
              rounded-lg
              border
              border-border
              px-4
              py-2
              text-sm
              text-foreground
            "
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
        className="
          text-xs
          text-primary
          transition
          hover:text-primary/80
        "
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
        className="
          text-xs
          text-destructive
          transition
          hover:text-destructive/80
          disabled:pointer-events-none
          disabled:opacity-50
        "
      >
        Delete
      </button>
    </div>
  );
}