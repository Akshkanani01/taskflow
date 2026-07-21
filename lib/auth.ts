import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink } from "better-auth/plugins";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

const transporter = nodemailer.createTransport({

  host: process.env.SMTP_HOST,

  port: Number(process.env.SMTP_PORT),

  secure:
    process.env.SMTP_SECURE === "true",

  auth: {

    user: process.env.SMTP_USER,

    pass: process.env.SMTP_PASS,

  },

});


console.log("SMTP Connected");

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  plugins: [
    magicLink({
  sendMagicLink: async ({ email, url }) => {
    console.log("===== MAGIC LINK =====");
    console.log("To:", email);
    console.log("URL:", url);

    try {
      const info = await transporter.sendMail({
        from: `"TaskFlow" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: "Sign in to TaskFlow",
        html: `
          <h2>TaskFlow Login</h2>
          <a href="${url}">Sign In</a>
        `,
      });

      console.log("MAIL SENT");
      console.log(info);
    } catch (err) {
      console.error("MAIL ERROR");
      console.error(err);
      throw err;
    }
  },
}),
  ],
});