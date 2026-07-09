"use client";

import { Paperclip, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { createAttachment } from "@/app/actions/attachment-actions";

type Props = {
  taskId: string;
  uploaderId: string;
};

export default function TaskUploadButton({
  taskId,
  uploaderId,
}: Props) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const router = useRouter();

  const [uploading, setUploading] =
    useState(false);

  async function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    try {
      /**
       * Temporary Local Upload
       *
       * Replace with UploadThing later.
       */

      const fakeUrl = URL.createObjectURL(file);

      await createAttachment({
        taskId,
        uploaderId,

        name: file.name,

        url: fakeUrl,

        mimeType: file.type,

        size: file.size,
      });

      router.refresh();
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <>
      <input
        hidden
        ref={inputRef}
        type="file"
        onChange={handleChange}
      />

      <button
        disabled={uploading}
        onClick={() =>
          inputRef.current?.click()
        }
        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:opacity-50"
      >
        {uploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Paperclip className="h-4 w-4" />
        )}

        {uploading
          ? "Uploading..."
          : "Upload"}

      </button>
    </>
  );
}