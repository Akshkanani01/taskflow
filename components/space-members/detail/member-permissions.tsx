"use client";

import {
  Shield,
  CheckCircle2,
  FolderKanban,
  CheckSquare,
  MessageSquare,
  Paperclip,
} from "lucide-react";

interface Props {
  member: {
    role?: string | null;
  };
}

const permissions = {
  OWNER: {
    Workspace: [
      "Manage Space",
      "Invite Members",
      "Remove Members",
      "Manage Roles",
    ],

    Lists: [
      "Create Lists",
      "Edit Lists",
      "Delete Lists",
    ],

    Tasks: [
      "Create Tasks",
      "Assign Tasks",
      "Delete Tasks",
    ],

    Communication: [
      "Comments",
      "Mentions",
    ],

    Files: [
      "Upload",
      "Delete",
    ],
  },

  MANAGER: {
    Workspace: [
      "View Space",
    ],

    Lists: [
      "Create Lists",
      "Edit Lists",
    ],

    Tasks: [
      "Create",
      "Assign",
      "Edit",
    ],

    Communication: [
      "Comments",
    ],

    Files: [
      "Upload",
    ],
  },

  MEMBER: {
    Workspace: [
      "View Space",
    ],

    Lists: [],

    Tasks: [
      "View",
      "Edit Own",
    ],

    Communication: [
      "Comments",
    ],

    Files: [
      "Upload",
    ],
  },

  VIEWER: {
    Workspace: [
      "View Space",
    ],

    Lists: [],

    Tasks: [
      "View",
    ],

    Communication: [],

    Files: [],
  },
} as const;

const icons = {
  Workspace: Shield,
  Lists: FolderKanban,
  Tasks: CheckSquare,
  Communication: MessageSquare,
  Files: Paperclip,
};

export default function MemberPermissions({
  member,
}: Props) {
  const role =
    (member.role ??
      "MEMBER") as keyof typeof permissions;

  const data = permissions[role];

  return (
    <div className="mx-auto max-w-6xl space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-white">
          Permissions
        </h1>

        <p className="mt-2 text-zinc-500">
          Current role permissions.
        </p>

      </div>

      <div className="rounded-3xl border border-zinc-800 bg-[#121A26] p-8">

        <h2 className="text-2xl font-semibold text-white">

          {role}

        </h2>

      </div>

      {Object.entries(data).map(
        ([title, items]) => {

          const Icon =
            icons[
              title as keyof typeof icons
            ];

          return (
            <section
              key={title}
              className="
                rounded-3xl
                border
                border-zinc-800
                bg-[#121A26]
                p-8
              "
            >

              <div className="mb-6 flex items-center gap-3">

                <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">

                  <Icon size={20} />

                </div>

                <h2 className="text-xl font-semibold text-white">

                  {title}

                </h2>

              </div>

              {items.length === 0 ? (

                <p className="text-zinc-500">
                  No permissions.
                </p>

              ) : (

                <div className="grid gap-4 md:grid-cols-2">

                  {items.map((item: string) => (

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

              )}

            </section>
          );

        }
      )}

    </div>
  );
}