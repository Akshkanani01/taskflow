"use server";
import { InviteStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
export async function acceptInvite(
formData: FormData
) {
const token =
formData.get(
"token"
) as string;

if (!token) {
throw new Error(
"Invalid token"
);
}

const invite =
await prisma.workspaceInvite.findUnique({
where: {
token,
},
});

if (!invite) {
throw new Error(
"Invite not found"
);
}

if (
invite.status ===
InviteStatus.ACCEPTED
) {
redirect("/dashboard");
}

if (
invite.expiresAt <
new Date()
) {
throw new Error(
"Invite expired"
);
}

/*
Replace after Better Auth
*/

const session =
  await auth.api.getSession({
    headers:
      await headers(),
  });

if (!session?.user) {
  redirect("/login");
}

const userId =
  session.user.id;
const member =
await prisma.workspaceMember.findFirst({
where: {
workspaceId:
invite.workspaceId,
    userId,
  },
});


if (!member) {
await prisma.workspaceMember.create({
data: {
workspaceId:
invite.workspaceId,


    userId,

    role: invite.role,
  },
});

await createAuditLog({
  workspaceId:
    invite.workspaceId,

  actorId:
    userId,

  action:
    "MEMBER_JOINED",

  target:
    userId,
});


}

await prisma.workspaceInvite.update({
  where: {
    id: invite.id,
  },

  data: {
    status: InviteStatus.ACCEPTED,
  },
});
  redirect("/dashboard/team");
}
