"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Download,
  ExternalLink,
  File,
  FileArchive,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileVideo,
  Trash2,
} from "lucide-react";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import DeleteDialog from "@/components/shared/delete-dialog";
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

  const [open, setOpen] =
    useState(false);

  const mime =
    attachment.mimeType ?? "";

  const isImage =
    mime.startsWith("image");

  function FileIcon() {

    if (
      mime.includes("pdf")
    ) {
      return (
        <FileText
          size={60}
          className="text-red-400"
        />
      );
    }

    if (
      mime.includes("sheet") ||
      mime.includes("excel")
    ) {
      return (
        <FileSpreadsheet
          size={60}
          className="text-green-400"
        />
      );
    }

    if (
      mime.includes("video")
    ) {
      return (
        <FileVideo
          size={60}
          className="text-indigo-400"
        />
      );
    }

    if (
      mime.includes("zip")
    ) {
      return (
        <FileArchive
          size={60}
          className="text-yellow-400"
        />
      );
    }

    if (
      mime.includes("image")
    ) {
      return (
        <FileImage
          size={60}
          className="text-blue-400"
        />
      );
    }

    return (
      <File
        size={60}
        className="text-slate-500"
      />
    );
  }
    return (
    <>
      <div
        className="
          group
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-[#111827]
          transition-all
          duration-300
          hover:border-indigo-500/30
          hover:shadow-xl
          hover:shadow-indigo-500/10
        "
      >
        {/* Preview */}

        <div className="relative flex h-48 items-center justify-center bg-[#0B1220]">

          {isImage ? (

            <Image
              src={attachment.url}
              alt={attachment.name}
              fill
              className="object-cover"
            />

          ) : (

            <FileIcon />

          )}

        </div>

        {/* Body */}

        <div className="space-y-4 p-5">

          <div>

            <h3 className="truncate text-sm font-semibold text-white">

              {attachment.name}

            </h3>

            <p className="mt-1 text-xs text-slate-500">

              {attachment.size
                ? `${(
                    attachment.size /
                    1024
                  ).toFixed(1)} KB`
                : "--"}

            </p>

          </div>

          <div className="flex items-center gap-2">

            <Link
              href={attachment.url}
              target="_blank"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                transition
                hover:bg-slate-800
              "
            >

              <ExternalLink
                size={18}
              />

            </Link>

            <a
              href={attachment.url}
              download
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                transition
                hover:bg-slate-800
              "
            >

              <Download
                size={18}
              />

            </a>

            <button
              type="button"
              disabled={pending}
              onClick={() =>
                setOpen(true)
              }
              className="
                ml-auto
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-red-500/20
                text-red-400
                transition
                hover:bg-red-500/10
              "
            >

              <Trash2
                size={18}
              />

            </button>

          </div>

        </div>

      </div>
            <DeleteDialog
        open={open}
        onOpenChange={setOpen}
        loading={pending}
        title="Delete Attachment?"
        description="This file will be permanently removed from this task."

        onConfirm={() =>
          start(async () => {

            try {

              await deleteAttachment(
                attachment.id
              );

              toast.success(
                "Attachment deleted."
              );

              setOpen(false);

              router.refresh();

            } catch {

              toast.error(
                "Unable to delete attachment."
              );

            }

          })
        }
      />
    </>
  );
}