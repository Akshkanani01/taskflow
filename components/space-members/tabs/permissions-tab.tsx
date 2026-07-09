"use client";

import {
  CheckCircle2,
  Shield,
  FolderKanban,
  CheckSquare,
  MessageSquare,
  Paperclip,
} from "lucide-react";

import { SpaceMember } from "../types";

interface Props {
  member: SpaceMember;
}

const PERMISSIONS = {
  OWNER: {
    title: "Owner",
    description:
      "Full access to everything inside this Space.",

    groups: [
      {
        title: "Workspace",
        icon: Shield,
        items: [
          "Manage Space",
          "Invite Members",
          "Remove Members",
          "Manage Roles",
        ],
      },

      {
        title: "Lists",
        icon: FolderKanban,
        items: [
          "Create Lists",
          "Edit Lists",
          "Delete Lists",
        ],
      },

      {
        title: "Tasks",
        icon: CheckSquare,
        items: [
          "Create Tasks",
          "Assign Tasks",
          "Edit Any Task",
          "Delete Tasks",
        ],
      },

      {
        title: "Communication",
        icon: MessageSquare,
        items: [
          "Comment",
          "Mention Members",
        ],
      },

      {
        title: "Attachments",
        icon: Paperclip,
        items: [
          "Upload Files",
          "Delete Files",
        ],
      },
    ],
  },

  MANAGER: {
    title: "Manager",
    description:
      "Can manage work and collaborate inside this Space.",

    groups: [
      {
        title: "Lists",
        icon: FolderKanban,
        items: [
          "Create Lists",
          "Edit Lists",
        ],
      },

      {
        title: "Tasks",
        icon: CheckSquare,
        items: [
          "Create Tasks",
          "Assign Tasks",
          "Edit Tasks",
        ],
      },

      {
        title: "Communication",
        icon: MessageSquare,
        items: [
          "Comment",
          "Mention Members",
        ],
      },
    ],
  },

  MEMBER: {
    title: "Member",
    description:
      "Can collaborate on assigned work.",

    groups: [
      {
        title: "Tasks",
        icon: CheckSquare,
        items: [
          "View Tasks",
          "Create Tasks",
          "Edit Own Tasks",
        ],
      },

      {
        title: "Communication",
        icon: MessageSquare,
        items: [
          "Comment",
        ],
      },

      {
        title: "Attachments",
        icon: Paperclip,
        items: [
          "Upload Files",
        ],
      },
    ],
  },

  VIEWER: {
    title: "Viewer",
    description:
      "Read-only access.",

    groups: [
      {
        title: "Workspace",
        icon: Shield,
        items: [
          "View Space",
        ],
      },

      {
        title: "Tasks",
        icon: CheckSquare,
        items: [
          "View Tasks",
        ],
      },
    ],
  },
} as const;

export default function PermissionsTab({
  member,
}: Props) {
  const config =
    PERMISSIONS[
      member.role as keyof typeof PERMISSIONS
    ];

  return (
    <div className="space-y-8">

      {/* Current Role */}

      <div className="rounded-3xl border border-zinc-800 bg-[#141A24] p-8">

        <p className="text-sm text-zinc-500">
          Current Role
        </p>

        <h2 className="mt-2 text-3xl font-bold text-white">
          {config.title}
        </h2>

        <p className="mt-3 text-zinc-400">
          {config.description}
        </p>

      </div>

      {/* Permission Groups */}

      {config.groups.map((group) => {

        const Icon = group.icon;

        return (
          <div
            key={group.title}
            className="rounded-3xl border border-zinc-800 bg-[#141A24] p-8"
          >

            <div className="mb-6 flex items-center gap-3">

              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                <Icon size={18} />
              </div>

              <h3 className="text-lg font-semibold text-white">
                {group.title}
              </h3>

            </div>

            <div className="space-y-4">

              {group.items.map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-3"
                >

                  <CheckCircle2
                    size={18}
                    className="text-emerald-400"
                  />

                  <span className="text-zinc-300">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </div>
        );

      })}

    </div>
  );
}