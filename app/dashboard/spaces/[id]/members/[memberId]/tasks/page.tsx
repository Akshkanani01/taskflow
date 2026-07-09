import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

import {
  CheckCircle2,
  Clock3,
  AlertCircle,
} from "lucide-react";

interface Props {
  params: Promise<{
    id: string;
    memberId: string;
  }>;
}

export default async function MemberTasksPage({
  params,
}: Props) {
  const { id, memberId } = await params;

  const member =
    await prisma.spaceMember.findFirst({
      where: {
        spaceId: id,
        userId: memberId,
      },
      include: {
        user: true,
      },
    });

  if (!member) {
    notFound();
  }

  const assignments =
    await prisma.taskAssignee.findMany({
      where: {
        userId: memberId,
      },

      include: {
        task: true,
      },

      orderBy: {
        task: {
          updatedAt: "desc",
        },
      },
    });

  return (
    <main className="space-y-6">

      <div className="rounded-3xl border border-[#222B39] bg-[#121722]">

        <div className="border-b border-[#222B39] px-8 py-5">

          <h2 className="text-xl font-semibold text-white">
            Assigned Tasks
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            {assignments.length} assigned task
            {assignments.length !== 1 ? "s" : ""}
          </p>

        </div>

        {assignments.length === 0 ? (
          <div className="p-16 text-center">

            <CheckCircle2
              size={44}
              className="mx-auto text-zinc-600"
            />

            <h3 className="mt-4 text-lg font-semibold text-white">
              No Tasks Assigned
            </h3>

          </div>
        ) : (
          <div className="divide-y divide-[#222B39]">

            {assignments.map(({ task }) => (
              <Link
                key={task.id}
                href={`/dashboard/spaces/${id}/tasks/${task.id}`}
                className="block p-6 transition hover:bg-white/5"
              >
                <div className="flex items-start justify-between">

                  <div>

                    <h3 className="text-lg font-semibold text-white">
                      {task.title}
                    </h3>

                    <p className="mt-2 text-sm text-zinc-500">
                      {task.description ??
                        "No description"}
                    </p>

                  </div>

                  <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
                    {task.priority}
                  </span>

                </div>

                <div className="mt-5 flex gap-6 text-sm text-zinc-500">

                  <div className="flex items-center gap-2">

                    <AlertCircle size={16} />

                    {task.status}

                  </div>

                  {task.dueDate && (
                    <div className="flex items-center gap-2">

                      <Clock3 size={16} />

                      {format(
                        task.dueDate,
                        "dd MMM yyyy"
                      )}

                    </div>
                  )}

                </div>

              </Link>
            ))}

          </div>
        )}

      </div>

    </main>
  );
}