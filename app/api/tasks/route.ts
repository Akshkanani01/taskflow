import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
req: Request
) {
const body = await req.json();

const task = await prisma.task.create({
data: {
title: body.title,
projectId: body.projectId,
status: "todo",
priority: "medium",
},
});

return NextResponse.json(task);
}
