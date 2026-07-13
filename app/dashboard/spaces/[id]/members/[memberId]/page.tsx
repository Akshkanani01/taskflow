import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

import {
  Mail,
  Calendar,
  CheckCircle2,
  ListTodo,
  Activity,
  Folder,
} from "lucide-react";

interface Props {
  params: Promise<{
    id: string;
    memberId: string;
  }>;
}

export default async function MemberOverviewPage({
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

  const assignedTasks =
    await prisma.taskAssignee.count({
      where: {
        userId: member.userId,
      },
    });

  const completedTasks =
    await prisma.taskAssignee.count({
      where: {
        userId: member.userId,

        task: {
          status: "DONE",
        },
      },
    });

  const activityCount =
    await prisma.taskActivity.count({
      where: {
        task: {
          taskAssignees: {
            some: {
              userId: member.userId,
            },
          },
        },
      },
    });

  const fileCount =
    await prisma.taskAttachment.count({
      where: {
        uploaderId: member.userId,
      },
    });

  return (
    <main className="space-y-6">

      

      {/* Stats */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Assigned Tasks"
          value={assignedTasks}
          icon={<ListTodo size={22} />}
        />

        <StatCard
          title="Completed"
          value={completedTasks}
          icon={<CheckCircle2 size={22} />}
        />

        <StatCard
          title="Activities"
          value={activityCount}
          icon={<Activity size={22} />}
        />

        <StatCard
          title="Files"
          value={fileCount}
          icon={<Folder size={22} />}
        />

      </div>

    </main>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#222B39] bg-[#121722] p-6">

      <div className="flex items-center justify-between">

        <span className="text-sm text-zinc-500">
          {title}
        </span>

        <div className="text-indigo-400">
          {icon}
        </div>

      </div>

      <h2 className="mt-5 text-4xl font-bold text-white">
        {value}
      </h2>

    </div>
  );
}