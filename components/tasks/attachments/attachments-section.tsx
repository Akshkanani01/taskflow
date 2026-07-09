"use client";

import AttachmentCard from "./attachment-card";

type Attachment = {
  id: string;
  name: string;
  url: string;
  mimeType: string | null;
  size: number | null;
};

type Props = {
  attachments: Attachment[];
};

export default function AttachmentsSection({
  attachments,
}: Props) {
  if (attachments.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950 py-12 text-center">
        <p className="text-slate-500">
          No attachments yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {attachments.map((attachment) => (
        <AttachmentCard
          key={attachment.id}
          attachment={attachment}
        />
      ))}
    </div>
  );
}