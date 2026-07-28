import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import TaskTitleEditor from "@/components/tasks/editors/task-title-editor";
import DescriptionEditor from "@/components/tasks/editors/description-editor";
import Link from "next/link";
import TaskStatusEditor from "@/components/tasks/editors/task-status-editor";
import TaskPriorityEditor from "@/components/tasks/editors/task-priority-editor";
import TaskAssigneeEditor from "@/components/tasks/editors/task-assignee-editor";
import TaskDueDateEditor from "@/components/tasks/editors/task-due-date-editor";
import EstimateEditor from "@/components/tasks/editors/estimate-editor";

import ChecklistSection from "@/components/tasks/checklist/checklist-section";
import CommentsSection from "@/components/tasks/comments/comments-section";
import AttachmentsSection from "@/components/tasks/attachments/attachments-section";
import ActivitySection from "@/components/tasks/activity/activity-section";





type Props = {
  params: Promise<{
    id: string;
    listId: string;
    taskId: string;
  }>;
};

export default async function TaskDetailPage({
  params,
}: Props) {
  const {
    id: spaceId,
    listId,
    taskId,
  } = await params;

  const task =
    await prisma.task.findFirst({
      where: {
        id: taskId,
        projectId: listId,
        spaceId,
      },

      include: {
        project: true,

        createdBy: true,

        taskAssignees: {
          include: {
            user: true,
          },
        },

        checklists: {
          orderBy: {
            createdAt: "asc",
          },
        },

        comments: {
          include: {
            user: true,
          },

          orderBy: {
            createdAt: "desc",
          },
        },

        attachments: {
          orderBy: {
            createdAt: "desc",
          },
        },

        activities: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

  if (!task) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0B1220]">
            {/* HEADER */}

      <div className="border-b border-border bg-[#111827]">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">

          <div>

            <p className="text-sm text-muted-foreground">

              Workspace
              {" / "}
              List
              {" / "}
              Task

            </p>

            <h1 className="mt-2 text-3xl font-bold text-foreground">

              {task.title}

            </h1>

          </div>

          <div className="flex items-center gap-3">

            <Link
  href={`/dashboard/spaces/${spaceId}/lists/${listId}`}
  className="
    rounded-xl
    border
    border-border
    bg-card
    px-4
    py-2
    text-sm
    text-foreground
    transition
    hover:bg-background
  "
>
  ← Back
</Link>

      

          </div>

        </div>

      </div>

      {/* BODY */}

      <div
        className="
          mx-auto
          grid
          max-w-7xl
          grid-cols-[1fr_340px]
          gap-8
          px-8
          py-8
        "
      >

        {/* LEFT */}

        <div className="space-y-8">
                    {/* TITLE */}

          <section className="rounded-3xl border border-border bg-[#111827] p-8">

            <TaskTitleEditor
              taskId={task.id}
              title={task.title}
            />

          </section>

          {/* DESCRIPTION */}

          <section className="rounded-3xl border border-border bg-[#111827] p-8">

            <DescriptionEditor
              taskId={task.id}
              description={task.description ?? ""}
            />

          </section>

          {/* CHECKLIST */}

          <section className="rounded-3xl border border-border bg-[#111827] p-8">

            <div className="mb-6">

              <h2 className="text-lg font-semibold text-foreground">
                Checklist
              </h2>

            </div>

            <ChecklistSection
              taskId={task.id}
              items={task.checklists}
            />

          </section>

          {/* COMMENTS */}

          <section className="rounded-3xl border border-border bg-[#111827] p-8">

            <div className="mb-6">

              <h2 className="text-lg font-semibold text-foreground">
                Comments
              </h2>

            </div>

            <CommentsSection
              taskId={task.id}
              comments={task.comments}
            />

          </section>

          {/* ATTACHMENTS */}

          <section className="rounded-3xl border border-border bg-[#111827] p-8">

            <div className="mb-6">

              <h2 className="text-lg font-semibold text-foreground">
                Attachments
              </h2>

            </div>

            <AttachmentsSection
  taskId={task.id}
  attachments={task.attachments}
/>

          </section>

          {/* ACTIVITY */}

          <section className="rounded-3xl border border-border bg-[#111827] p-8">

            <div className="mb-6">

              <h2 className="text-lg font-semibold text-foreground">
                Activity
              </h2>

            </div>

            <ActivitySection
              activities={task.activities}
            />

          </section>

        </div>

        {/* RIGHT SIDEBAR */}

        <aside className="space-y-6">

          <div className="rounded-3xl border border-border bg-[#111827] p-6">

            <h2 className="mb-6 text-lg font-semibold text-foreground">
              Task Details
            </h2>

            <div className="space-y-5">
                            <TaskStatusEditor
                taskId={task.id}
                value={task.status}
              />

              <TaskPriorityEditor
                taskId={task.id}
                value={task.priority}
              />

              <TaskAssigneeEditor
                taskId={task.id}
                members={task.taskAssignees.map((a) => ({
                  id: a.user.id,
                  name: a.user.name ?? a.user.email,
                }))}
                selected={task.taskAssignees.map(
                  (a) => a.user.id
                )}
              />

              <TaskDueDateEditor
                taskId={task.id}
                value={task.dueDate}
              />

              <EstimateEditor
                taskId={task.id}
                value={task.estimatedHours}
              />

              {/* PROJECT */}

              <div className="rounded-2xl border border-border bg-background p-4">

                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Project
                </p>

                <p className="mt-2 text-sm font-medium text-foreground">
                  {task.project.name}
                </p>

              </div>

              {/* CREATED BY */}

              <div className="rounded-2xl border border-border bg-background p-4">

                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Created By
                </p>

                <p className="mt-2 text-sm text-foreground">
                  {task.createdBy.name ??
                    task.createdBy.email}
                </p>

              </div>

              {/* CREATED */}

              <div className="rounded-2xl border border-border bg-background p-4">

                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Created
                </p>

                <p className="mt-2 text-sm text-foreground">
                  {task.createdAt.toLocaleDateString("en-GB")}
                </p>

              </div>

              {/* UPDATED */}

              <div className="rounded-2xl border border-border bg-background p-4">

                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Updated
                </p>

                <p className="mt-2 text-sm text-foreground">
                  {task.updatedAt.toLocaleDateString("en-GB")}
                </p>

              </div>

            </div>

          </div>

        </aside>

      </div>

    </div>

  );

}