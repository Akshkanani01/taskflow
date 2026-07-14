"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { deleteComment } from "@/app/actions/comment-actions";

type Props = {
  id: string;
  name: string;
  image?: string | null;
  content: string;
  createdAt: string;
};

export default function CommentItem({
  id,
  name,
  image,
  content,
  createdAt,
}: Props) {
  const router = useRouter();

  const [pending, startTransition] =
    useTransition();

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950 p-5">

      <div className="mb-3 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Image
  src={
    image?.trim()
      ? image
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "User")}`
  }
  alt={name}
  width={40}
  height={40}
  className="h-10 w-10 rounded-full object-cover"
/>

          <div>

            <p className="font-medium text-white">
              {name}
            </p>

            <p className="text-xs text-slate-500">
              {createdAt}
            </p>

          </div>

        </div>

        <button
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              await deleteComment(id);

              router.refresh();
            })
          }
          className="rounded-lg p-2 text-red-400 hover:bg-red-500/10"
        >
          <Trash2 className="h-4 w-4" />
        </button>

      </div>

      <p className="whitespace-pre-wrap text-slate-300">
        {content}
      </p>

    </div>
  );
}