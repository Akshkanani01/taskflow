import Link from "next/link";
import { notFound } from "next/navigation";

import {
  Activity,
  MessageSquare,
  CheckSquare,
  Paperclip,
  ArrowRight,
  Calendar,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
    memberId: string;
  }>;
}

export default async function MemberActivityPage({
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

  const activities =
    await prisma.taskActivity.findMany({

      where: {

        OR: [

          {

            userId: memberId,

          },

          {

            task: {

              taskAssignees: {

                some: {

                  userId: memberId,

                },

              },

            },

          },

        ],

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

      take: 100,

    });

  const comments =
    await prisma.taskComment.count({

      where: {

        userId: memberId,

      },

    });

  const uploads =
    await prisma.taskAttachment.count({

      where: {

        uploaderId: memberId,

      },

    });

  const totalActivities =
    activities.length;

  return (

    <div className="space-y-8">

      {/* STATS */}

      <div className="grid gap-6 md:grid-cols-4">

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <Activity className="mb-4 h-8 w-8 text-indigo-400" />

          <p className="text-sm text-slate-400">

            Activities

          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">

            {totalActivities}

          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <MessageSquare className="mb-4 h-8 w-8 text-emerald-400" />

          <p className="text-sm text-slate-400">

            Comments

          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">

            {comments}

          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <Paperclip className="mb-4 h-8 w-8 text-cyan-400" />

          <p className="text-sm text-slate-400">

            Uploads

          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">

            {uploads}

          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <CheckSquare className="mb-4 h-8 w-8 text-yellow-400" />

          <p className="text-sm text-slate-400">

            Tasks

          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">

            {
              new Set(
                activities.map(
                  (a) => a.taskId
                )
              ).size
            }

          </h2>

        </div>

      </div>
            {/* TIMELINE */}

      <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#111827]">

        <div className="border-b border-white/10 p-6">

          <h2 className="text-xl font-semibold text-white">

            Activity Timeline

          </h2>

          <p className="mt-2 text-sm text-slate-400">

            Recent activities for {member.user.name ?? member.user.email}

          </p>

        </div>

        {activities.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-24">

            <Activity className="mb-5 h-16 w-16 text-slate-700" />

            <h3 className="text-xl font-semibold text-white">

              No Activity Found

            </h3>

            <p className="mt-2 text-slate-500">
  This member hasn&apos;t performed any activity yet.
</p>

          </div>

        ) : (

          <div className="relative">

            <div className="absolute left-10 top-0 bottom-0 w-px bg-white/10" />

            {activities.map((activity) => (

              <div
                key={activity.id}
                className="relative flex gap-6 border-b border-white/5 p-6 last:border-none"
              >

                {/* Timeline Dot */}

                <div
                  className="
                    relative
                    z-10
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-indigo-600
                  "
                >

                  <Activity className="h-5 w-5 text-white" />

                </div>

                {/* Content */}

                <div className="flex-1">

                  <div className="flex flex-wrap items-center justify-between gap-4">

                    <div>

                      <h3 className="font-semibold text-white">

                        {activity.message ?? activity.action}

                      </h3>

                      <div className="mt-2 flex flex-wrap gap-5 text-sm text-slate-400">

                        <span>

                          {activity.task.title}

                        </span>

                        <span>

                          {activity.task.project.name}

                        </span>

                      </div>

                    </div>

                    <div className="text-right">

                      <div className="flex items-center gap-2 text-xs text-slate-500">

                        <Calendar className="h-4 w-4" />

                        {activity.createdAt.toLocaleString(
                          "en-GB"
                        )}

                      </div>

                    </div>

                  </div>

                  {/* Metadata */}

                  {activity.metadata && (

                    <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900 p-4">

                      <pre className="overflow-auto whitespace-pre-wrap text-xs text-slate-400">

                        {JSON.stringify(
                          activity.metadata,
                          null,
                          2
                        )}

                      </pre>

                    </div>

                  )}

                  <div className="mt-5">

                    <Link
                      href={`/dashboard/spaces/${activity.task.spaceId}/lists/${activity.task.projectId}/tasks/${activity.task.id}`}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-white/10
                        px-4
                        py-2
                        text-sm
                        text-white
                        transition
                        hover:bg-slate-900
                      "
                    >

                      Open Task

                      <ArrowRight className="h-4 w-4" />

                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>
            {/* ANALYTICS */}

      <div className="grid gap-6 xl:grid-cols-2">

        {/* Activity Summary */}

        <section className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <div className="flex items-center justify-between">

            <h2 className="text-lg font-semibold text-white">

              Activity Summary

            </h2>

            <Activity className="h-6 w-6 text-indigo-400" />

          </div>

          <div className="mt-6 space-y-4">

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900 p-4">

              <span className="text-slate-400">

                Total Activities

              </span>

              <span className="font-semibold text-white">

                {totalActivities}

              </span>

            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900 p-4">

              <span className="text-slate-400">

                Comments Added

              </span>

              <span className="font-semibold text-emerald-400">

                {comments}

              </span>

            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900 p-4">

              <span className="text-slate-400">

                Files Uploaded

              </span>

              <span className="font-semibold text-cyan-400">

                {uploads}

              </span>

            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900 p-4">

              <span className="text-slate-400">

                Active Tasks

              </span>

              <span className="font-semibold text-indigo-400">

                {
                  new Set(
                    activities.map(
                      (activity) =>
                        activity.taskId
                    )
                  ).size
                }

              </span>

            </div>

          </div>

        </section>

        {/* Latest Activity */}

        <section className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <div className="flex items-center justify-between">

            <h2 className="text-lg font-semibold text-white">

              Latest Activity

            </h2>

            <Calendar className="h-6 w-6 text-cyan-400" />

          </div>

          {activities.length === 0 ? (

            <div className="mt-8 rounded-2xl border border-dashed border-white/10 py-14 text-center">

              <Activity className="mx-auto h-12 w-12 text-slate-700" />

              <p className="mt-4 text-slate-500">

                No recent activity

              </p>

            </div>

          ) : (

            <div className="mt-6 space-y-4">

              {activities
                .slice(0, 5)
                .map((activity) => (

                  <div
                    key={activity.id}
                    className="rounded-2xl border border-white/10 bg-slate-900 p-4"
                  >

                    <p className="font-medium text-white">

                      {activity.message ??
                        activity.action}

                    </p>

                    <p className="mt-2 text-sm text-slate-400">

                      {activity.task.title}

                    </p>

                    <p className="mt-2 text-xs text-slate-500">

                      {activity.createdAt.toLocaleString(
                        "en-GB"
                      )}

                    </p>

                  </div>

                ))}

            </div>

          )}

        </section>

      </div>

    </div>

  );

}