import {
  FolderKanban,
  CheckSquare,
  Users,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Lists",
    value: "24",
    change: "+12%",
    icon: FolderKanban,
  },
  {
    title: "Tasks",
    value: "128",
    change: "+18%",
    icon: CheckSquare,
  },
  {
    title: "Team Members",
    value: "18",
    change: "+4%",
    icon: Users,
  },
  {
    title: "Completion Rate",
    value: "87%",
    change: "+9%",
    icon: TrendingUp,
  },
];

export function StatsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="
              rounded-3xl
              border border-border
              bg-card
              p-6
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {stat.title}
                </p>

                <h3 className="mt-3 text-4xl font-bold text-foreground">
                  {stat.value}
                </h3>
              </div>

              <div
                className="
                  flex h-12 w-12
                  items-center justify-center
                  rounded-2xl
                  bg-primary/20
                "
              >
                <Icon
                  size={22}
                  className="text-primary"
                />
              </div>
            </div>

            <div className="mt-6">
              <span
                className="
                  rounded-full
                  bg-success/10
                  px-3 py-1
                  text-xs
                  font-medium
                  text-success
                "
              >
                {stat.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}