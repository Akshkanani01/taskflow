import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import ListPageClient from "./list-page-client";

type Props = {
  params: Promise<{
    id: string;
    listId: string;
  }>;
};

export default async function ListPage({
  params,
}: Props) {
const currentUser = await prisma.user.findFirst();

console.log("CURRENT USER =", currentUser);
  const {
    id: spaceId,
    listId: projectId,
  } = await params;
    const project = await prisma.project.findFirst({
  where: {
    id: projectId,
    spaceId,
  },
  include: {
    space: true,
  },
});

console.log("PROJECT =", project);

  if (!project) {

    notFound();

  }

  const tasks =
    await prisma.task.findMany({

      where: {

        projectId,

        archived: false,

      },

      include: {

        taskAssignees: {

          include: {

            user: true,

          },

        },

        comments: true,

        attachments: true,

      },

      orderBy: [

        {
          position: "asc",
        },

        {
          createdAt: "desc",
        },

      ],

    });
      const members =
    await prisma.workspaceMember.findMany({

      where: {

        workspaceId:
          project.space.workspaceId,

      },

      include: {

        user: true,

      },

      orderBy: {

        joinedAt: "asc",

      },

    });

  return (

    <ListPageClient

      spaceId={spaceId}

      listId={projectId}

      currentUserId={currentUser!.id}

      project={{

        id: project.id,

        name: project.name,

      }}

      tasks={tasks}

    members={members.map((member) => ({
  id: member.user.id,

  name:
    member.user.name ?? "",

  email:
    member.user.email,
}))}

    />

  );

}