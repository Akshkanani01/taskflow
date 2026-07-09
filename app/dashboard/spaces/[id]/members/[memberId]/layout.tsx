import Link from "next/link";
import { ReactNode } from "react";

import {
  ArrowLeft,
  Activity,
  Shield,
  Folder,
  Settings,
  CheckSquare,
} from "lucide-react";

interface Props {
  children: ReactNode;

  params: Promise<{
    id: string;
    memberId: string;
  }>;
}

const tabs = [
  {
    label: "Overview",
    href: "",
    icon: Activity,
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    label: "Files",
    href: "/files",
    icon: Folder,
  },
  {
    label: "Activity",
    href: "/activity",
    icon: Activity,
  },
  {
    label: "Permissions",
    href: "/permissions",
    icon: Shield,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default async function MemberLayout({
  children,
  params,
}: Props) {
  const { id, memberId } = await params;

  const base =
    `/dashboard/spaces/${id}/members/${memberId}`;

  return (
    <main className="space-y-6">

      {/* Header */}

      <div className="rounded-3xl border border-[#222B39] bg-[#121722] p-8">

        <Link
          href={`/dashboard/spaces/${id}/members`}
          className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={16} />

          Back to Members
        </Link>

        <div className="flex items-center gap-5">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500/20 text-3xl font-bold text-indigo-300">
            M
          </div>

          <div>

            <h1 className="text-3xl font-bold text-white">
              Loading...
            </h1>

            <p className="mt-2 text-zinc-400">
              Member Details
            </p>

          </div>

        </div>

      </div>

      {/* Tabs */}

      <div className="flex gap-3 overflow-x-auto">

        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <Link
              key={tab.label}
              href={`${base}${tab.href}`}
              className="flex items-center gap-2 rounded-xl border border-[#222B39] bg-[#121722] px-5 py-3 text-sm text-zinc-300 transition hover:border-indigo-500 hover:text-white"
            >
              <Icon size={16} />

              {tab.label}
            </Link>
          );
        })}

      </div>

      {children}

    </main>
  );
}