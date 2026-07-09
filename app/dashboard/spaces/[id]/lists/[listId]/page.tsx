import { prisma } from "@/lib/prisma";

import CreateTaskForm from "./create-task-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import ListPageClient from "./list-page-client";

type Props = {
  params: Promise<{
    id: string;
    listId: string;
  }>;

  searchParams: Promise<{
    search?: string;
    status?: string;
    priority?: string;
    sort?: string;
  }>;
};

export default async function ListPage({
  params,
  searchParams,
}: Props) {
  const { id, listId } = await params;

  const {
    search = "",
    status = "",
    priority = "",
    sort = "position",
  } = await searchParams;
const session = await auth.api.getSession({
  headers: await headers(),
});

if (!session?.user) {
  notFound();
}
  const project =
  await prisma.project.findFirst({
    where: {
      id: listId,
      spaceId: id,
    },

    select: {
      id: true,
      title: true,
      tasks: {
      where: {
        ...(search && {
          OR: [
            {
              title: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }),

        ...(status && {
          status: status as any,
        }),

        ...(priority && {
          priority: priority as any,
        }),
      },

      include: {
  taskAssignees: {
    take: 5,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  },

  comments: {
    select: {
      id: true,
    },
  },

  attachments: {
    select: {
      id: true,
    },
  },
},

      orderBy:
        sort === "title"
          ? {
              title: "asc",
            }
          : sort === "priority"
          ? {
              priority: "desc",
            }
          : sort === "dueDate"
          ? {
              dueDate: "asc",
            }
          : {
              position: "asc",
            },
      },
    },
  });
  if (!project) {
    return (
      <div className="p-10 text-white">
        Project not found.
      </div>
    );
  }

  const space = await prisma.space.findUnique({
  where: {
    id,
  },
  select: {
    workspaceId: true,
  },
});

if (!space) {
  notFound();
}

const members =
  await prisma.workspaceMember.findMany({
    where: {
      workspaceId: space.workspaceId,
    },
    include: {
      user: true,
    },
  });
const totalTasks =
  project.tasks.length;

const completedTasks =
  project.tasks.filter(
    (task) => task.status === "DONE"
  ).length;

const overdueTasks =
  project.tasks.filter(
    (task) =>
      task.dueDate &&
      task.status !== "DONE" &&
      task.dueDate < new Date()
  ).length;

const completionRate =
  totalTasks === 0
    ? 0
    : Math.round(
        (completedTasks /
          totalTasks) *
          100
      );
  
        return (
  <ListPageClient
  project={project}
  tasks={project.tasks}
        listId={listId}
        title={project.title}
  members={members}
  spaceId={id}
  search={search}
  status={status}
  priority={priority}
  sort={sort}
  totalTasks={totalTasks}
  completedTasks={completedTasks}
  overdueTasks={overdueTasks}
  completionRate={completionRate}
  currentUserId={session.user.id}
/>
);

}