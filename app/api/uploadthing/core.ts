import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@/lib/auth";

const f = createUploadthing();

async function authorize(req: Request) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return {
    userId: session.user.id,
  };
}

export const ourFileRouter = {
  /* ---------------- Avatar ---------------- */

  avatarUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      return authorize(req);
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return {
        uploadedBy: metadata.userId,
        url: file.ufsUrl,
      };
    }),

  /* ---------------- Images ---------------- */

  imageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 10,
    },
  })
    .middleware(async ({ req }) => {
      return authorize(req);
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return {
        uploadedBy: metadata.userId,
        url: file.ufsUrl,
      };
    }),
      /* ---------------- Task Attachments ---------------- */

  attachmentUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 20,
    },

    pdf: {
      maxFileSize: "32MB",
      maxFileCount: 20,
    },

    text: {
      maxFileSize: "16MB",
      maxFileCount: 20,
    },

    video: {
      maxFileSize: "64MB",
      maxFileCount: 5,
    },
  })
    .middleware(async ({ req }) => {
      return authorize(req);
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return {
        uploadedBy: metadata.userId,

        url: file.ufsUrl,

        key: file.key,

        name: file.name,

        size: file.size,

        type: file.type,
      };
    }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;