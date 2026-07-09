"use client";

import { useRouter } from "next/navigation";

import {
  CalendarDays,
  MessageSquare,
  Paperclip,
} from "lucide-react";

import TaskMenu from "./task-menu";
import TaskStatusSelect from "./task-status-select";
import TaskPrioritySelect from "./task-priority-select";

type Props = {
  taskId: string;

  spaceId: string;

  listId: string;

  title: string;

  assignee?: string;

  status: string;

  priority: string;

  dueDate?: Date | string;

  comments: number;

  attachments: number;

  completed: boolean;
};

export default function TaskRow({
  taskId,
  spaceId,
  listId,
  title,
  assignee,
  status,
  priority,
  dueDate,
  comments,
  attachments,
  completed,
}: Props) {

  const router = useRouter();

  const formattedDate =
    dueDate
      ? new Intl.DateTimeFormat(
          "en-GB",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        ).format(new Date(dueDate))
      : undefined;
        return (
    <div
      onClick={() =>
        router.push(
          `/dashboard/spaces/${spaceId}/lists/${listId}/tasks/${taskId}`
        )
      }
      className="
        group
        flex
        cursor-pointer
        items-center
        justify-between
        px-6
        py-5
        transition
        hover:bg-slate-800/40
      "
    >

      {/* LEFT */}

      <div className="flex items-start gap-4">

        <input
          type="checkbox"
          checked={completed}
          readOnly
          onClick={(e) =>
            e.stopPropagation()
          }
          className="mt-1 h-4 w-4 rounded"
        />

        <div>

          <h3
            className={`font-semibold transition ${
              completed
                ? "line-through text-slate-500"
                : "text-white group-hover:text-indigo-400"
            }`}
          >
            {title}
          </h3>

          <div className="mt-3 flex flex-wrap items-center gap-2">

            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-400">
              {assignee ?? "Unassigned"}
            </span>

            <div
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <TaskStatusSelect
                taskId={taskId}
                value={status}
              />
            </div>

            <div
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <TaskPrioritySelect
                taskId={taskId}
                value={priority}
              />
            </div>

            {formattedDate && (
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <CalendarDays className="h-3.5 w-3.5" />
                {formattedDate}
              </span>
            )}

            <span className="flex items-center gap-1 text-xs text-slate-500">
              <MessageSquare className="h-3.5 w-3.5" />
              {comments}
            </span>

            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Paperclip className="h-3.5 w-3.5" />
              {attachments}
            </span>

          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <TaskMenu
          taskId={taskId}
          spaceId={spaceId}
          listId={listId}
        />
      </div>

    </div>
  );
}