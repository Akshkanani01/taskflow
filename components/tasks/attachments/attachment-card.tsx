"use client";

import {
  Download,
  ExternalLink,
  File,
  ImageIcon,
  Trash2,
} from "lucide-react";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { deleteAttachment } from "@/app/actions/attachment-actions";

type Props = {
  attachment: {
    id: string;
    name: string;
    url: string;
    mimeType: string | null;
    size: number | null;
  };
};

export default function AttachmentCard({
  attachment,
}: Props) {
  const router = useRouter();

  const [pending, start] =
    useTransition();

  const isImage =
    attachment.mimeType?.startsWith("image");

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900">

      {/* Preview */}

      <div className="flex h-40 items-center justify-center bg-slate-950">

        {isImage ? (

          <img
            src={attachment.url}
            alt={attachment.name}
            className="h-full w-full object-cover"
          />

        ) : (

          <File
            size={54}
            className="text-slate-500"
          />

        )}

      </div>

      {/* Body */}

      <div className="space-y-4 p-4">

        <div>

          <h3 className="truncate font-medium text-white">
            {attachment.name}
          </h3>

          <p className="mt-1 text-xs text-slate-500">

            {attachment.size
              ? `${(
                  attachment.size /
                  1024
                ).toFixed(1)} KB`
              : "-"}

          </p>

        </div>

        <div className="flex items-center gap-2">

          <a
            href={attachment.url}
            target="_blank"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 hover:bg-slate-800"
          >
            <ExternalLink
              size={16}
            />
          </a>

          <a
            href={attachment.url}
            download
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 hover:bg-slate-800"
          >
            <Download
              size={16}
            />
          </a>

          <button
            disabled={pending}
            onClick={() =>
              start(async () => {
                await deleteAttachment(
                  attachment.id
                );

                router.refresh();
              })
            }
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10"
          >
            <Trash2
              size={16}
            />
          </button>

        </div>

      </div>

    </div>
  );
}