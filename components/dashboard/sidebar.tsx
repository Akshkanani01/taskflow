"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  Users,
  UserPlus,
  Shield,
  Activity,
  Lock,
  BarChart3,
  FileText,
  Clock3,
  Settings,
  Plus,
  Sparkles,
  Bell,
} from "lucide-react";

import { SpacesNav } from "@/components/spaces/spaces-nav";
import { useNotificationStream } from "@/hooks/notifications/use-notification-stream";

export function Sidebar() {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);

  // 🔥 TEMP userId (replace with session.user.id in production)
  const userId = "test-user";

  const { notifications } = useNotificationStream(userId);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => {
    if (!mounted) return false;

    return pathname === href || pathname.startsWith(href + "/");
  };

  const menuClass = (href: string) => `
    group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200
    ${
      isActive(href)
        ? `
          bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25
        `
        : `
          text-slate-400 hover:bg-slate-900 hover:text-white
        `
    }
  `;

  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-72 overflow-y-auto border-r border-white/10 bg-slate-950">

      {/* HEADER */}
      <div className="border-b border-white/10 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 font-bold text-white shadow-lg shadow-indigo-500/30">
            T
          </div>

          <div>
            <h1 className="text-lg font-bold text-white">TaskFlow</h1>
            <p className="text-xs text-slate-500">Enterprise Suite</p>
          </div>
        </div>
      </div>

      <div className="space-y-8 p-4">

        {/* DASHBOARD */}
        <Section title="Dashboard">
          <Link href="/dashboard" className={menuClass("/dashboard")}>
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
        </Section>
        <Section title="Productivity">

          <Link
            href="/dashboard/notifications"
            className={menuClass("/dashboard/notifications")}
          >
            <div className="relative flex items-center gap-3">
              <Bell size={18} />

              <span>Notifications</span>

              {/* 🔴 UNREAD BADGE */}
              {unreadCount > 0 && (
                <span className="absolute -right-6 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] text-white">
                  {unreadCount}
                </span>
              )}
            </div>
          </Link>

        </Section>

        {/* SPACES */}
        <Section title="Spaces">

          <div className="mb-3 flex items-center justify-between px-3">
            <Link
              href="/dashboard/spaces/create"
              className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              <Plus size={16} />
            </Link>
          </div>

          <SpacesNav />
        </Section>

        {/* TEAM */}
        <Section title="Team">
          <Link href="/dashboard/team" className={menuClass("/dashboard/team")}>
            <Users size={18} /> Team Overview
          </Link>

          <Link href="/dashboard/team/members" className={menuClass("/dashboard/team/members")}>
            <Users size={18} /> Members
          </Link>

          <Link href="/dashboard/team/invites" className={menuClass("/dashboard/team/invites")}>
            <UserPlus size={18} /> Invites
          </Link>

          <Link href="/dashboard/team/roles" className={menuClass("/dashboard/team/roles")}>
            <Shield size={18} /> Roles
          </Link>

          <Link href="/dashboard/team/permissions" className={menuClass("/dashboard/team/permissions")}>
            <Lock size={18} /> Permissions
          </Link>

          <Link href="/dashboard/team/activity" className={menuClass("/dashboard/team/activity")}>
            <Activity size={18} /> Activity
          </Link>
        </Section>

        {/* MANAGEMENT */}
        <Section title="Management">

          <Link href="/dashboard/analytics" className={menuClass("/dashboard/analytics")}>
            <BarChart3 size={18} /> Analytics
          </Link>

          <Link href="/dashboard/reports" className={menuClass("/dashboard/reports")}>
            <FileText size={18} /> Reports
          </Link>

          <Link href="/dashboard/time-tracking" className={menuClass("/dashboard/time-tracking")}>
            <Clock3 size={18} /> Time Tracking
          </Link>

        </Section>

        {/* PRODUCTIVITY + NOTIFICATIONS */}
        
        {/* SETTINGS */}
        <Section title="Settings">
          <Link href="/dashboard/settings" className={menuClass("/dashboard/settings")}>
            <Settings size={18} /> Settings
          </Link>
        </Section>

      </div>

      

    </aside>
  );
}

/* SECTION COMPONENT */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-3 px-3 text-xs uppercase tracking-wider text-slate-500">
        {title}
      </p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}