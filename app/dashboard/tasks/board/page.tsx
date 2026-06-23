import { prisma } from "@/lib/prisma";

export default async function BoardPage() {
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const todo = tasks.filter(
    (task) => task.status === "todo"
  );

  const progress = tasks.filter(
    (task) => task.status === "in_progress"
  );

  const review = tasks.filter(
    (task) => task.status === "review"
  );

  const done = tasks.filter(
    (task) => task.status === "done"
  );

  const columns = [
    {
      title: "Todo",
      tasks: todo,
    },
    {
      title: "In Progress",
      tasks: progress,
    },
    {
      title: "Review",
      tasks: review,
    },
    {
      title: "Done",
      tasks: done,
    },
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-4">

      {columns.map((column) => (
        <div
          key={column.title}
          className="
            rounded-3xl
            border border-white/10
            bg-slate-900
            p-4
          "
        >

          <h2 className="mb-4 font-semibold text-white">
            {column.title}
          </h2>

          <div className="space-y-3">

            {column.tasks.map((task) => (
              <div
                key={task.id}
                className="
                  rounded-2xl
                  bg-slate-950
                  p-4
                "
              >
                <h3 className="text-white">
                  {task.title}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  {task.priority}
                </p>

              </div>
            ))}

          </div>

        </div>
      ))}

    </div>
  );
}