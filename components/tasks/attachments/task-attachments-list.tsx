import Link from "next/link";
import {
  File,
  ImageIcon,
  FileText,
  Download,
} from "lucide-react";
import DeleteAttachmentButton from "./delete-attachment-button";
type Attachment = {
  id: string;
  name: string;
  url: string;
  mimeType: string | null;
  size: number | null;
  createdAt: Date;
};

type Props = {
  attachments: Attachment[];
};

function formatSize(size?: number | null) {
  if (!size) return "-";

  if (size < 1024)
    return `${size} B`;

  if (size < 1024 * 1024)
    return `${(size / 1024).toFixed(1)} KB`;

  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

export default function TaskAttachmentsList({
  attachments,
}: Props) {
  if (attachments.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-slate-500">
        No attachments yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">

      {attachments.map((file) => {

        const image =
          file.mimeType?.startsWith("image");

        const pdf =
          file.mimeType?.includes("pdf");

        return (

          <div
            key={file.id}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950 p-4"
          >

            <div className="flex items-center gap-4">

              {image ? (
                <ImageIcon className="text-indigo-400" />
              ) : pdf ? (
                <FileText className="text-red-400" />
              ) : (
                <File className="text-slate-400" />
              )}

              <div>

                <h4 className="text-sm font-medium text-white">
                  {file.name}
                </h4>

                <p className="text-xs text-slate-500">
                  {formatSize(file.size)}
                </p>

              </div>

            </div>

            <Link
              href={file.url}
              target="_blank"
              className="rounded-lg border border-white/10 p-2 text-slate-300 hover:bg-slate-800"
            >
              <Download size={16} />
            </Link>
                <DeleteAttachmentButton
    id={file.id}
  />
          </div>

        );

      })}

    </div>
  );
}