import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
try {
const body = await req.json();

const {
  name,
  description,
  spaceId,
} = body;

if (!name || !spaceId) {
  return NextResponse.json(
    {
      error:
        "Name and Space are required",
    },
    {
      status: 400,
    }
  );
}

const project =
  await prisma.project.create({
    data: {
      name,
      description,
      status: "active",
      spaceId,
    },
  });

return NextResponse.json(
  project
);


} catch (error) {
console.error(error);


return NextResponse.json(
  {
    error:
      "Failed to create project",
  },
  {
    status: 500,
  }
);


}
}
