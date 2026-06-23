import {
FolderKanban,
CheckSquare,
Users,
TrendingUp,
} from "lucide-react";

const stats = [
{
title: "lists",
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
return ( <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

  {stats.map((stat) => {
    const Icon = stat.icon;

    return (
      <div
        key={stat.title}
        className="
          rounded-3xl
          border border-white/10
          bg-slate-900
          p-6
        "
      >

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-400">
              {stat.title}
            </p>

            <h3 className="mt-3 text-4xl font-bold text-white">
              {stat.value}
            </h3>

          </div>

          <div
            className="
              flex h-12 w-12
              items-center justify-center
              rounded-2xl
              bg-indigo-600/20
            "
          >
            <Icon
              size={22}
              className="text-indigo-400"
            />
          </div>

        </div>

        <div className="mt-6">

          <span
            className="
              rounded-full
              bg-green-500/10
              px-3 py-1
              text-xs
              font-medium
              text-green-400
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
