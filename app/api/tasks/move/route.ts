import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
req: Request
) {
try {
const body =
await req.json();

const {
  taskId,
  status,
} = body;

await prisma.task.update({
  where: {
    id: taskId,
  },
  data: {
    status,
  },
});

return NextResponse.json({
  success: true,
});


} catch (error) {
console.error(error);


return NextResponse.json(
  {
    success: false,
  },
  {
    status: 500,
  }
);


}
}
