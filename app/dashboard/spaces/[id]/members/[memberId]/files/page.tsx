import Link from "next/link";
import { notFound } from "next/navigation";

import {
  FileText,
  Image as ImageIcon,
  Download,
  HardDrive,
  FolderOpen,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
    memberId: string;
  }>;
}

function formatBytes(bytes: number) {

  if (bytes === 0) {
    return "0 B";
  }

  const k = 1024;

  const sizes = [
    "B",
    "KB",
    "MB",
    "GB",
  ];

  const i = Math.floor(
    Math.log(bytes) / Math.log(k)
  );

  return (
    parseFloat(
      (bytes / Math.pow(k, i)).toFixed(2)
    ) +
    " " +
    sizes[i]
  );

}

export default async function MemberFilesPage({
  params,
}: Props) {

  const {
    id: spaceId,
    memberId,
  } = await params;

  const member =
    await prisma.spaceMember.findFirst({

      where: {

        spaceId,

        userId: memberId,

      },

      include: {

        user: true,

      },

    });

  if (!member) {

    notFound();

  }

  const attachments =
    await prisma.taskAttachment.findMany({

      where: {

        uploaderId: memberId,

        task: {

          spaceId,

        },

      },

      include: {

        task: {

          include: {

            project: true,

          },

        },

      },

      orderBy: {

        createdAt: "desc",

      },

    });

  const totalFiles =
    attachments.length;

  const totalStorage =
    attachments.reduce(

      (sum, file) =>
        sum + (file.size ?? 0),

      0

    );

  const imageCount =
    attachments.filter(

      (file) =>
        file.mimeType?.startsWith(
          "image/"
        )

    ).length;

  const documentCount =
    totalFiles - imageCount;

  return (

    <div className="space-y-8">

      {/* STATS */}

      <div className="grid gap-6 md:grid-cols-4">

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <FolderOpen className="mb-4 h-8 w-8 text-indigo-400" />

          <p className="text-sm text-slate-400">

            Files

          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">

            {totalFiles}

          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <ImageIcon className="mb-4 h-8 w-8 text-emerald-400" />

          <p className="text-sm text-slate-400">

            Images

          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">

            {imageCount}

          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <FileText className="mb-4 h-8 w-8 text-cyan-400" />

          <p className="text-sm text-slate-400">

            Documents

          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">

            {documentCount}

          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <HardDrive className="mb-4 h-8 w-8 text-yellow-400" />

          <p className="text-sm text-slate-400">

            Storage

          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">

            {formatBytes(totalStorage)}

          </h2>

        </div>

      </div>
            {/* FILES */}

      <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#111827]">

        <div className="flex items-center justify-between border-b border-white/10 p-6">

          <div>

            <h2 className="text-xl font-semibold text-white">

              Uploaded Files

            </h2>

            <p className="mt-1 text-sm text-slate-400">

              Files uploaded by {member.user.name ?? member.user.email}

            </p>

          </div>

          <div className="rounded-xl border border-white/10 bg-slate-900 px-4 py-2 text-sm text-slate-300">

            {totalFiles} Files

          </div>

        </div>

        {attachments.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-24">

            <FolderOpen className="mb-5 h-16 w-16 text-slate-700" />

            <h3 className="text-xl font-semibold text-white">

              No Files Uploaded

            </h3>

            <p className="mt-2 text-slate-500">

              This member hasn&apos;t uploaded any files yet.

            </p>

          </div>

        ) : (

          <div className="divide-y divide-white/5">

            {attachments.map((file) => {

              const isImage =
                file.mimeType?.startsWith(
                  "image/"
                );

              return (

                <div
                  key={file.id}
                  className="flex items-center justify-between gap-6 p-6 transition hover:bg-slate-900/40"
                >

                  {/* LEFT */}

                  <div className="flex min-w-0 flex-1 items-center gap-5">

                    {isImage ? (

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15">

                        <ImageIcon className="h-7 w-7 text-emerald-400" />

                      </div>

                    ) : (

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15">

                        <FileText className="h-7 w-7 text-indigo-400" />

                      </div>

                    )}

                    <div className="min-w-0 flex-1">

                      <h3 className="truncate text-lg font-semibold text-white">

                        {file.name}

                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-5 text-sm text-slate-400">

                        <span>

                          {formatBytes(file.size ?? 0)}

                        </span>

                        <span>

                          {file.createdAt.toLocaleDateString(
                            "en-GB"
                          )}

                        </span>

                        <span>

                          {file.task.project.name}

                        </span>

                      </div>

                    </div>

                  </div>

                  {/* RIGHT */}

                  <div className="flex items-center gap-4">

                    <span
                      className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        ${
                          isImage
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-indigo-500/20 text-indigo-300"
                        }
                      `}
                    >

                      {isImage
                        ? "IMAGE"
                        : "DOCUMENT"}

                    </span>

                    <Link
                      href={`/dashboard/spaces/${file.task.spaceId}/lists/${file.task.projectId}/tasks/${file.task.id}`}
                      className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white transition hover:bg-slate-800"
                    >

                      View Task

                    </Link>

                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-indigo-600 p-3 text-white transition hover:bg-indigo-500"
                    >

                      <Download className="h-5 w-5" />

                    </a>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </section>
            {/* STORAGE ANALYTICS */}

      <div className="grid gap-6 xl:grid-cols-2">

        {/* Storage */}

        <section className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <div className="flex items-center justify-between">

            <h2 className="text-lg font-semibold text-white">

              Storage Usage

            </h2>

            <span className="text-2xl font-bold text-indigo-400">

              {formatBytes(totalStorage)}

            </span>

          </div>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">

            <div
              className="h-full rounded-full bg-indigo-500 transition-all duration-500"
              style={{
                width: `${
                  Math.min(
                    totalStorage /
                      (50 * 1024 * 1024) *
                      100,
                    100
                  )
                }%`,
              }}
            />

          </div>

          <p className="mt-4 text-sm text-slate-400">

            Based on a 50 MB workspace quota.

          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">

              <p className="text-xs uppercase tracking-wider text-slate-500">

                Images

              </p>

              <p className="mt-2 text-3xl font-bold text-emerald-400">

                {imageCount}

              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">

              <p className="text-xs uppercase tracking-wider text-slate-500">

                Documents

              </p>

              <p className="mt-2 text-3xl font-bold text-cyan-400">

                {documentCount}

              </p>

            </div>

          </div>

        </section>

        {/* Summary */}

        <section className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <h2 className="text-lg font-semibold text-white">

            Upload Summary

          </h2>

          <div className="mt-6 space-y-4">

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900 p-4">

              <span className="text-slate-400">

                Total Files

              </span>

              <span className="font-semibold text-white">

                {totalFiles}

              </span>

            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900 p-4">

              <span className="text-slate-400">

                Images

              </span>

              <span className="font-semibold text-emerald-400">

                {imageCount}

              </span>

            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900 p-4">

              <span className="text-slate-400">

                Documents

              </span>

              <span className="font-semibold text-cyan-400">

                {documentCount}

              </span>

            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900 p-4">

              <span className="text-slate-400">

                Total Storage

              </span>

              <span className="font-semibold text-indigo-400">

                {formatBytes(totalStorage)}

              </span>

            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900 p-4">

              <span className="text-slate-400">

                Latest Upload

              </span>

              <span className="font-semibold text-white">

                {attachments.length
                  ? attachments[0].createdAt.toLocaleDateString(
                      "en-GB"
                    )
                  : "-"}

              </span>

            </div>

          </div>

        </section>

      </div>

    </div>

  );

}