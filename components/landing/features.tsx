import {
FolderKanban,
CheckSquare,
Users,
BarChart3,
Bell,
ShieldCheck,
} from "lucide-react";

const features = [
{
icon: FolderKanban,
title: "Project Management",
description:
"Organize lists with powerful workflows and milestones.",
},
{
icon: CheckSquare,
title: "Task Tracking",
description:
"Create, assign, and monitor tasks in real time.",
},
{
icon: Users,
title: "Team Collaboration",
description:
"Work together seamlessly with your entire team.",
},
{
icon: BarChart3,
title: "Analytics",
description:
"Track productivity and project performance.",
},
{
icon: Bell,
title: "Smart Notifications",
description:
"Stay updated with important activity instantly.",
},
{
icon: ShieldCheck,
title: "Secure Platform",
description:
"Enterprise-grade security and reliable infrastructure.",
},
];

export function Features() {
return ( <section
   id="features"
   className="py-32"
 > <div className="container mx-auto px-6">

    <div className="mb-20 text-center">

      <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">
        Features
      </p>

      <h2 className="mt-4 text-5xl font-bold text-white">
        Everything You Need
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
        Manage lists, collaborate with teams,
        and monitor progress from one powerful workspace.
      </p>

    </div>

    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <div
            key={feature.title}
            className="
              rounded-3xl
              border
              border-white/10
              bg-slate-900
              p-8
              transition-all
              duration-300
              hover:-translate-y-2
              hover:border-indigo-500/30
            "
          >
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-indigo-600/15
              "
            >
              <Icon className="h-7 w-7 text-indigo-400" />
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-white">
              {feature.title}
            </h3>

            <p className="mt-4 text-slate-400">
              {feature.description}
            </p>
          </div>
        );
      })}

    </div>

  </div>
</section>


);
}
