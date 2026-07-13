import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  FolderKanban,
  LayoutGrid,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  ArrowRight,
  Plus,
  Activity,
  Bell,
} from "lucide-react";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {

  const session =
    await auth.api.getSession({

      headers: await headers(),

    });

  if (!session?.user) {

    redirect("/login");

  }

  const userId =
    session.user.id;

  const workspaceMember =
    await prisma.workspaceMember.findFirst({

      where: {
        userId,
      },

      include: {

        workspace: true,

      },

    });

  if (!workspaceMember) {

    return (

      <div className="flex h-[70vh] items-center justify-center">

        <div className="text-center">

          <h2 className="text-3xl font-bold text-white">

            Welcome to TaskFlow

          </h2>

          <p className="mt-3 text-slate-400">

            Create your first workspace to get started.

          </p>

        </div>

      </div>

    );

  }

  const workspaceId =
    workspaceMember.workspaceId;
      const [

    totalSpaces,

    totalProjects,

    totalTasks,

    completedTasks,

    overdueTasks,

    recentTasks,

    recentActivities,

  ] = await Promise.all([

    prisma.space.count({

      where: {

        workspaceId,

      },

    }),

    prisma.project.count({

      where: {

        space: {

          workspaceId,

        },

      },

    }),

    prisma.task.count({

      where: {

        space: {

          workspaceId,

        },

      },

    }),

    prisma.task.count({

      where: {

        status: "DONE",

        space: {

          workspaceId,

        },

      },

    }),

    prisma.task.count({

      where: {

        dueDate: {

          lt: new Date(),

        },

        status: {

          not: "DONE",

        },

        space: {

          workspaceId,

        },

      },

    }),

    prisma.task.findMany({

      where: {

        space: {

          workspaceId,

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

      take: 8,

    }),

    prisma.taskActivity.findMany({

      orderBy: {

        createdAt: "desc",

      },

      take: 8,

    }),

  ]);

  const completionRate =

    totalTasks === 0

      ? 0

      : Math.round(

          (completedTasks /

            totalTasks) *

            100

        );
          return (

    <div className="mx-auto max-w-7xl space-y-8 p-8">

      {/* HEADER */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="text-sm font-medium uppercase tracking-widest text-indigo-400">

            Workspace Dashboard

          </p>

          <h1 className="mt-2 text-4xl font-bold text-white">

            Welcome back,

            {" "}

            {session.user.name ||
              session.user.email}

          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">

            Here's everything happening across your workspace today.

          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <Link
            href="/dashboard/tasks/new"
            className="
              inline-flex
              items-center
              gap-2
              rounded-2xl
              bg-indigo-600
              px-5
              py-3
              font-medium
              text-white
              transition
              hover:bg-indigo-500
            "
          >

            <Plus size={18} />

            New Task

          </Link>

          <Link
            href="/dashboard/tasks"
            className="
              inline-flex
              items-center
              gap-2
              rounded-2xl
              border
              border-white/10
              bg-slate-900
              px-5
              py-3
              text-white
              transition
              hover:bg-slate-800
            "
          >

            View Tasks

            <ArrowRight size={18} />

          </Link>

        </div>

      </div>

      {/* STATS */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
                <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <LayoutGrid className="mb-4 h-8 w-8 text-indigo-400" />

          <p className="text-sm text-slate-400">

            Spaces

          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">

            {totalSpaces}

          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <FolderKanban className="mb-4 h-8 w-8 text-cyan-400" />

          <p className="text-sm text-slate-400">

            Projects

          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">

            {totalProjects}

          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <Activity className="mb-4 h-8 w-8 text-violet-400" />

          <p className="text-sm text-slate-400">

            Tasks

          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">

            {totalTasks}

          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <CheckCircle2 className="mb-4 h-8 w-8 text-emerald-400" />

          <p className="text-sm text-slate-400">

            Completed

          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">

            {completionRate}%

          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

          <AlertTriangle className="mb-4 h-8 w-8 text-amber-400" />

          <p className="text-sm text-slate-400">

            Overdue

          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">

            {overdueTasks}

          </h2>

        </div>

      </div>
            {/* CONTENT */}

      <div className="grid gap-8 xl:grid-cols-[1.6fr_420px]">

        {/* RECENT TASKS */}

        <section className="rounded-3xl border border-white/10 bg-[#111827] p-7">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h2 className="text-xl font-semibold text-white">

                Recent Tasks

              </h2>

              <p className="mt-1 text-sm text-slate-400">

                Latest updated tasks across your workspace

              </p>

            </div>

            <Link
              href="/dashboard/tasks"
              className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
            >
              View All →
            </Link>

          </div>

          <div className="space-y-4">
                        {recentTasks.length === 0 ? (

              <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center">

                <Clock3 className="mx-auto mb-4 h-12 w-12 text-slate-600" />

                <h3 className="text-lg font-semibold text-white">

                  No Tasks Yet

                </h3>

                <p className="mt-2 text-slate-500">

                  Create your first task to get started.

                </p>

              </div>

            ) : (

              recentTasks.map((task) => (

                <Link
                  key={task.id}
                  href={`/dashboard/spaces/${task.spaceId}/lists/${task.projectId}/tasks/${task.id}`}
                  className="
                    block
                    rounded-2xl
                    border
                    border-white/10
                    bg-slate-900/50
                    p-5
                    transition
                    hover:border-indigo-500/40
                    hover:bg-slate-900
                  "
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0 flex-1">

                      <h3 className="truncate text-lg font-semibold text-white">

                        {task.title}

                      </h3>

                      <p className="mt-1 text-sm text-slate-400">

                        {task.project.name}

                      </p>

                    </div>

                    <span
                      className="
                        rounded-full
                        bg-indigo-500/15
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-indigo-300
                      "
                    >
                      {task.status}
                    </span>

                  </div>

                  <div className="mt-5 flex items-center justify-between">

                    <div className="flex -space-x-2">

                      {task.taskAssignees
                        .slice(0, 4)
                        .map((member) => (

                          <div
                            key={member.id}
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-full
                              border-2
                              border-[#111827]
                              bg-indigo-600
                              text-xs
                              font-semibold
                              text-white
                            "
                          >

                            {(member.user.name ??
                              member.user.email)
                              .charAt(0)
                              .toUpperCase()}

                          </div>

                        ))}

                    </div>

                    <span className="text-xs text-slate-500">

                      {task.updatedAt.toLocaleDateString("en-GB")}

                    </span>

                  </div>

                </Link>

              ))

            )}

          </div>

        </section>
                {/* RIGHT SIDEBAR */}

        <aside className="space-y-8">

          {/* RECENT ACTIVITY */}

          <section className="rounded-3xl border border-white/10 bg-[#111827] p-6">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-xl font-semibold text-white">

                Recent Activity

              </h2>

              <Activity className="h-5 w-5 text-indigo-400" />

            </div>

            <div className="space-y-4">

              {recentActivities.length === 0 ? (

                <p className="py-8 text-center text-sm text-slate-500">

                  No recent activity

                </p>

              ) : (

                recentActivities.map((activity) => (

                  <div
                    key={activity.id}
                    className="rounded-2xl border border-white/10 bg-slate-900/50 p-4"
                  >

                    <p className="text-sm font-medium text-white">

                      {(activity as any).message ||
                        activity.action}

                    </p>

                    <p className="mt-2 text-xs text-slate-500">

                      {activity.createdAt.toLocaleString("en-GB")}

                    </p>

                  </div>

                ))

              )}

            </div>

          </section>

          {/* NOTIFICATIONS */}

          <section className="rounded-3xl border border-white/10 bg-[#111827] p-6">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-xl font-semibold text-white">

                Notifications

              </h2>

              <Bell className="h-5 w-5 text-yellow-400" />

            </div>

            <div className="space-y-4">

              <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">

                <p className="font-medium text-yellow-300">

                  New Task Assigned

                </p>

                <p className="mt-1 text-sm text-slate-300">

                  aksh assigned you "Landing Page UI".

                </p>

              </div>

              <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4">

                <p className="font-medium text-indigo-300">

                  Comment Added

                </p>

                <p className="mt-1 text-sm text-slate-300">

                  Jeet commented on API Integration.

                </p>

              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">

                <p className="font-medium text-emerald-300">

                  sdfgh Completed

                </p>

                <p className="mt-1 text-sm text-slate-300">

                  sdfgh has been completed successfully.

                </p>

              </div>

            </div>

            <Link
              href="/dashboard/notifications"
              className="
                mt-6
                flex
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                py-3
                text-sm
                font-medium
                text-indigo-400
                transition
                hover:bg-slate-900
              "
            >

              View All Notifications

            </Link>

          </section>

        </aside>

      </div>

    </div>

  );

}