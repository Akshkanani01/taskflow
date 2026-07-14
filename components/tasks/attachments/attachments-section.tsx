"use client";

import AttachmentCard from "./attachment-card";
import AttachmentUpload from "./attachment-upload";

type Attachment = {
  id: string;
  name: string;
  url: string;
  mimeType: string | null;
  size: number | null;
};

type Props = {
  taskId: string;
  attachments: Attachment[];
};

export default function AttachmentsSection({
  taskId,
  attachments,
}: Props) {
  return (
    <div className="space-y-6">

      {/* Upload */}

      <AttachmentUpload
        taskId={taskId}
      />

      {/* Files */}

      {attachments.length === 0 ? (

        <div
          className="
            rounded-2xl
            border
            border-dashed
            border-white/10
            bg-slate-950
            py-16
          "
        >

          <div className="mx-auto max-w-sm text-center">

            <div
              className="
                mx-auto
                mb-5
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-slate-800
              "
            >

              📎

            </div>

            <h3 className="text-lg font-semibold text-white">

              No attachments

            </h3>

            <p className="mt-2 text-sm text-slate-500">

              Upload images, documents,
              videos or PDFs.

            </p>

          </div>

        </div>

      ) : (

        <div
          className="
            grid
            gap-5
            md:grid-cols-2
            xl:grid-cols-3
          "
        >

          {attachments.map(
            (attachment) => (

              <AttachmentCard
                key={attachment.id}
                attachment={attachment}
              />

            )
          )}

        </div>

      )}

    </div>
  );
}