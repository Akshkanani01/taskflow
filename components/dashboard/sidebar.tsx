"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  FileText,
  Clock3,
  Settings,
  Plus,
  Sparkles,
} from "lucide-react";

import { SpacesNav } from "@/components/spaces/spaces-nav";

export function Sidebar() {
  const pathname = usePathname();

const spaceMatch = pathname.match(
  /^\/dashboard\/spaces\/([^/]+)/
);

const spaceId = spaceMatch?.[1];


  const isActive = (href: string) => {
  return (
    pathname === href ||
    pathname.startsWith(href + "/")
  );
};

  const menuClass = (
    href: string
  ) => `
    group
    flex
    items-center
    gap-3
    rounded-2xl
    px-4
    py-3
    transition-all
    duration-200
    ${
      isActive(href)
        ? `
          bg-gradient-to-r
          from-indigo-600
          to-violet-600
          text-white
          shadow-lg
          shadow-indigo-500/25
        `
        : `
          text-slate-400
          hover:bg-slate-900
          hover:text-white
        `
    }
  `;

  return (
    <aside
      className="
        fixed
        left-0
        top-0
        z-50
        h-screen
        w-72
        overflow-y-auto
        border-r
        border-white/10
        bg-slate-950
      "
    >
      {/* HEADER */}

      <div
        className="
          border-b
          border-white/10
          p-6
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-indigo-500
              to-violet-600
              font-bold
              text-white
              shadow-lg
              shadow-indigo-500/30
            "
          >
            T
          </div>

          <div>
            <h1
              className="
                text-lg
                font-bold
                text-white
              "
            >
              TaskFlow
            </h1>

            <p
              className="
                text-xs
                text-slate-500
              "
            >
              Enterprise Suite
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8 p-4">

        {/* DASHBOARD */}

        <Section title="Dashboard">
          <Link
            href="/dashboard"
            className={menuClass(
              "/dashboard"
            )}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
        </Section>

        {/* SPACES */}

        <Section title="Spaces">

          <div
            className="
              mb-3
              flex
              items-center
              justify-between
              px-3
            "
          >
            <span
              className="
                text-xs
                uppercase
                tracking-wider
                text-slate-500
              "
            >
              
            </span>

            <Link
              href="/dashboard/spaces/create"
              className="
                rounded-lg
                p-1
                text-slate-400
                transition
                hover:bg-slate-800
                hover:text-white
              "
            >
              <Plus size={16} />
            </Link>
          </div>

          <SpacesNav />
        </Section>

{/* MEMBERS */}

{spaceId && (
  <Section title="Members">
    <Link
      href={`/dashboard/spaces/${spaceId}/members`}
      className={menuClass(
        `/dashboard/spaces/${spaceId}/members`
      )}
    >
      <Users size={18} />

      <span className="flex-1">
        Members
      </span>
    </Link>
  </Section>
)}  
        {/* SETTINGS */}

        
      </div>

      {/* FOOTER */}

      
      

    </aside>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p
        className="
          mb-3
          px-3
          text-xs
          uppercase
          tracking-wider
          text-slate-500
        "
      >
        {title}
      </p>

      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}