import { DashboardHero } from "@/components/dashboard/hero";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { ListChart } from "@/components/dashboard/project-chart";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { RecentTasks } from "@/components/dashboard/recent-tasks";
import { TeamPerformance } from "@/components/dashboard/team-performance";
import { UpcomingDeadlines } from "@/components/dashboard/upcoming-deadlines";

export default function DashboardPage() {
  return (
    <div className="space-y-8">

  <DashboardHero />

  <StatsGrid />

  <div className="grid gap-8 lg:grid-cols-3">

    <div className="lg:col-span-2">
      <ListChart />
    </div>

    <ActivityFeed />

  </div>

  <div className="grid gap-8 lg:grid-cols-2">

    <TeamPerformance />

    <UpcomingDeadlines />

  </div>

  <RecentTasks />

</div>

);
}
