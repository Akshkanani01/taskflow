import {
FolderKanban,
CheckSquare,
Users,
BarChart3,
} from "lucide-react";

const steps = [
{
icon: FolderKanban,
step: "01",
title: "Create Workspace",
description:
"Setup your organization and create your first workspace.",
},
{
icon: CheckSquare,
step: "02",
title: "Create lists",
description:
"Organize work into lists, boards, and milestones.",
},
{
icon: Users,
step: "03",
title: "Assign Tasks",
description:
"Collaborate with team members and track ownership.",
},
{
icon: BarChart3,
step: "04",
title: "Track Progress",
description:
"Monitor performance with analytics and reports.",
},
];

export function HowItWorks() {
return ( <section
   id="how-it-works"
   className="py-32"
 > <div className="container mx-auto px-6">


    <div className="mb-20 text-center">

      <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">
        Workflow
      </p>

      <h2 className="mt-4 text-5xl font-bold text-white">
        How TaskFlow Works
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
        Get started in minutes and manage everything
        from one powerful dashboard.
      </p>

    </div>

    <div className="relative">

      <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/10 lg:block" />

      <div className="space-y-12">

        {steps.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.step}
              className="
                relative
                rounded-3xl
                border
                border-white/10
                bg-slate-900
                p-8
              "
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center">

                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-indigo-600/15
                  "
                >
                  <Icon className="h-8 w-8 text-indigo-400" />
                </div>

                <div className="flex-1">

                  <span className="text-indigo-400 font-semibold">
                    STEP {item.step}
                  </span>

                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-slate-400">
                    {item.description}
                  </p>

                </div>

              </div>
            </div>
          );
        })}

      </div>

    </div>

  </div>
</section>

);
}
