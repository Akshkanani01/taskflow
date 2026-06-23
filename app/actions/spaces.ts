"use server";

import { prisma } from "@/lib/prisma";

export async function getSpaces() {
return prisma.space.findMany({
include: {
workspace: true,
},
orderBy: {
createdAt: "desc",
},
});
}
