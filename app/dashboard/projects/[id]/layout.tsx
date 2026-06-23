import Link from "next/link";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const tabs = [
    {
      name: "Overview",
      href: `/dashboard/projects/${id}/overview`,
    },
    {
      name: "List",
      href: `/dashboard/projects/${id}`,
    },
    {
      name: "Board",
      href: `/dashboard/projects/${id}/board`,
    },
    {
      name: "Calendar",
      href: `/dashboard/projects/${id}/calendar`,
    },
    {
      name: "Files",
      href: `/dashboard/projects/${id}/files`,
    },
    {
      name: "Team",
      href: `/dashboard/projects/${id}/team`,
    },
    {
      name: "Activity",
      href: `/dashboard/projects/${id}/activity`,
    },
    {
      name: "Settings",
      href: `/dashboard/projects/${id}/settings`,
    },
  ];

  return (
    <div className="space-y-8">
      <div
        className="
          overflow-x-auto
          rounded-3xl
          border border-white/10
          bg-slate-900
          p-2
        "
      >
        <div className="flex gap-2 min-w-max">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className="
                rounded-2xl
                px-5
                py-3
                text-sm
                font-medium
                text-slate-300
                transition
                hover:bg-slate-800
                hover:text-white
              "
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </div>

      {children}
    </div>
  );
}