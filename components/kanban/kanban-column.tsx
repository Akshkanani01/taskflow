"use client";

import { useDroppable } from "@dnd-kit/core";
import { KanbanCard } from "./kanban-card";

export function KanbanColumn({
id,
title,
tasks,
}: {
id: string;
title: string;
tasks: any[];
}) {
const {
setNodeRef,
} = useDroppable({
id,
});

return ( <div
   ref={setNodeRef}
   className="
     min-h-[600px]
     rounded-3xl
     bg-slate-950
     p-4
   "
 > <div
     className="
       mb-4 flex
       items-center justify-between
     "
   > <h2
       className="
         font-semibold
         text-white
       "
     >
{title} </h2>


    <span
      className="
        rounded-full
        bg-slate-800
        px-2 py-1
        text-xs
        text-slate-300
      "
    >
      {tasks.length}
    </span>
  </div>

  <div className="space-y-3">
    {tasks.map((task) => (
      <KanbanCard
        key={task.id}
        task={task}
      />
    ))}
  </div>
</div>

);
}
