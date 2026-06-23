import { prisma } from "@/lib/prisma";
import CreateTaskForm from "./create-task-form";

export default async function TasksPage({
params,
}: {
params: Promise<{
id: string;
}>;
}) {
const { id } = await params;

const projects = await prisma.project.findMany({
where: {
spaceId: id,
},
include: {
tasks: true,
},
orderBy: {
createdAt: "asc",
},
});

const tasks = projects.flatMap(
(project) => project.tasks
);

if (!projects.length) {
return ( <div className="text-white">
No List Found </div>
);
}

return ( <div className="space-y-8"> <div> <h1 className="text-4xl font-bold text-white">
Task List </h1>


    <p className="mt-2 text-slate-400">
      {tasks.length} Tasks
    </p>
  </div>

  <CreateTaskForm
    projectId={projects[0].id}
  />

  <div className="space-y-4">
    {tasks.map((task) => (
      <div
        key={task.id}
        className="
          rounded-2xl
          border border-white/10
          bg-slate-900
          p-4
        "
      >
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-white">
            {task.title}
          </h2>

          <span className="text-xs text-indigo-400">
            {task.priority}
          </span>
        </div>

        <p className="mt-2 text-sm text-slate-400">
          {task.status}
        </p>
      </div>
    ))}
  </div>
</div>

);
}
