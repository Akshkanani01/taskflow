"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Plus,
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
          text-primary-foreground
          shadow-lg
          shadow-indigo-500/25
        `
        : `
          text-muted-foreground
          hover:bg-muted
          hover:text-foreground
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
        border-border
        bg-background
      "
    >
      <div
        className="
          border-b
          border-border
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
              text-primary-foreground
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
                text-foreground
              "
            >
              TaskFlow
            </h1>

            <p
              className="
                text-xs
                text-muted-foreground
              "
            >
              Enterprise Suite
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8 p-4">

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
                text-muted-foreground
              "
            />

            <Link
              href="/dashboard/spaces/create"
              className="
                rounded-lg
                p-1
                text-muted-foreground
                transition
                hover:bg-muted
                hover:text-foreground
              "
            >
              <Plus size={16} />
            </Link>
          </div>

          <SpacesNav />

        </Section>

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

      </div>

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
          text-muted-foreground
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