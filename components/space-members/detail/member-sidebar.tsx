"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArrowLeft,
  User,
  Shield,
  Activity,
  CheckSquare,
  Paperclip,
  Settings,
} from "lucide-react";

import MemberAvatar from "../member-avatar";
import RoleBadge from "../role-badge";

interface Props {
  spaceId: string;

  member: {
    id: string;
    name: string | null;
    email: string;
    image?: string | null;
    role?: string;
  };
}

const menu = [
  {
    id: "overview",
    label: "Overview",
    icon: User,
  },

  {
    id: "permissions",
    label: "Permissions",
    icon: Shield,
  },

  {
    id: "activity",
    label: "Activity",
    icon: Activity,
  },

  {
    id: "tasks",
    label: "Tasks",
    icon: CheckSquare,
  },

  {
    id: "files",
    label: "Files",
    icon: Paperclip,
  },

  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function MemberSidebar({
  spaceId,
  member,
}: Props) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">

      {/* Back */}

      <div className="border-b border-zinc-800 p-6">

        <Link
          href={`/dashboard/spaces/${spaceId}/members`}
          className="
            inline-flex
            items-center
            gap-2

            rounded-xl

            border
            border-zinc-800

            px-4
            py-2

            text-sm
            text-zinc-400

            transition

            hover:bg-zinc-800
            hover:text-white
          "
        >
          <ArrowLeft size={16} />

          Members
        </Link>

      </div>

      {/* Profile */}

      <div className="border-b border-zinc-800 p-8">

        <div className="flex justify-center">

          <MemberAvatar
            name={member.name ?? "User"}
            avatar={member.image}
            size="xl"
          />

        </div>

        <h2 className="mt-6 text-center text-2xl font-bold text-white">

          {member.name}

        </h2>

        <p className="mt-2 text-center text-sm text-zinc-500">

          {member.email}

        </p>

        <div className="mt-6 flex justify-center">

          <RoleBadge
            role={
              member.role ??
              "MEMBER"
            }
          />

        </div>

      </div>

      {/* Navigation */}

      

      <nav className="flex-1 space-y-2 p-4">
  {menu.map((item) => {
    const Icon = item.icon;

    const href =
      item.id === "overview"
        ? `/dashboard/spaces/${spaceId}/members/${member.id}`
        : `/dashboard/spaces/${spaceId}/members/${member.id}/${item.id}`;

    const active =
      item.id === "overview"
        ? pathname === href
        : pathname.startsWith(href);

    return (
      <Link
        key={item.id}
        href={href}
        className={`
          flex
          items-center
          gap-3

          rounded-2xl

          px-4
          py-3

          transition

          ${
            active
              ? "bg-blue-600 text-white"
              : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
          }
        `}
      >
        <Icon size={18} />
        <span>{item.label}</span>
      </Link>
    );
  })}
</nav>

    </div>
  );
}