import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

interface Props {
  params: Promise<{
    token: string;
  }>;
}

export default async function AcceptInvitePage({
  params,
}: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(
      `/login?callbackURL=/invite/${(await params).token}/accept`
    );
  }

  const { token } = await params;

  const invite =
    await prisma.workspaceInvite.findUnique({
      where: {
        token,
      },
    });

  if (!invite) {
    notFound();
  }

  if (invite.status !== "PENDING") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950">
        <h1 className="text-2xl font-bold text-white">
          Invitation already used.
        </h1>
      </main>
    );
  }

  if (invite.expiresAt < new Date()) {
    await prisma.workspaceInvite.update({
      where: {
        id: invite.id,
      },
      data: {
        status: "EXPIRED",
      },
    });

    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950">
        <h1 className="text-2xl font-bold text-white">
          Invitation expired.
        </h1>
      </main>
    );
  }

  const existingWorkspaceMember =
    await prisma.workspaceMember.findFirst({
      where: {
        workspaceId: invite.workspaceId,
        userId: session.user.id,
      },
    });

  if (!existingWorkspaceMember) {
    await prisma.workspaceMember.create({
      data: {
        workspaceId: invite.workspaceId,
        userId: session.user.id,
        role: invite.role,
      },
    });
  }

  if (invite.spaceId) {
    const existingSpaceMember =
      await prisma.spaceMember.findFirst({
        where: {
          spaceId: invite.spaceId,
          userId: session.user.id,
        },
      });

    if (!existingSpaceMember) {
      await prisma.spaceMember.create({
        data: {
          spaceId: invite.spaceId,
          userId: session.user.id,
          role: invite.role,
        },
      });
    }
  }

  await prisma.workspaceInvite.update({
    where: {
      id: invite.id,
    },
    data: {
      status: "ACCEPTED",
      acceptedById: session.user.id,
      acceptedAt: new Date(),
    },
  });

  redirect("/dashboard");
}