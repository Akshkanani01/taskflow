"use client";

import {
  UserPlus,
  CheckCircle2,
  MessageSquare,
  Paperclip,
  Shield,
} from "lucide-react";

interface Props {
  member: {
    name: string | null;
  };
}

const activities = [
  {
    id: 1,
    title: "Joined Space",
    description: "Invited by Workspace Owner",
    time: "Jan 10, 2026",
    icon: UserPlus,
    color: "text-sky-400",
  },
  {
    id: 2,
    title: "Completed Task",
    description: "Landing Page UI",
    time: "Yesterday",
    icon: CheckCircle2,
    color: "text-emerald-400",
  },
  {
    id: 3,
    title: "Commented",
    description: "Looks good 👍",
    time: "5 hours ago",
    icon: MessageSquare,
    color: "text-amber-400",
  },
  {
    id: 4,
    title: "Uploaded File",
    description: "homepage-v3.fig",
    time: "2 hours ago",
    icon: Paperclip,
    color: "text-cyan-400",
  },
  {
    id: 5,
    title: "Role Updated",
    description: "Member → Manager",
    time: "Today",
    icon: Shield,
    color: "text-violet-400",
  },
];

export default function MemberActivity({
  member,
}: Props) {
  return (
    <div className="mx-auto max-w-5xl">

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-white">
          Activity
        </h1>

        <p className="mt-2 text-zinc-500">
          Recent activity for {member.name}.
        </p>

      </div>

      <div className="relative">

        <div className="absolute left-5 top-0 h-full w-px bg-zinc-800" />

        <div className="space-y-8">

          {activities.map((activity) => {

            const Icon = activity.icon;

            return (
              <div
                key={activity.id}
                className="relative flex gap-6"
              >
                <div
                  className="
                    relative
                    z-10

                    flex
                    h-10
                    w-10
                    items-center
                    justify-center

                    rounded-full

                    border
                    border-zinc-800

                    bg-[#121A26]
                  "
                >
                  <Icon
                    size={18}
                    className={activity.color}
                  />
                </div>

                <div
                  className="
                    flex-1

                    rounded-[24px]

                    border
                    border-zinc-800

                    bg-[#121A26]

                    p-6
                  "
                >
                  <div className="flex items-center justify-between">

                    <h3 className="font-semibold text-white">
                      {activity.title}
                    </h3>

                    <span className="text-xs text-zinc-500">
                      {activity.time}
                    </span>

                  </div>

                  <p className="mt-3 text-zinc-400">
                    {activity.description}
                  </p>

                </div>

              </div>
            );

          })}

        </div>

      </div>

    </div>
  );
}