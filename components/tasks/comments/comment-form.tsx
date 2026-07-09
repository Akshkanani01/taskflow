"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Send } from "lucide-react";

import { createComment } from "@/app/actions/comment-actions";

type Props = {
  taskId: string;
  userId: string;
};

export default function CommentForm({
  taskId,
  userId,
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
        userId,
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
        className="w-full rounded-xl border border-white/10 bg-slate-950 p-4 text-white outline-none"
      />

      <div className="flex justify-end">

        <button
          disabled={pending}
          onClick={submit}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-500"
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