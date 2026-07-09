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
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `You're invited to join ${workspaceName}`,
    html: `
      <h2>TaskFlow Invitation</h2>

      <p>
        <strong>${inviterName}</strong>
        invited you to join
        <strong>${workspaceName}</strong>.
      </p>

      <p>
        <a href="${inviteUrl}">
          Accept Invitation
        </a>
      </p>

      <p>${inviteUrl}</p>
    `,
  });
}