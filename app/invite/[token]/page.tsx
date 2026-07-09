import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    token: string;
  }>;
};

export default async function InvitePage({
  params,
}: Props) {
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
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        This invitation has already been used.
      </main>
    );
  }

  if (invite.expiresAt < new Date()) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        This invitation has expired.
      </main>
    );
  }

  const session =
    await auth.api.getSession({
      headers: await headers(),
    });

  if (!session?.user) {
    redirect(
      `/login?callbackURL=/invite/${token}`
    );
  }

  redirect(`/invite/${token}/accept`);
}