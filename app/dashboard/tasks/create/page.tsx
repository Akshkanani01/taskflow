import { prisma } from "@/lib/prisma";
import TaskForm from "./task-form";

export default async function CreateTaskPage() {
  const projects =
    await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
if (projects.length === 0) {
  return (
    <div className="p-10 text-white">
      No Projects Found
    </div>
  );
}
  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-4xl font-bold text-white">
        Create Task
      </h1>

      <div
        className="
          rounded-3xl
          border border-white/10
          bg-slate-900
          p-8
        "
      >
        <TaskForm
          projects={projects}
        />
      </div>
    </div>
  );
}