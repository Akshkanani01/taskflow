"use client";

import { useState } from "react";

import {
  Loader2,
  Paperclip,
  UploadCloud,
} from "lucide-react";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { UploadDropzone } from "@/lib/uploadthing";

interface Props {
  taskId: string;
}

export default function AttachmentUpload({
  taskId,
}: Props) {
  const router = useRouter();

  const [uploading, setUploading] =
    useState(false);

  return (
    <div
      className="
        rounded-2xl
        border
        border-dashed
        border-white/10
        bg-slate-950/70
        p-6
      "
    >
      <div className="mb-5 flex items-center gap-3">

        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-indigo-500/10
          "
        >
          <Paperclip
            size={20}
            className="text-indigo-400"
          />
        </div>

        <div>

          <h3 className="font-semibold text-white">
            Upload Attachments
          </h3>

          <p className="text-sm text-slate-400">
            Images, PDF, DOCX, ZIP, Videos
          </p>

        </div>

      </div>

      <UploadDropzone
        endpoint="attachmentUploader"

        appearance={{
          container:
            "w-full border-none bg-transparent",

          uploadIcon:
            "text-indigo-400",

          label:
            "text-white text-base font-medium",

          allowedContent:
            "text-slate-500 text-sm",

          button:
            "rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white",
        }}

        content={{
          label:
            "Drag files here or click to upload",

          allowedContent:
            "Maximum 20 files",
        }}

        onUploadBegin={() => {

          setUploading(true);

        }}
                onClientUploadComplete={async (files) => {

          try {

            if (!files.length) {

              toast.error(
                "Upload failed."
              );

              return;

            }

            for (const file of files) {

              await fetch(
                `/api/tasks/${taskId}/attachments`,
                {
                  method: "POST",

                  headers: {
                    "Content-Type":
                      "application/json",
                  },

                  body: JSON.stringify({
                    name: file.name,

                    url: file.ufsUrl,

                    size: file.size,

                    mimeType: file.type,

                    extension:
                      file.name.includes(".")
                        ? file.name
                            .split(".")
                            .pop()
                        : null,
                  }),
                }
              );

            }

            toast.success(
              `${files.length} attachment${
                files.length > 1
                  ? "s"
                  : ""
              } uploaded.`
            );

            router.refresh();

          } catch {

            toast.error(
              "Failed to save attachment."
            );

          } finally {

            setUploading(false);

          }

        }}

        onUploadError={(error) => {

          setUploading(false);

          toast.error(
            error.message
          );

        }}
      />

      {uploading && (

        <div
          className="
            mt-5
            flex
            items-center
            justify-center
            gap-3
            rounded-xl
            border
            border-indigo-500/20
            bg-indigo-500/10
            py-3
          "
        >

          <Loader2
            size={18}
            className="animate-spin text-indigo-400"
          />

          <span className="text-sm text-indigo-300">

            Uploading attachments...

          </span>

        </div>

      )}

    </div>
  );
}