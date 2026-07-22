import Link from "next/link";
import { ReactNode } from "react";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import {
  ArrowLeft,
  Activity,
  Shield,
  Folder,
  Settings,
  CheckSquare,
  Mail,
  Calendar,
  Crown,
  UserCircle2,
} from "lucide-react";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

  const session =
    await auth.api.getSession({

      headers: await headers(),

    });

  if (!session?.user) {

    redirect("/login");

  }

  const {
    id: spaceId,
    memberId,
  } = await params;
  console.log("PARAMS", {
  spaceId,
  memberId,
});  
  console.log("LAYOUT PARAMS", { spaceId, memberId });

const member = await prisma.spaceMember.findFirst({
  where: {
    id: memberId,
    spaceId,
  },
  include: {
    user: true,
    space: {
      include: {
        workspace: true,
      },
    },
  },
});

console.log("LAYOUT MEMBER", member?.id ?? null);

if (!member) {
  console.log("LAYOUT -> NOT_FOUND");
  notFound();
}

const base =
  `/dashboard/spaces/${spaceId}/members/${member.id}`;
  const initials =
    (
      member.user.name ??
      member.user.email
    )
      .charAt(0)
      .toUpperCase();
        return (

    <main className="space-y-8">

      {/* HERO */}

      <section
        className="
          overflow-hidden
          rounded-[32px]
          border
          border-white/10
          bg-gradient-to-br
          from-[#111827]
          via-[#0F172A]
          to-[#0B1220]
        "
      >

        <div className="relative">

          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_top_right,#4F46E520,transparent_45%)]
            "
          />

          <div className="relative p-8 lg:p-10">

            <Link
              href={`/dashboard/spaces/${spaceId}/members`}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-4
                py-2
                text-sm
                text-slate-300
                transition
                hover:bg-white/10
              "
            >

              <ArrowLeft size={16} />

              Back to Members

            </Link>

            <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex items-center gap-6">

                {member.user.image ? (

                  <img
                    src={member.user.image}
                    alt=""
                    className="
                      h-24
                      w-24
                      rounded-full
                      border-4
                      border-white/10
                      object-cover
                    "
                  />

                ) : (

                  <div
                    className="
                      flex
                      h-24
                      w-24
                      items-center
                      justify-center
                      rounded-full
                      bg-indigo-600
                      text-4xl
                      font-bold
                      text-white
                    "
                  >

                    {initials}

                  </div>

                )}

                <div>

                  <div className="flex flex-wrap items-center gap-3">

                    <h1 className="text-4xl font-bold text-white">

                      {member.user.name ||
                        member.user.email}

                    </h1>

                    <span
                      className="
                        rounded-full
                        bg-indigo-500/15
                        px-4
                        py-1
                        text-xs
                        font-semibold
                        uppercase
                        tracking-wider
                        text-indigo-300
                      "
                    >

                      {member.role}

                    </span>

                  </div>

                  <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-400">

                    <div className="flex items-center gap-2">

                      <Mail size={16} />

                      {member.user.email}

                    </div>

                    <div className="flex items-center gap-2">

                      <Calendar size={16} />

                      Joined{" "}

                      {member.joinedAt.toLocaleDateString(
                        "en-GB"
                      )}

                    </div>

                  </div>

                </div>

              </div>

              <div
                className="
                  grid
                  gap-4
                  sm:grid-cols-2
                "
              >

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    p-5
                  "
                >

                  <p className="text-xs uppercase tracking-widest text-slate-500">

                    Workspace

                  </p>

                  <p className="mt-3 text-lg font-semibold text-white">

                    {member.space.workspace.name}

                  </p>

                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    p-5
                  "
                >

                  <p className="text-xs uppercase tracking-widest text-slate-500">

                    Space

                  </p>

                  <p className="mt-3 text-lg font-semibold text-white">

                    {member.space.name}

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
            {/* NAVIGATION */}

      <div className="sticky top-20 z-20">

        <div className="flex gap-3 overflow-x-auto rounded-3xl border border-white/10 bg-[#111827]/95 p-3 backdrop-blur-xl">

          {tabs.map((tab) => {

            const Icon = tab.icon;

            return (

              <Link
                key={tab.label}
                href={`${base}${tab.href}`}
                className="
                  flex
                  items-center
                  gap-2
                  whitespace-nowrap
                  rounded-2xl
                  px-5
                  py-3
                  text-sm
                  font-medium
                  text-slate-300
                  transition-all
                  duration-200
                  hover:bg-indigo-600
                  hover:text-white
                "
              >

                <Icon size={17} />

                {tab.label}

              </Link>

            );

          })}

        </div>

      </div>

      {/* CONTENT */}

      <section
        className="
          rounded-3xl
          border
          border-white/10
          bg-[#111827]
          p-8
        "
      >

        {children}

      </section>

    </main>

  );

}