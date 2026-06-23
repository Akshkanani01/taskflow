"use client";

import { DndContext } from "@dnd-kit/core";
import { useRouter } from "next/navigation";
import { KanbanColumn } from "./kanban-column";

export function KanbanBoard({
tasks,
}: {
tasks: any[];
}) {
const router =
useRouter();

const todo =
tasks.filter(
(task) =>
task.status ===
"todo"
);

const inProgress =
tasks.filter(
(task) =>
task.status ===
"in_progress"
);

const done =
tasks.filter(
(task) =>
task.status ===
"done"
);

async function handleDragEnd(
event: any
) {
const {
active,
over,
} = event;

if (!over) return;

const taskId =
  active.id;

const newStatus =
  over.id;

try {
  await fetch(
    "/api/tasks/move",
    {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        taskId,
        status:
          newStatus,
      }),
    }
  );

  router.refresh();
} catch (error) {
  console.error(error);
}


}

return (
<DndContext
onDragEnd={
handleDragEnd
}
> <div
     className="
       grid gap-6
       lg:grid-cols-3
     "
   > <KanbanColumn
       id="todo"
       title="Todo"
       tasks={todo}
     />


    <KanbanColumn
      id="in_progress"
      title="In Progress"
      tasks={inProgress}
    />

    <KanbanColumn
      id="done"
      title="Done"
      tasks={done}
    />
  </div>
</DndContext>


);
}
