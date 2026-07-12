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
          text-slate-500
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
      "
    >

      {/* HEADER */}

      <div
        className="
          grid
          grid-cols-[4fr_150px_140px_170px_220px_70px]
          border-b
          border-white/10
          bg-[#0F172A]
          px-8
          py-4
          text-xs
          font-semibold
          uppercase
          tracking-wider
          text-slate-500
        "
      >

        <div>

          Task

        </div>

        <div>

          Status

        </div>

        <div>

          Priority

        </div>

        <div>

          Due Date

        </div>

        <div>

          Assignee

        </div>
        

      </div>
            {/* ROWS */}

      <div className="divide-y divide-white/5">

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
                        assignee.name
                          ?.trim() ||

                        assignee.email,

                      email:
                        assignee.email,

                      image:
                        assignee.image,

                    }

                  : null

              }

              comments={
                task.comments.length
              }

              attachments={
                task.attachments.length
              }

            />

          );

        })}

      </div>
          </div>

  );

}