import { notFound, redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { AcceptInviteButton } from "@/components/invites/accept-invite-button";
import { headers } from "next/headers";

import { InviteStatus } from "@prisma/client";

import { isInviteExpired } from "@/lib/invites/token";

interface PageProps {
  params: Promise<{
    token: string;
  }>;
}

export default async function InvitePage({
  params,
}: PageProps) {
  const { token } = await params;

  const invite =
    await prisma.workspaceInvite.findUnique({
      where: {
        token,
      },

      include: {
        workspace: {
          select: {
            id: true,
            name: true,
          },
        },

        invitedBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

  if (!invite) {
    notFound();
  }

  if (
    invite.status !== InviteStatus.PENDING
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-10 text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Invitation Already Used
          </h1>

          <p className="mt-4 text-muted-foreground">
            This invitation has already been accepted,
            revoked or expired.
          </p>
        </div>
      </main>
    );
  }

  if (
    isInviteExpired(invite.expiresAt)
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-10 text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Invitation Expired
          </h1>

          <p className="mt-4 text-muted-foreground">
            Ask the workspace owner to send a
            new invitation.
          </p>
        </div>
      </main>
    );
  }

  const session =
    await auth.api.getSession({
      headers: await headers(),
    });

  if (!session) {
    redirect(
  `/login?callbackURL=${encodeURIComponent(`/invite/${token}`)}`
);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-10">

        <h1 className="text-3xl font-bold text-foreground">
          You&apos;re Invited 🎉
        </h1>

        <p className="mt-6 text-foreground">
          <strong>
            {invite.invitedBy?.name ??
              invite.invitedBy?.email}
          </strong>{" "}
          invited you to join
        </p>

        <h2 className="mt-2 text-xl font-semibold text-indigo-400">
          {invite.workspace.name}
        </h2>

        <div className="mt-8 rounded-xl border border-border bg-background p-5">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Email
            </span>

            <span className="text-foreground">
              {invite.email}
            </span>
          </div>

          <div className="mt-4 flex justify-between">
            <span className="text-muted-foreground">
              Role
            </span>

            <span className="text-foreground">
              {invite.role}
            </span>
          </div>
        </div>

        <AcceptInviteButton
  token={token}
/>

      </div>
    </main>
  );
}