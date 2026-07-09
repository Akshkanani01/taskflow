"use client";

import {
  File,
  Calendar,
  Download,
} from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
}

interface Props {
  member: {
    name: string | null;
  };

  files: FileItem[];
}

export default function MemberFiles({
  member,
  files,
}: Props) {
  return (
    <div className="mx-auto max-w-7xl">

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-white">
          Files
        </h1>

        <p className="mt-2 text-zinc-500">
          Files uploaded by {member.name}.
        </p>

      </div>

      <div className="overflow-hidden rounded-[28px] border border-zinc-800 bg-[#121A26]">

        <div className="grid grid-cols-[2fr_120px_120px_180px_80px] border-b border-zinc-800 bg-[#161F2D] px-6 py-4 text-sm font-semibold text-zinc-400">

          <div>Name</div>
          <div>Type</div>
          <div>Size</div>
          <div>Uploaded</div>
          <div />

        </div>

        {files.map((file) => (

          <div
            key={file.id}
            className="
              grid
              grid-cols-[2fr_120px_120px_180px_80px]
              items-center
              border-b
              border-zinc-800
              px-6
              py-5
              hover:bg-[#1B2432]
            "
          >

            <div className="flex items-center gap-3">

              <File
                size={20}
                className="text-blue-400"
              />

              <span className="font-medium text-white">
                {file.name}
              </span>

            </div>

            <span className="text-zinc-400">
              {file.type}
            </span>

            <span className="text-zinc-400">
              {file.size}
            </span>

            <div className="flex items-center gap-2 text-zinc-400">

              <Calendar size={16} />

              {file.uploadedAt}

            </div>

            <button
              className="
                flex
                justify-center
                rounded-xl
                border
                border-zinc-700
                p-2
                hover:bg-zinc-800
              "
            >
              <Download size={18} />
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}