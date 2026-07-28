import {
Rocket,
Flag,
Calendar,
Target,
} from "lucide-react";

const roadmap = [
{
quarter: "Q1 2026",
items: [
"Advanced Analytics",
"Client Portal",
"AI Reports",
],
progress: 100,
},
{
quarter: "Q2 2026",
items: [
"Workflow Automation",
"Time Tracking",
"CRM Module",
],
progress: 75,
},
{
quarter: "Q3 2026",
items: [
"Mobile Apps",
"Resource Planning",
"Budget Forecasting",
],
progress: 40,
},
{
quarter: "Q4 2026",
items: [
"Enterprise AI",
"Global Workspaces",
"Marketplace",
],
progress: 15,
},
];

export default function RoadmapPage() {
return ( <div className="space-y-8">

  <div>

    <h1 className="text-4xl font-bold text-foreground">
      Product Roadmap
    </h1>

    <p className="mt-2 text-muted-foreground">
      Strategic planning and release management.
    </p>

  </div>

  <div className="grid gap-6 md:grid-cols-4">

    <div className="rounded-3xl border border-border bg-card p-6">
      <Rocket className="mb-4 text-indigo-400" />
      <h2 className="text-3xl font-bold text-foreground">
        24
      </h2>
      <p className="text-muted-foreground">
        Features Planned
      </p>
    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <Target className="mb-4 text-emerald-400" />
      <h2 className="text-3xl font-bold text-foreground">
        18
      </h2>
      <p className="text-muted-foreground">
        Completed
      </p>
    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <Flag className="mb-4 text-pink-400" />
      <h2 className="text-3xl font-bold text-foreground">
        12
      </h2>
      <p className="text-muted-foreground">
        Milestones
      </p>
    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <Calendar className="mb-4 text-amber-400" />
      <h2 className="text-3xl font-bold text-foreground">
        Q4
      </h2>
      <p className="text-muted-foreground">
        Next Release
      </p>
    </div>

  </div>

  <div className="space-y-6">

    {roadmap.map((phase) => (
      <div
        key={phase.quarter}
        className="
          rounded-3xl
          border border-border
          bg-card
          p-6
        "
      >

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold text-foreground">
            {phase.quarter}
          </h2>

          <span className="text-muted-foreground">
            {phase.progress}% Complete
          </span>

        </div>

        <div className="mt-4 h-3 rounded-full bg-background">

          <div
            className="h-3 rounded-full bg-indigo-500"
            style={{
              width: `${phase.progress}%`,
            }}
          />

        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">

          {phase.items.map((item) => (
            <div
              key={item}
              className="
                rounded-2xl
                border border-border
                bg-background
                p-4
              "
            >
              <h3 className="font-medium text-foreground">
                {item}
              </h3>
            </div>
          ))}

        </div>

      </div>
    ))}

  </div>

</div>


);
}
