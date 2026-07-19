import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

import { NotificationProvider } from "@/components/providers/notification-provider";
import {
  CurrentUserProvider,
} from "@/components/providers/current-user-provider";

import {
  SettingsProvider,
} from "@/components/settings/settings-provider";

import SettingsOverlay from "@/components/settings/settings-overlay";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <CurrentUserProvider
      initialUser={{
        id: session.user.id,
        email: session.user.email,
        name: session.user.name ?? null,
        image: session.user.image ?? null,
      }}
    >
      <NotificationProvider>
        <SettingsProvider>
          <Sidebar />

          <div className="ml-72">
            <Topbar />

            <main className="min-h-screen bg-slate-950 p-8">
              {children}
            </main>
          </div>

          <SettingsOverlay />
        </SettingsProvider>
      </NotificationProvider>
    </CurrentUserProvider>
  );
}