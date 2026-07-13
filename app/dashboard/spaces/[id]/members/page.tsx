import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import MembersClient from "@/components/space-members/members-client";
import {
  SpaceRole,
} from "@/components/space-members/types";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SpaceMembersPage({
  params,
}: Props) {

  const {
    id: spaceId,
  } = await params;

  const space =
    await prisma.space.findUnique({

      where: {
        id: spaceId,
      },

      select: {

        id: true,

        workspaceId: true,

        name: true,

      },

    });

  if (!space) {
    notFound();
  }

  const members =
    await prisma.spaceMember.findMany({

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

      members.map(
        async (member) => {

          const [
            assigned,
            completed,
          ] = await Promise.all([

            prisma.taskAssignee.count({

              where: {

                userId:
                  member.userId,

              },

            }),

            prisma.taskAssignee.count({

              where: {

                userId:
                  member.userId,

                task: {

                  status:
                    "DONE",

                },

              },

            }),

          ]);

          return {

            /**
             * IMPORTANT
             * Member Detail Page
             * userId use kare che.
             */

            id: member.user.id,

            userId:
              member.user.id,

            name:
              member.user.name ??
              "Unknown User",

            email:
              member.user.email,

            avatar:
              member.user.image,

            role:
              member.role as SpaceRole,

            joinedAt:
              member.joinedAt.toISOString(),

            taskCount:
              assigned,

            completedTasks:
              completed,

          };

        }

      )

    );
      const pendingInvites =
    await prisma.workspaceInvite.findMany({

      where: {

        workspaceId:
          space.workspaceId,

        status: "PENDING",

      },

      orderBy: {

        createdAt: "desc",

      },

    });

  const formattedPendingInvites =
    pendingInvites.map(
      (invite) => ({

        id: invite.id,

        email: invite.email,

        role: invite.role,

        token: invite.token,

        createdAt:
          invite.createdAt.toISOString(),

      })
    );

  /**
   * Premium Member Dashboard
   */

  return (

    <MembersClient

      members={formattedMembers}

      pendingInvites={
        formattedPendingInvites
      }

      spaceId={spaceId}

      workspaceId={
        space.workspaceId
      }

    />

  );

}