import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
req: Request,
{
params,
}: {
params: Promise<{
id: string;
}>;
}
) {
try {
const { id } =
await params;

const body =
  await req.json();

const task =
  await prisma.task.update({
    where: {
      id,
    },
    data: {
      title: body.title,
      description:
        body.description,
      status:
        body.status,
      priority:
        body.priority,
      assignee:
        body.assignee,
      dueDate:
        body.dueDate
          ? new Date(
              body.dueDate
            )
          : null,
    },
  });

return NextResponse.json(
  task
);


} catch (error) {
console.error(error);


return NextResponse.json(
  {
    error:
      "Failed to update task",
  },
  {
    status: 500,
  }
);


}
}
export async function DELETE(
  req: Request,
  { params }: {
    params: Promise<{ id: string }>
  }
) {
  const { id } = await params;

  await prisma.task.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}