"use client";

import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import TaskDrawer from "@/components/tasks/drawer/task-drawer";

type Task = {
id: string;
title: string;
description?: string | null;
status: string;
priority: string;
assignee?: string | null;
dueDate?: string | null;
};

export function KanbanCard({
task,
}: {
task: Task;
}) {
const [open, setOpen] =
useState(false);

const {
attributes,
listeners,
setNodeRef,
transform,
} = useDraggable({
id: task.id,
});

const style = {
transform:
CSS.Translate.toString(
transform
),
};

const priorityColor =
task.priority === "urgent"
? "text-red-400"
: task.priority === "high"
? "text-orange-400"
: task.priority === "medium"
? "text-yellow-400"
: "text-green-400";

return (
<>
<div
ref={setNodeRef}
style={style}
{...listeners}
{...attributes}
onClick={() =>
setOpen(true)
}
className="
cursor-grab
rounded-2xl
border border-white/10
bg-slate-900
p-4
transition-all
hover:border-indigo-500
hover:bg-slate-800
"
> <div className="flex items-start justify-between">

      <h3 className="font-medium text-white">
        {task.title}
      </h3>

      <span
        className={`
          text-xs font-medium
          ${priorityColor}
        `}
      >
        {task.priority}
      </span>

    </div>

    {task.description && (
      <p
        className="
          mt-3 line-clamp-2
          text-sm text-slate-400
        "
      >
        {task.description}
      </p>
    )}

    <div
      className="
        mt-4 flex
        items-center justify-between
      "
    >
      <span
        className="
          rounded-full
          bg-indigo-500/10
          px-3 py-1
          text-xs
          text-indigo-400
        "
      >
        {task.status}
      </span>

      <span
        className="
          text-xs
          text-slate-500
        "
      >
        {task.assignee ||
          "Unassigned"}
      </span>
    </div>
  </div>

  <TaskDrawer
    task={task}
    open={open}
    onClose={() =>
      setOpen(false)
    }
  />
</>

);
}
