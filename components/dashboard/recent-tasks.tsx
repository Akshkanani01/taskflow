import { prisma } from "@/lib/prisma";

export async function RecentTasks() {
const tasks = await prisma.task.findMany({
  orderBy: {
    createdAt: "desc",
  },
  take: 5,
  include: {
    project: true,
  },
});

return ( <div
   className="
     rounded-3xl
     border border-border
     bg-card
     p-6
   "
 > <div className="flex items-center justify-between">

    <div>
      <h3 className="text-xl font-semibold text-foreground">
        Recent Tasks
      </h3>

      <p className="mt-1 text-sm text-muted-foreground">
        Latest workspace activity
      </p>
    </div>

  </div>

  <div className="mt-6 overflow-x-auto">

    <table className="w-full">

      <thead>

        <tr className="border-b border-border">

          <th className="pb-4 text-left text-sm text-muted-foreground">
            Task
          </th>

          <th className="pb-4 text-left text-sm text-muted-foreground">
            Project
          </th>

          <th className="pb-4 text-left text-sm text-muted-foreground">
            Status
          </th>

          <th className="pb-4 text-left text-sm text-muted-foreground">
            Priority
          </th>

        </tr>

      </thead>

      <tbody>

        {tasks.map((task) => (
          <tr
            key={task.id}
            className="border-b border-border"
          >

            <td className="py-4 text-foreground">
              {task.title}
            </td>

            <td className="py-4 text-foreground">
              {task.project?.name}
            </td>

            <td className="py-4">

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

            </td>

            <td className="py-4 text-foreground">
              {task.priority}
            </td>

          </tr>
        ))}

      </tbody>

    </table>

  </div>

</div>

);
}
