
import { prisma } from "@/lib/prisma";
import MembersClient from "@/components/space-members/members-client";
import { SpaceRole } from "@/components/space-members/types";
import { notFound } from "next/navigation";
type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SpaceMembersPage({
  params,
}: Props) {
  const { id: spaceId } = await params;
const space = await prisma.space.findUnique({
  where: {
    id: spaceId,
  },
  select: {
    workspaceId: true,
  },
});

if (!space) {
  notFound();
}
  const members = await prisma.spaceMember.findMany({
    where: {
      spaceId,
    },
    include: {
      user: true,
    },
    orderBy: {
      joinedAt: "asc",
    },
  });

  const formattedMembers =
  await Promise.all(
    members.map(async (member) => {
      const assigned =
        await prisma.taskAssignee.count({
          where: {
            userId: member.userId,
          },
        });

      const completed =
        await prisma.taskAssignee.count({
          where: {
            userId: member.userId,
            task: {
              status: "DONE",
            },
          },
        });

      return {
        id: member.user.id,
        name:
          member.user.name ??
          "Unknown User",
        email: member.user.email,
        avatar:
          member.user.image,
        role: member.role as SpaceRole,
        joinedAt:
          member.joinedAt.toISOString(),
        taskCount: assigned,
        completedTasks:
          completed,
      };
    })
  );

const pendingInvites =
  await prisma.workspaceInvite.findMany({
    where: {
      workspaceId: space.workspaceId,
      status: "PENDING",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

const formattedPendingInvites =
  pendingInvites.map((invite) => ({
    id: invite.id,
    email: invite.email,
    role: invite.role,
    token: invite.token,
    createdAt: invite.createdAt.toISOString(),
  }));
  return (
 <MembersClient
  members={formattedMembers}
  pendingInvites={formattedPendingInvites}
  spaceId={spaceId}
  workspaceId={space.workspaceId}
/>
  );
}