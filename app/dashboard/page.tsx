import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  Activity,
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock3,
  FolderKanban,
  LayoutGrid,
  Target,
  TrendingUp,
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
            Create your first workspace.
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
  activeTasks,
  notifications,
  recentTasks,
  upcomingTasks,
  priorityTasks,
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

  prisma.task.count({
    where: {
      status: "IN_PROGRESS",
      space: {
        workspaceId,
      },
    },
  }),

  prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
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
    take: 6,
  }),

  prisma.task.findMany({
    where: {
      dueDate: {
        not: null,
        gte: new Date(),
      },
      status: {
        not: "DONE",
      },
      space: {
        workspaceId,
      },
    },
    orderBy: {
      dueDate: "asc",
    },
    take: 5,
  }),

  prisma.task.findMany({
    where: {
      priority: {
        in: ["HIGH", "URGENT"],
      },
      status: {
        not: "DONE",
      },
      space: {
        workspaceId,
      },
    },
    include: {
      project: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 5,
  }),

  prisma.taskActivity.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
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
  <div className="mx-auto max-w-7xl space-y-8">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-400">
          Workspace Overview
        </p>

        <h1 className="mt-3 text-4xl font-bold text-white">
          Welcome back,
          {" "}
          {session.user.name ??
            session.user.email}
        </h1>

        <p className="mt-3 max-w-3xl text-slate-400">
          Monitor projects, tasks, notifications and team activity from one place.
        </p>

      </div>

    </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-6">

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
            Active Tasks
          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">
            {activeTasks}
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

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">
          <Bell className="mb-4 h-8 w-8 text-pink-400" />

          <p className="text-sm text-slate-400">
            Notifications
          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">
            {notifications.length}
          </h2>
        </div>

      </div>

      <div className="grid gap-8 xl:grid-cols-[1.65fr_430px]">

        {/* LEFT */}

        <div className="space-y-8">

          <section className="rounded-3xl border border-white/10 bg-[#111827] p-7">

            <div className="mb-6 flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-semibold text-white">
                  Recent Tasks
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Latest updated tasks across your workspace
                </p>

              </div>

              <Link
                href="/dashboard/tasks"
                className="text-sm font-medium text-indigo-400"
              >
                View All →
              </Link>

            </div>

            <div className="space-y-4">

              {recentTasks.length === 0 ? (

                <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center">

                  <Clock3 className="mx-auto mb-4 h-10 w-10 text-slate-600" />

                  <p className="text-slate-400">
                    No recent tasks
                  </p>

                </div>

              ) : (

                recentTasks.map((task) => (

                  <Link
                    key={task.id}
                    href={`/dashboard/spaces/${task.spaceId}/lists/${task.projectId}/tasks/${task.id}`}
                    className="block rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition hover:border-indigo-500/40 hover:bg-slate-900"
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

                      <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-medium text-indigo-300">
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
                              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#111827] bg-indigo-600 text-xs font-semibold text-white"
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
                    {/* UPCOMING DEADLINES */}

          <section className="rounded-3xl border border-white/10 bg-[#111827] p-7">

            <div className="mb-6 flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-semibold text-white">
                  Upcoming Deadlines
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Tasks that require attention soon
                </p>

              </div>

              <Target className="h-6 w-6 text-amber-400" />

            </div>

            <div className="space-y-4">

              {upcomingTasks.length === 0 ? (

                <div className="rounded-2xl border border-dashed border-white/10 py-12 text-center">

                  <Clock3 className="mx-auto mb-3 h-10 w-10 text-slate-600" />

                  <p className="text-slate-400">
                    No upcoming deadlines
                  </p>

                </div>

              ) : (

                upcomingTasks.map((task) => (

                  <Link
                    key={task.id}
                    href={`/dashboard/spaces/${task.spaceId}/lists/${task.projectId}/tasks/${task.id}`}
                    className="block rounded-2xl border border-white/10 bg-slate-900/50 p-5 transition hover:border-amber-500/40"
                  >

                    <div className="flex items-center justify-between">

                      <div>

                        <h3 className="font-semibold text-white">
                          {task.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-400">
                          Due{" "}
                          {task.dueDate?.toLocaleDateString("en-GB")}
                        </p>

                      </div>

                      <Clock3 className="h-5 w-5 text-amber-400" />

                    </div>

                  </Link>

                ))

              )}

            </div>

          </section>

          {/* HIGH PRIORITY TASKS */}

          <section className="rounded-3xl border border-white/10 bg-[#111827] p-7">

            <div className="mb-6 flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-semibold text-white">
                  High Priority Tasks
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  High & Urgent work
                </p>

              </div>

              <TrendingUp className="h-6 w-6 text-red-400" />

            </div>

            <div className="space-y-4">

              {priorityTasks.length === 0 ? (

                <div className="rounded-2xl border border-dashed border-white/10 py-12 text-center">

                  <AlertTriangle className="mx-auto mb-3 h-10 w-10 text-slate-600" />

                  <p className="text-slate-400">
                    No high priority tasks
                  </p>

                </div>

              ) : (

                priorityTasks.map((task) => (

                  <Link
                    key={task.id}
                    href={`/dashboard/spaces/${task.spaceId}/lists/${task.projectId}/tasks/${task.id}`}
                    className="block rounded-2xl border border-red-500/20 bg-slate-900/50 p-5 transition hover:border-red-500/50"
                  >

                    <div className="flex items-center justify-between">

                      <div>

                        <h3 className="font-semibold text-white">
                          {task.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-400">
                          {task.project.name}
                        </p>

                      </div>

                      <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
                        {task.priority}
                      </span>

                    </div>

                  </Link>

                ))

              )}

            </div>

          </section>

        </div>

        {/* RIGHT SIDEBAR */}

        <aside className="space-y-8">

          {/* NOTIFICATIONS */}
                    <section className="rounded-3xl border border-white/10 bg-[#111827] p-6">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-xl font-semibold text-white">
                Notifications
              </h2>

              <Bell className="h-5 w-5 text-yellow-400" />

            </div>

            <div className="space-y-4">

              {notifications.length === 0 ? (

                <div className="rounded-2xl border border-dashed border-white/10 py-12 text-center">

                  <Bell className="mx-auto mb-3 h-10 w-10 text-slate-600" />

                  <p className="text-slate-400">
                    No notifications
                  </p>

                </div>

              ) : (

                notifications.map((notification) => (

                  <Link
                    key={notification.id}
                    href={
                      notification.link ??
                      "/dashboard/notifications"
                    }
                    className="block rounded-2xl border border-white/10 bg-slate-900/60 p-4 transition hover:border-indigo-500/40 hover:bg-slate-900"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0 flex-1">

                        <h3 className="truncate font-semibold text-white">
                          {notification.title}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-sm text-slate-400">
                          {notification.message}
                        </p>

                        <p className="mt-3 text-xs text-slate-500">
                          {notification.createdAt.toLocaleString("en-GB")}
                        </p>

                      </div>

                      {!notification.read && (
                        <span className="mt-1 h-3 w-3 rounded-full bg-indigo-500" />
                      )}

                    </div>

                  </Link>

                ))

              )}

            </div>

            <Link
              href="/dashboard/notifications"
              className="mt-6 flex items-center justify-center rounded-2xl border border-white/10 py-3 text-sm font-medium text-indigo-400 transition hover:bg-slate-900"
            >
              View All Notifications
            </Link>

          </section>

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

                <div className="rounded-2xl border border-dashed border-white/10 py-12 text-center">

                  <Activity className="mx-auto mb-3 h-10 w-10 text-slate-600" />

                  <p className="text-slate-400">
                    No recent activity
                  </p>

                </div>

              ) : (

                recentActivities.map((activity) => (

                  <div
                    key={activity.id}
                    className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
                  >

                    <p className="font-medium text-white">
                      {(activity as any).message ??
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

          {/* WORKSPACE HEALTH */}

          <section className="rounded-3xl border border-white/10 bg-[#111827] p-6">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-xl font-semibold text-white">
                Workspace Health
              </h2>

              <TrendingUp className="h-5 w-5 text-emerald-400" />

            </div>

            <div className="space-y-5">

              <div className="flex items-center justify-between">

                <span className="text-slate-400">
                  Completion
                </span>

                <span className="font-semibold text-emerald-400">
                  {completionRate}%
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-slate-400">
                  Total Tasks
                </span>

                <span className="font-semibold text-white">
                  {totalTasks}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-slate-400">
                  Active Tasks
                </span>

                <span className="font-semibold text-indigo-400">
                  {activeTasks}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-slate-400">
                  Overdue
                </span>

                <span className="font-semibold text-red-400">
                  {overdueTasks}
                </span>

              </div>

            </div>

          </section>

        </aside>

      </div>

    </div>

  );
}