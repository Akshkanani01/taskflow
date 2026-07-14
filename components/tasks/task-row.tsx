"use client";

import { useRouter } from "next/navigation";

import {
  Calendar,
  ChevronRight,
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

  const router =
    useRouter();
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
      w-full
      grid-cols-[4fr_150px_140px_170px_220px_70px]
      items-center
      gap-4
      border-b
      border-[#202735]
      px-6
      py-4
      text-left
      transition-all
      duration-200
      hover:bg-[#171D27]
      focus:outline-none
      focus:ring-2
      focus:ring-indigo-500/40
    "
  >

      {/* TASK */}
            <div className="flex items-start gap-4">

        {/* STATUS DOT */}

        <div
          className="
            mt-2
            h-3
            w-3
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
              transition
              group-hover:text-indigo-300
            "
          >
            {title}
          </h3>

          <div
            className="
              mt-3
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

      <div>

        <StatusBadge
          status={status}
        />

      </div>

      {/* PRIORITY */}

      <div>

        <PriorityBadge
          priority={priority}
        />

      </div>

      {/* DUE DATE */}

      <div className="flex items-center gap-2">

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

          <Calendar size={16} />

        </div>

        <div>

          <p className="text-sm text-white">

            {dueDate
              ? dueDate.toLocaleDateString(
                  "en-GB"
                )
              : "No Due Date"}

          </p>

          <p className="text-xs text-slate-500">

            Due Date

          </p>

        </div>

      </div>
            {/* ASSIGNEE */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">
{assignee ? (

  <TaskAvatar
    name={assignee.name}
    email={assignee.email}
    image={assignee.image}
  />

) : (

  <TaskAvatar
    name="Unassigned"
    email=""
    image={null}
  />

)}

          <div className="min-w-0">

  <p className="truncate text-sm font-medium text-white">

  {assignee?.name ||
    "Unassigned"}

</p>

{assignee &&
 assignee.name !== assignee.email && (

  <p className="truncate text-xs text-slate-500">

    {assignee.email}

  </p>

)}

          </div>
          <div className="flex justify-end">

  <TaskActionsMenu
    taskId={taskId}
    spaceId={spaceId}
    listId={listId}
  />

</div>

        </div>


      </div>
          </div>

  );

}