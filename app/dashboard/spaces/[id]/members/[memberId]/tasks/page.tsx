import Link from "next/link";
import { notFound } from "next/navigation";

import {
  Calendar,
  CheckCircle2,
  Clock3,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
    memberId: string;
  }>;
}

export default async function MemberTasksPage({
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

  const tasks =
    await prisma.task.findMany({

      where: {

        spaceId,

        taskAssignees: {

          some: {

            userId: memberId,

          },

        },

      },

      include: {

        project: true,

        taskAssignees: {

          include: {

            user: true,

          },

        },

      },

      orderBy: {

        updatedAt: "desc",

      },

    });

  const assigned =
    tasks.length;

  const completed =
    tasks.filter(
      (task) =>
        task.status === "DONE"
    ).length;

  const overdue =
    tasks.filter(
      (task) =>
        task.status !== "DONE" &&
        task.dueDate &&
        task.dueDate <
          new Date()
    ).length;

  const progress =
    assigned === 0
      ? 0
      : Math.round(
          (completed /
            assigned) *
            100
        );

  return (

    <div className="space-y-8">

      {/* STATS */}

      <div className="grid gap-6 md:grid-cols-4">

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <Clock3 className="mb-4 h-8 w-8 text-indigo-400" />

          <p className="text-sm text-slate-400">

            Assigned

          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">

            {assigned}

          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <CheckCircle2 className="mb-4 h-8 w-8 text-emerald-400" />

          <p className="text-sm text-slate-400">

            Completed

          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">

            {completed}

          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <AlertTriangle className="mb-4 h-8 w-8 text-amber-400" />

          <p className="text-sm text-slate-400">

            Overdue

          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">

            {overdue}

          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <Calendar className="mb-4 h-8 w-8 text-cyan-400" />

          <p className="text-sm text-slate-400">

            Progress

          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">

            {progress}%

          </h2>

        </div>

      </div>
            {/* TASKS */}

      <section className="rounded-3xl border border-white/10 bg-[#111827]">

        <div className="flex items-center justify-between border-b border-white/10 p-6">

          <div>

            <h2 className="text-xl font-semibold text-white">

              Assigned Tasks

            </h2>

            <p className="mt-1 text-sm text-slate-400">

              Tasks currently assigned to {member.user.name ?? member.user.email}

            </p>

          </div>

          <div className="rounded-xl border border-white/10 bg-slate-900 px-4 py-2 text-sm text-slate-300">

            {assigned} Total

          </div>

        </div>

        {tasks.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-24">

            <Clock3 className="mb-5 h-14 w-14 text-slate-600" />

            <h3 className="text-xl font-semibold text-white">

              No Tasks Assigned

            </h3>

            <p className="mt-2 text-slate-500">

              This member doesn&apos;t have any assigned tasks yet.

            </p>

          </div>

        ) : (

          <div className="divide-y divide-white/5">

            {tasks.map((task) => (

              <Link
                key={task.id}
                href={`/dashboard/spaces/${task.spaceId}/lists/${task.projectId}/tasks/${task.id}`}
                className="block transition hover:bg-slate-900/50"
              >

                <div className="flex items-center justify-between gap-8 p-6">

                  {/* LEFT */}

                  <div className="min-w-0 flex-1">

                    <div className="flex items-center gap-3">

                      <h3 className="truncate text-lg font-semibold text-white">

                        {task.title}

                      </h3>

                      <span
                        className={`
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          ${
                            task.status === "DONE"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : task.status === "IN_PROGRESS"
                              ? "bg-indigo-500/20 text-indigo-300"
                              : task.status === "REVIEW"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-slate-700 text-slate-300"
                          }
                        `}
                      >

                        {task.status.replaceAll("_", " ")}

                      </span>

                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-6 text-sm text-slate-400">

                      <span>

                        Project

                        <span className="ml-2 font-medium text-white">

                          {task.project.name}

                        </span>

                      </span>

                      {task.dueDate && (

                        <span>

                          Due

                          <span className="ml-2 font-medium text-white">

                            {task.dueDate.toLocaleDateString("en-GB")}

                          </span>

                        </span>

                      )}

                    </div>

                  </div>

                  {/* RIGHT */}

                  <div className="flex items-center gap-6">

                    <div
                      className={`
                        rounded-xl
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        ${
                          task.priority === "URGENT"
                            ? "bg-red-500/20 text-red-300"
                            : task.priority === "HIGH"
                            ? "bg-orange-500/20 text-orange-300"
                            : task.priority === "MEDIUM"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-slate-700 text-slate-300"
                        }
                      `}
                    >

                      {task.priority}

                    </div>

                    <ArrowRight className="h-5 w-5 text-slate-500 transition group-hover:text-white" />

                  </div>

                </div>

              </Link>

            ))}

          </div>

        )}

      </section>
            {/* PERFORMANCE */}

      <div className="grid gap-6 xl:grid-cols-2">

        {/* Completion */}

        <section className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <div className="flex items-center justify-between">

            <h2 className="text-lg font-semibold text-white">

              Completion Rate

            </h2>

            <span className="text-2xl font-bold text-emerald-400">

              {progress}%

            </span>

          </div>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">

            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">

              <p className="text-xs uppercase tracking-wider text-slate-500">

                Completed

              </p>

              <p className="mt-2 text-3xl font-bold text-white">

                {completed}

              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">

              <p className="text-xs uppercase tracking-wider text-slate-500">

                Remaining

              </p>

              <p className="mt-2 text-3xl font-bold text-white">

                {assigned - completed}

              </p>

            </div>

          </div>

        </section>

        {/* Summary */}

        <section className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <h2 className="text-lg font-semibold text-white">

            Performance Summary

          </h2>

          <div className="mt-6 space-y-4">

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900 p-4">

              <span className="text-slate-400">

                Total Assigned

              </span>

              <span className="font-semibold text-white">

                {assigned}

              </span>

            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900 p-4">

              <span className="text-slate-400">

                Completed

              </span>

              <span className="font-semibold text-emerald-400">

                {completed}

              </span>

            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900 p-4">

              <span className="text-slate-400">

                Overdue

              </span>

              <span className="font-semibold text-red-400">

                {overdue}

              </span>

            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900 p-4">

              <span className="text-slate-400">

                Success Rate

              </span>

              <span className="font-semibold text-cyan-400">

                {progress}%

              </span>

            </div>

          </div>

        </section>

      </div>

    </div>

  );

}