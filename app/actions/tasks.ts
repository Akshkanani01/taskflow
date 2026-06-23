"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTask(
title: string,
projectId: string
) {
await prisma.task.create({
data: {
title,
projectId,
status: "todo",
priority: "medium",
},
});

revalidatePath("/dashboard/spaces");
}

export async function deleteTask(
taskId: string
) {
await prisma.task.delete({
where: {
id: taskId,
},
});

revalidatePath("/dashboard/spaces");
}
