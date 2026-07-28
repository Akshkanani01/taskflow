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

  const assigned = tasks.length;

  const completed = tasks.filter(
    (task) => task.status === "DONE"
  ).length;

  const overdue = tasks.filter(
    (task) =>
      task.status !== "DONE" &&
      task.dueDate &&
      task.dueDate < new Date()
  ).length;

  const progress =
    assigned === 0
      ? 0
      : Math.round((completed / assigned) * 100);

  return (
    <div className="space-y-8">

      {/* STATS */}

      <div className="grid gap-6 md:grid-cols-4">

        <div className="rounded-3xl border border-border bg-card p-6">

          <Clock3 className="mb-4 h-8 w-8 text-primary" />

          <p className="text-sm text-muted-foreground">
            Assigned
          </p>

          <h2 className="mt-2 text-4xl font-bold text-foreground">
            {assigned}
          </h2>

        </div>

        <div className="rounded-3xl border border-border bg-card p-6">

          <CheckCircle2 className="mb-4 h-8 w-8 text-primary" />

          <p className="text-sm text-muted-foreground">
            Completed
          </p>

          <h2 className="mt-2 text-4xl font-bold text-foreground">
            {completed}
          </h2>

        </div>

        <div className="rounded-3xl border border-border bg-card p-6">

          <AlertTriangle className="mb-4 h-8 w-8 text-primary" />

          <p className="text-sm text-muted-foreground">
            Overdue
          </p>

          <h2 className="mt-2 text-4xl font-bold text-foreground">
            {overdue}
          </h2>

        </div>

        <div className="rounded-3xl border border-border bg-card p-6">

          <Calendar className="mb-4 h-8 w-8 text-primary" />

          <p className="text-sm text-muted-foreground">
            Progress
          </p>

          <h2 className="mt-2 text-4xl font-bold text-foreground">
            {progress}%
          </h2>

        </div>

      </div>

      {/* TASKS */}

      <section className="rounded-3xl border border-border bg-card">

        <div className="flex items-center justify-between border-b border-border p-6">

          <div>

            <h2 className="text-xl font-semibold text-foreground">
              Assigned Tasks
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Tasks currently assigned to {member.user.name ?? member.user.email}
            </p>

          </div>

          <div className="rounded-xl border border-border bg-card px-4 py-2 text-sm text-foreground">
            {assigned} Total
          </div>

        </div>
                {tasks.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-24">

            <Clock3 className="mb-5 h-14 w-14 text-muted-foreground" />

            <h3 className="text-xl font-semibold text-foreground">
              No Tasks Assigned
            </h3>

            <p className="mt-2 text-muted-foreground">
              This member doesn&apos;t have any assigned tasks yet.
            </p>

          </div>

        ) : (

          <div className="divide-y divide-white/5">

            {tasks.map((task) => (

              <Link
                key={task.id}
                href={`/dashboard/spaces/${task.spaceId}/lists/${task.projectId}/tasks/${task.id}`}
                className="block transition hover:bg-card/50"
              >

                <div className="flex items-center justify-between gap-8 p-6">

                  {/* LEFT */}

                  <div className="min-w-0 flex-1">

                    <div className="flex items-center gap-3">

                      <h3 className="truncate text-lg font-semibold text-foreground">
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
                              ? "bg-primary/20 text-primary"
                              : task.status === "IN_PROGRESS"
                              ? "bg-primary/20 text-primary"
                              : task.status === "REVIEW"
                              ? "bg-primary/20 text-primary"
                              : "bg-card text-foreground"
                          }
                        `}
                      >
                        {task.status.replaceAll("_", " ")}
                      </span>

                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">

                      <span>
                        Project

                        <span className="ml-2 font-medium text-foreground">
                          {task.project.name}
                        </span>

                      </span>

                      {task.dueDate && (

                        <span>

                          Due

                          <span className="ml-2 font-medium text-foreground">
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
                            ? "bg-destructive/20 text-destructive"
                            : task.priority === "HIGH"
                            ? "bg-primary/20 text-primary"
                            : task.priority === "MEDIUM"
                            ? "bg-primary/20 text-primary"
                            : "bg-card text-foreground"
                        }
                      `}
                    >
                      {task.priority}
                    </div>

                    <ArrowRight className="h-5 w-5 text-muted-foreground transition group-hover:text-foreground" />

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

        <section className="rounded-3xl border border-border bg-card p-6">

          <div className="flex items-center justify-between">

            <h2 className="text-lg font-semibold text-foreground">
              Completion Rate
            </h2>

            <span className="text-2xl font-bold text-primary">
              {progress}%
            </span>

          </div>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-background">

            <div
              className="h-full rounded-full bg-primary transition"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">

            <div className="rounded-2xl border border-border bg-card p-4">

              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Completed
              </p>

              <p className="mt-2 text-3xl font-bold text-foreground">
                {completed}
              </p>

            </div>

            <div className="rounded-2xl border border-border bg-card p-4">

              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Remaining
              </p>

              <p className="mt-2 text-3xl font-bold text-foreground">
                {assigned - completed}
              </p>

            </div>

          </div>

        </section>

        {/* Summary */}

        <section className="rounded-3xl border border-border bg-card p-6">

          <h2 className="text-lg font-semibold text-foreground">
            Performance Summary
          </h2>

          <div className="mt-6 space-y-4">
                        <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">

              <span className="text-muted-foreground">
                Total Assigned
              </span>

              <span className="font-semibold text-foreground">
                {assigned}
              </span>

            </div>

            <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">

              <span className="text-muted-foreground">
                Completed
              </span>

              <span className="font-semibold text-primary">
                {completed}
              </span>

            </div>

            <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">

              <span className="text-muted-foreground">
                Overdue
              </span>

              <span className="font-semibold text-destructive">
                {overdue}
              </span>

            </div>

            <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">

              <span className="text-muted-foreground">
                Success Rate
              </span>

              <span className="font-semibold text-primary">
                {progress}%
              </span>

            </div>

          </div>

        </section>

      </div>

    </div>

  );

}