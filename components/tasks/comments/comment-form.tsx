"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Send } from "lucide-react";

import { createComment } from "@/app/actions/comment-actions";

type Props = {
  taskId: string;
};

export default function CommentForm({
  taskId,
}: Props) {
  const router = useRouter();

  const [text, setText] =
    useState("");

  const [pending, startTransition] =
    useTransition();

  function submit() {
    if (!text.trim()) return;

    startTransition(async () => {
      await createComment({
        taskId,
        content: text,
      });

      setText("");

      router.refresh();
    });
  }

  return (
    <div className="space-y-3">
      <textarea
        rows={3}
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        placeholder="Write a comment..."
        className="
          w-full
          rounded-xl
          border
          border-border
          bg-background
          p-4
          text-foreground
          outline-none
          focus:border-primary
        "
      />

      <div className="flex justify-end">
        <button
          disabled={pending}
          onClick={submit}
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
          <Send className="h-4 w-4" />

          {pending
            ? "Posting..."
            : "Comment"}
        </button>
      </div>
    </div>
  );
}