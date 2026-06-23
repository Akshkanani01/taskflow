import { prisma } from "@/lib/prisma";
import BoardClient from "@/components/kanban/client/board-client";

export default async function BoardPage() {
const tasks =
await prisma.task.findMany({
include: {
project: true,
},
orderBy: {
createdAt: "desc",
},
});

return ( <div className="space-y-6">


  <div>
    <h1 className="text-4xl font-bold text-white">
      Kanban Board
    </h1>

    <p className="mt-2 text-slate-400">
      Manage tasks visually.
    </p>
  </div>

  <BoardClient
    tasks={tasks}
  />

</div>


);
}
