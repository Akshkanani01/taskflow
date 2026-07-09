import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

import TaskTitleEditor from "@/components/tasks/editors/task-title-editor";
import DescriptionEditor from "@/components/tasks/editors/description-editor";
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
    id,
    listId,
    taskId,
  } = await params;

  const task =
    await prisma.task.findUnique({

      where: {
        id: taskId,
      },

      include: {

        project: true,

        taskAssignees: {
          include: {
            user: true,
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

        attachments: true,

        checklists: {
          orderBy: {
            createdAt: "asc",
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

      <div className="border-b border-white/10 bg-[#111827]">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">

          <div>

            <p className="text-sm text-slate-500">
              Workspace / List / Task
            </p>

            <h1 className="mt-2 text-3xl font-bold text-white">
              {task.title}
            </h1>

          </div>

        </div>

      </div>

      {/* BODY */}

      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_340px] gap-8 px-8 py-8">

        {/* LEFT */}

        <div className="space-y-8">

          {/* TITLE */}

          <div className="rounded-3xl border border-white/10 bg-[#111827] p-8">

            <TaskTitleEditor
              taskId={task.id}
              title={task.title}
            />

          </div>

          {/* DESCRIPTION */}

          <div className="rounded-3xl border border-white/10 bg-[#111827] p-8">

            <DescriptionEditor
              taskId={task.id}
              description={
                task.description ?? ""
              }
            />

          </div>

          {/* CHECKLIST */}

          <ChecklistSection
            taskId={task.id}
            items={task.checklists}
          />

          {/* COMMENTS */}

          <CommentsSection
            taskId={task.id}
            comments={task.comments}
          />

          {/* ATTACHMENTS */}

          <AttachmentsSection
            taskId={task.id}
            attachments={
              task.attachments
            }
          />

          {/* ACTIVITY */}

          <ActivitySection
            activities={
              task.activities
            }
          />

        </div>

        {/* RIGHT SIDEBAR */}

        <aside className="space-y-6">

          <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">

            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Task Details
            </h3>

            <div className="space-y-6">

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
                members={
                  task.taskAssignees
                }
              />

              <TaskDueDateEditor
                taskId={task.id}
                value={task.dueDate}
              />

              <EstimateEditor
                taskId={task.id}
                value={
                  task.estimatedHours
                }
              />

            </div>

          </div>
                      {/* PROJECT */}

            <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">

              <p className="text-xs uppercase tracking-wider text-slate-500">
                Project
              </p>

              <p className="mt-2 text-white">
                {task.project.name}
              </p>

            </div>

            {/* CREATED */}

            <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">

              <p className="text-xs uppercase tracking-wider text-slate-500">
                Created
              </p>

              <p className="mt-2 text-sm text-white">
                {task.createdAt.toLocaleDateString()}
              </p>

            </div>

            {/* UPDATED */}

            <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">

              <p className="text-xs uppercase tracking-wider text-slate-500">
                Updated
              </p>

              <p className="mt-2 text-sm text-white">
                {task.updatedAt.toLocaleDateString()}
              </p>

            </div>

          </div>

        </aside>

      </div>

    </div>

  );

}