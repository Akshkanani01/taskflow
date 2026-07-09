"use client";

import {
  UserPlus,
  Shield,
  CheckCircle2,
  MessageSquare,
  Paperclip,
} from "lucide-react";

import { SpaceMember } from "../types";

interface Props {
  member: SpaceMember;
}

const activity = [
  {
    id: 1,
    icon: UserPlus,
    color: "text-sky-400",
    title: "Joined this Space",
    description: "Invited by Workspace Owner",
    time: "Jan 10, 2026",
  },
  {
    id: 2,
    icon: Shield,
    color: "text-violet-400",
    title: "Role Updated",
    description: "Member → Manager",
    time: "Jan 18, 2026",
  },
  {
    id: 3,
    icon: CheckCircle2,
    color: "text-emerald-400",
    title: "Completed Task",
    description: "Landing Page UI",
    time: "Yesterday",
  },
  {
    id: 4,
    icon: MessageSquare,
    color: "text-amber-400",
    title: "Commented",
    description: "Looks good 👍",
    time: "4 hours ago",
  },
  {
    id: 5,
    icon: Paperclip,
    color: "text-cyan-400",
    title: "Uploaded Attachment",
    description: "homepage-v3.fig",
    time: "1 hour ago",
  },
];

export default function ActivityTab({
  member,
}: Props) {
  return (
    <div className="space-y-8">

      <div>

        <h2 className="text-xl font-semibold text-white">
          Activity Timeline
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          Recent activity for {member.name}.
        </p>

      </div>

      <div className="relative">

        <div className="absolute left-5 top-0 bottom-0 w-px bg-zinc-800" />

        <div className="space-y-8">

          {activity.map((item) => {

            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="relative flex gap-5"
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
                    bg-[#141A24]
                  "
                >
                  <Icon
                    size={18}
                    className={item.color}
                  />
                </div>

                <div
                  className="
                    flex-1
                    rounded-[24px]
                    border
                    border-zinc-800
                    bg-[#141A24]
                    p-5
                  "
                >

                  <div className="flex items-start justify-between">

                    <div>

                      <h3 className="font-semibold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm text-zinc-500">
                        {item.description}
                      </p>

                    </div>

                    <span className="text-xs text-zinc-500">
                      {item.time}
                    </span>

                  </div>

                </div>

              </div>
            );

          })}

        </div>

      </div>

    </div>
  );
}