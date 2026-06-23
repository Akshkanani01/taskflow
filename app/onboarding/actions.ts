"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function createWorkspace(
formData: FormData
) {
const user = await getCurrentUser();

const name = formData.get("name")?.toString() ?? "";

const slug = name
  .toLowerCase()
  .trim()
  .replace(/\s+/g, "-")
  .replace(/[^a-z0-9-]/g, "");

const workspace = await prisma.workspace.create({
  data: {
    name,
    slug,
    ownerId: user.id,
  },
});

redirect(
`/onboarding/space?workspaceId=${workspace.id}`
);
}

export async function createSpace(
formData: FormData
) {
const workspaceId =
formData.get("workspaceId")?.toString() ?? "";

const name =
formData.get("name")?.toString() ?? "";

const color =
formData.get("color")?.toString() ?? "blue";

if (!workspaceId) {
throw new Error("Workspace ID missing");
}

await prisma.space.create({
data: {
workspaceId,
name,
color,
},
});

redirect("/dashboard");
}
