import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
try {
const body = await req.json();

const name = body.name?.trim();

if (!name) {
  return NextResponse.json(
    { error: "Workspace name required" },
    { status: 400 }
  );
}

const user = await prisma.user.findFirst();

if (!user) {
  return NextResponse.json(
    { error: "No user found in database" },
    { status: 400 }
  );
}

const workspace =
  await prisma.workspace.create({
    data: {
      name,
      slug:
        name
          .toLowerCase()
          .replace(/\s+/g, "-") +
        "-" +
        Date.now(),

      ownerId: user.id,
    },
  });

await prisma.space.create({
  data: {
    name: "General",
    workspaceId: workspace.id,
  },
});

return NextResponse.json(
  workspace
);


} catch (error) {
console.error(error);


return NextResponse.json(
  {
    error:
      "Failed to create workspace",
  },
  {
    status: 500,
  }
);
}
}
