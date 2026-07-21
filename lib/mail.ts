import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface InviteEmailInput {
  email: string;
  inviterName: string;
  workspaceName: string;
  inviteUrl: string;
}

export async function sendWorkspaceInviteEmail({
  email,
  inviterName,
  workspaceName,
  inviteUrl,
}: InviteEmailInput) {
  try {
  const info = await transporter.sendMail({
    from: `"TaskFlow" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: `Invitation to join ${workspaceName}`,

    text: `
${inviterName} invited you to join ${workspaceName}.

Open the link below to accept the invitation:

${inviteUrl}

If you weren't expecting this invitation, you can safely ignore this email.
`,

    html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"/>
</head>

<body
style="
margin:0;
padding:40px;
background:#f4f7fb;
font-family:Inter,Arial,sans-serif;
"
>

<table
width="100%"
cellpadding="0"
cellspacing="0"
>

<tr>

<td align="center">

<table
width="620"
cellpadding="0"
cellspacing="0"
style="
background:#ffffff;
border-radius:18px;
overflow:hidden;
box-shadow:
0 10px 35px rgba(0,0,0,.08);
"
>

<tr>

<td
style="
padding:42px;
"
>

<div
style="
font-size:30px;
font-weight:700;
color:#111827;
"
>

TaskFlow

</div>

<p
style="
margin-top:24px;
font-size:18px;
color:#111827;
"
>

You've been invited to join

</p>

<h2
style="
margin:8px 0;
color:#4f46e5;
"
>

${workspaceName}

</h2>

<p
style="
font-size:15px;
color:#6b7280;
line-height:1.7;
"
>

<b>${inviterName}</b>
has invited you to collaborate
inside TaskFlow.

</p>

<div
style="
margin:36px 0;
"
>

<a
href="${inviteUrl}"
style="
display:inline-block;
padding:16px 32px;
background:#4f46e5;
color:#ffffff;
text-decoration:none;
border-radius:12px;
font-weight:600;
"
>

Accept Invitation

</a>

</div>

<p
style="
font-size:14px;
color:#6b7280;
"
>

Or copy this link into your browser:

</p>

<p
style="
word-break:break-all;
font-size:13px;
color:#4f46e5;
"
>

${inviteUrl}

</p>

<hr
style="
margin:40px 0;
border:none;
border-top:1px solid #e5e7eb;
"
/>

<p
style="
font-size:13px;
color:#9ca3af;
line-height:1.7;
"
>

If you weren't expecting this invitation,
you can safely ignore this email.

</p>

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`,
  });

  console.log("==================================");
  console.log("MAIL SENT SUCCESSFULLY");
  console.log("Message ID :", info.messageId);
  console.log("Accepted  :", info.accepted);
  console.log("Rejected  :", info.rejected);
  console.log("Response  :", info.response);
  console.log("==================================");

  return info;
} catch (error) {
  console.error("==================================");
  console.error("MAIL SEND FAILED");
  console.error(error);
  console.error("==================================");

  throw error;
}
}