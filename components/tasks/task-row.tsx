"use client";

import { useRouter } from "next/navigation";

import {
  Calendar,
  MessageSquare,
  Paperclip,
} from "lucide-react";

import StatusBadge from "./status-badge";
import PriorityBadge from "./priority-badge";
import TaskActionsMenu from "./actions/task-actions-menu";
import TaskAvatar from "./task-avatar";

type Assignee = {
  id: string;
  name: string;
  email: string;
  image: string | null;
};

type Props = {
  taskId: string;
  spaceId: string;
  listId: string;
  title: string;
  status: string;
  priority: string;
  dueDate: Date | null;
  assignee: Assignee | null;
  comments: number;
  attachments: number;
};

export default function TaskRow({
  taskId,
  spaceId,
  listId,
  title,
  status,
  priority,
  dueDate,
  assignee,
  comments,
  attachments,
}: Props) {
  const router = useRouter();

  function openTask() {
    router.push(
      `/dashboard/spaces/${spaceId}/lists/${listId}/tasks/${taskId}`
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={openTask}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openTask();
        }
      }}
      className="
        group
        grid
        grid-cols-[360px_130px_130px_170px_240px_64px]
        items-center
        px-7
        py-4
        transition-all
        duration-200
        hover:bg-[#171D27]
      "
    >
      {/* TASK */}

      <div className="flex min-w-0 items-start gap-3">
        <div
          className="
            mt-1.5
            h-3
            w-3
            shrink-0
            rounded-full
            bg-indigo-500
            shadow-[0_0_12px_rgba(99,102,241,.7)]
          "
        />

        <div className="min-w-0 flex-1">
          <h3
            className="
              truncate
              text-[15px]
              font-semibold
              text-white
            "
          >
            {title}
          </h3>

          <div
            className="
              mt-2
              flex
              items-center
              gap-5
              text-xs
              text-slate-500
            "
          >
            <span className="flex items-center gap-1">
              <MessageSquare size={14} />
              {comments}
            </span>

            <span className="flex items-center gap-1">
              <Paperclip size={14} />
              {attachments}
            </span>
          </div>
        </div>
      </div>

      {/* STATUS */}

      <div className="flex justify-center">
        <StatusBadge status={status} />
      </div>

      {/* PRIORITY */}

      <div className="flex justify-center">
        <PriorityBadge priority={priority} />
      </div>

      {/* DUE DATE */}

      <div className="flex justify-center">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-slate-800
              text-slate-400
            "
          >
            <Calendar size={17} />
          </div>
                    <div>
            <p className="text-xs font-semibold text-white">
              {dueDate
                ? dueDate.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "No Due Date"}
            </p>

            <p className="mt-1 text-[11px] text-slate-500">
              Due
            </p>
          </div>
        </div>
      </div>

      {/* ASSIGNEE */}

      <div className="flex items-center">
        <div className="flex w-full items-center gap-3">
          {assignee ? (
            <TaskAvatar
              name={assignee.name}
              email={assignee.email}
              image={assignee.image}
              size={34}
            />
          ) : (
            <TaskAvatar
              name="Unassigned"
              email=""
              image={null}
              size={34}
            />
          )}

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              {assignee?.name || "Unassigned"}
            </p>

            {assignee &&
              assignee.name !== assignee.email && (
                <p
                  title={assignee.email}
                  className="
                    max-w-[150px]
                    truncate
                    text-xs
                    text-slate-500
                  "
                >
                  {assignee.email}
                </p>
              )}
          </div>
        </div>
      </div>

      {/* ACTIONS */}

      <div className="flex justify-end">
        <TaskActionsMenu
          taskId={taskId}
          spaceId={spaceId}
          listId={listId}
        />
      </div>
    </div>
  );
}