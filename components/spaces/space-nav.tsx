"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  ListTodo,
  Users,
  Activity,
  FolderOpen,
} from "lucide-react";

type Props = {
  spaceId: string;
};

export function SpaceNav({ spaceId }: Props) {
  const pathname = usePathname();

  const nav = [
    {
      label: "Overview",
      href: `/dashboard/spaces/${spaceId}`,
      icon: LayoutGrid,
    },
    {
      label: "Lists",
      href: `/dashboard/spaces/${spaceId}/lists`,
      icon: ListTodo,
    },
    {
      label: "Members",
      href: `/dashboard/spaces/${spaceId}/members`,
      icon: Users,
    },
    {
      label: "Activity",
      href: `/dashboard/spaces/${spaceId}/activity`,
      icon: Activity,
    },
    {
      label: "Files",
      href: `/dashboard/spaces/${spaceId}/files`,
      icon: FolderOpen,
    },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-2 backdrop-blur">
      <nav className="flex flex-wrap gap-2">
        {nav.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={17} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}