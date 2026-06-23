"use client";

import { KanbanBoard } from "../kanban-board";

export default function BoardClient({
tasks,
}: {
tasks: any[];
}) {
return ( <KanbanBoard
   tasks={tasks}
 />
);
}
