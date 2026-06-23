import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink } from "better-auth/plugins";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: email,
          subject: "Sign in to TaskFlow",
          html: `
            <div style="font-family:Arial,sans-serif">
              <h2>TaskFlow Login</h2>

              <p>Click the button below to sign in.</p>

              <a
                href="${url}"
                style="
                  display:inline-block;
                  padding:12px 20px;
                  background:#000;
                  color:#fff;
                  text-decoration:none;
                  border-radius:8px;
                "
              >
                Sign In
              </a>

              <p style="margin-top:20px;">
                Or copy this link:
              </p>

              <p>${url}</p>
            </div>
          `,
        });
      },
    }),
  ],
});