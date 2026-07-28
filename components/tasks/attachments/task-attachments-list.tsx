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
      <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
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
            className="flex items-center justify-between rounded-xl border border-border bg-background p-4"
          >

            <div className="flex items-center gap-4">

              {image ? (
                <ImageIcon className="text-indigo-400" />
              ) : pdf ? (
                <FileText className="text-red-400" />
              ) : (
                <File className="text-muted-foreground" />
              )}

              <div>

                <h4 className="text-sm font-medium text-foreground">
                  {file.name}
                </h4>

                <p className="text-xs text-muted-foreground">
                  {formatSize(file.size)}
                </p>

              </div>

            </div>

            <Link
              href={file.url}
              target="_blank"
              className="rounded-lg border border-border p-2 text-foreground hover:bg-background"
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