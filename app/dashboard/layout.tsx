import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

import { NotificationProvider } from "@/components/providers/notification-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NotificationProvider>

      <Sidebar />

      <div className="ml-72">

        <Topbar />

        <main
          className="
            min-h-screen
            bg-slate-950
            p-8
          "
        >
          {children}
        </main>

      </div>

    </NotificationProvider>
  );
}