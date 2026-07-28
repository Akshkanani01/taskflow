"use client";

import TaskRow from "./task-row";

export type TaskTableItem = {
  id: string;
  title: string;
  status: string;
  priority: string;
  dueDate: Date | null;
  projectId: string;
  spaceId: string;
  createdAt: Date;
  updatedAt: Date;
  taskAssignees: {
    user: {
      id: string;
      name: string | null;
      email: string;
      image: string | null;
    };
  }[];
  comments: {
    id: string;
  }[];
  attachments: {
    id: string;
  }[];
};

type Props = {
  tasks: TaskTableItem[];
};

export default function TaskTable({
  tasks,
}: Props) {
  if (!tasks.length) {
    return (
      <div
        className="
          flex
          h-72
          items-center
          justify-center
          rounded-3xl
          border
          border-border
          bg-[#111827]
          text-muted-foreground
        "
      >
        No Tasks Found
      </div>
    );
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-border
        bg-[#111827]
      "
    >
      {/* HEADER */}

      <div
        className="
          grid
          grid-cols-[360px_130px_130px_170px_240px_64px]
          items-center
          border-b
          border-border
          bg-[#131C2E]
          px-7
          py-4
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.18em]
          text-muted-foreground
        "
      >
        <div className="pl-2">
          Task
        </div>

        <div className="text-center">
          Status
        </div>

        <div className="text-center">
          Priority
        </div>

        <div className="text-center">
          Due Date
        </div>

        <div>
          Assignee
        </div>

        <div />
      </div>

      <div>
        {tasks.map((task) => {
          const assignee =
            task.taskAssignees[0]?.user;

          return (
                        <TaskRow
              key={task.id}
              taskId={task.id}
              spaceId={task.spaceId}
              listId={task.projectId}
              title={task.title}
              status={task.status}
              priority={task.priority}
              dueDate={task.dueDate}
              assignee={
                assignee
                  ? {
                      id: assignee.id,
                      name:
                        assignee.name?.trim() ||
                        assignee.email,
                      email: assignee.email,
                      image: assignee.image,
                    }
                  : null
              }
              comments={task.comments.length}
              attachments={task.attachments.length}
            />
          );
        })}
      </div>
    </div>
  );
}