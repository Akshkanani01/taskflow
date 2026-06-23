"use server";

import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

import nodemailer from "nodemailer";
import { randomUUID } from "crypto";

const transporter =
nodemailer.createTransport({
host:
process.env.SMTP_HOST,


port: Number(
  process.env.SMTP_PORT
),

secure: true,

auth: {
  user:
    process.env.SMTP_USER,

  pass:
    process.env.SMTP_PASS,
},


});

export async function createInvite(
workspaceId: string,
email: string,
role: string
) {
const workspace =
await prisma.workspace.findUnique({
where: {
id: workspaceId,
},
});

if (!workspace) {
throw new Error(
"Workspace not found"
);
}

const existingInvite =
await prisma.workspaceInvite.findFirst({
where: {
workspaceId,
email,
status:
"pending",
},
});

if (existingInvite) {
throw new Error(
"Pending invite already exists"
);
}

const token =
randomUUID();

const invite =
await prisma.workspaceInvite.create({
data: {
email,

    role:
      role as any,

    token,

    workspaceId,

    expiresAt:
      new Date(
        Date.now() +
          7 *
            24 *
            60 *
            60 *
            1000
      ),
  },
});


const baseUrl =
process.env
.NEXT_PUBLIC_APP_URL ||
"http://localhost:3000";

const inviteUrl =
`${baseUrl}/invite/${token}`;

await transporter.sendMail({
from:
process.env.EMAIL_FROM,


to: email,

subject:
  `Invitation to join ${workspace.name}`,

html: `
  <div style="font-family:Arial,sans-serif">

    <h2>
      Workspace Invitation
    </h2>

    <p>
      You have been invited
      to join
      <strong>
        ${workspace.name}
      </strong>
    </p>

    <p>
      Role:
      <strong>
        ${role}
      </strong>
    </p>

    <br/>

    <a
      href="${inviteUrl}"
      style="
        display:inline-block;
        padding:12px 20px;
        background:#4f46e5;
        color:#fff;
        text-decoration:none;
        border-radius:10px;
      "
    >
      Accept Invitation
    </a>

  </div>
`,


});

await createAuditLog({
workspaceId,


action:
  "INVITE_CREATED",

target:
  invite.email,

metadata: {
  role:
    invite.role,
},


});

return invite;
}

export async function revokeInvite(
inviteId: string
) {
const invite =
await prisma.workspaceInvite.findUnique({
where: {
id: inviteId,
},
});

if (!invite) {
throw new Error(
"Invite not found"
);
}

await prisma.workspaceInvite.delete({
where: {
id: inviteId,
},
});

await createAuditLog({
workspaceId:
invite.workspaceId,


action:
  "INVITE_REVOKED",

target:
  invite.email,


});

return {
success: true,
};
}

export async function resendInvite(
inviteId: string
) {
const invite =
await prisma.workspaceInvite.findUnique({
where: {
id: inviteId,
},


  include: {
    workspace: true,
  },
});


if (!invite) {
throw new Error(
"Invite not found"
);
}

const baseUrl =
process.env
.NEXT_PUBLIC_APP_URL ||
"http://localhost:3000";

const inviteUrl =
`${baseUrl}/invite/${invite.token}`;

await transporter.sendMail({
from:
process.env.EMAIL_FROM,

to:
  invite.email,

subject:
  `Invitation to join ${invite.workspace.name}`,

html: `
  <div style="font-family:Arial,sans-serif">

    <h2>
      Workspace Invitation
    </h2>

    <p>
      Click below
      to join
      ${invite.workspace.name}
    </p>

    <br/>

    <a
      href="${inviteUrl}"
      style="
        display:inline-block;
        padding:12px 20px;
        background:#4f46e5;
        color:white;
        text-decoration:none;
        border-radius:10px;
      "
    >
      Accept Invite
    </a>

  </div>
`,


});

await createAuditLog({
workspaceId:
invite.workspaceId,


action:
  "INVITE_RESENT",

target:
  invite.email,

});

return {
success: true,
};
}
