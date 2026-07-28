import {
Target,
TrendingUp,
CheckCircle2,
Trophy,
Plus,
} from "lucide-react";

const goals = [
{
title: "Increase Monthly Revenue",
progress: 78,
owner: "Growth Team",
target: "$250,000 MRR",
},
{
title: "Launch Mobile Application",
progress: 55,
owner: "Product Team",
target: "Q3 Release",
},
{
title: "Improve Customer Retention",
progress: 88,
owner: "Customer Success",
target: "95% Retention",
},
{
title: "Expand Enterprise Sales",
progress: 42,
owner: "Sales Team",
target: "50 New Accounts",
},
];

export default function GoalsPage() {
return ( <div className="space-y-8">

  <div className="flex items-center justify-between">

    <div>

      <h1 className="text-4xl font-bold text-foreground">
        Goals & OKRs
      </h1>

      <p className="mt-2 text-muted-foreground">
        Track company objectives and team outcomes.
      </p>

    </div>

    <button
      className="
        flex items-center gap-2
        rounded-xl
        bg-indigo-600
        px-5 py-3
        text-foreground
      "
    >
      <Plus size={18} />
      New Goal
    </button>

  </div>

  <div className="grid gap-6 md:grid-cols-4">

    <div className="rounded-3xl border border-border bg-card p-6">
      <Target className="mb-4 text-indigo-400" />

      <h2 className="text-3xl font-bold text-foreground">
        18
      </h2>

      <p className="text-muted-foreground">
        Active Goals
      </p>

    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <TrendingUp className="mb-4 text-emerald-400" />

      <h2 className="text-3xl font-bold text-foreground">
        74%
      </h2>

      <p className="text-muted-foreground">
        Avg Progress
      </p>

    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <CheckCircle2 className="mb-4 text-pink-400" />

      <h2 className="text-3xl font-bold text-foreground">
        12
      </h2>

      <p className="text-muted-foreground">
        Completed
      </p>

    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <Trophy className="mb-4 text-amber-400" />

      <h2 className="text-3xl font-bold text-foreground">
        Q3
      </h2>

      <p className="text-muted-foreground">
        Current Cycle
      </p>

    </div>

  </div>

  <div className="space-y-6">

    {goals.map((goal) => (
      <div
        key={goal.title}
        className="
          rounded-3xl
          border border-border
          bg-card
          p-6
        "
      >

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-semibold text-foreground">
              {goal.title}
            </h2>

            <p className="mt-1 text-muted-foreground">
              {goal.owner}
            </p>

          </div>

          <div className="text-right">

            <div className="text-2xl font-bold text-foreground">
              {goal.progress}%
            </div>

            <div className="text-sm text-muted-foreground">
              {goal.target}
            </div>

          </div>

        </div>

        <div className="mt-5 h-3 rounded-full bg-background">

          <div
            className="h-3 rounded-full bg-indigo-500"
            style={{
              width: `${goal.progress}%`,
            }}
          />

        </div>

      </div>
    ))}

  </div>

</div>


);
}
