import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
try {
const body = await req.json();

const {
  name,
  color,
  workspaceId,
} = body;

if (!name || !workspaceId) {
  return NextResponse.json(
    {
      error:
        "Name and Workspace are required",
    },
    {
      status: 400,
    }
  );
}

const space =
  await prisma.space.create({
    data: {
      name,
      color:
        color || "blue",
      workspaceId,
    },
  });

return NextResponse.json(
  space
);


} catch (error) {
console.error(error);


return NextResponse.json(
  {
    error:
      "Failed to create space",
  },
  {
    status: 500,
  }
);


}
}
