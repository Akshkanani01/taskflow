import {
TrendingUp,
FolderKanban,
CheckSquare,
Users,
} from "lucide-react";

export default function AnalyticsPage() {
return ( <div className="space-y-8">

  <div>

    <h1 className="text-4xl font-bold text-foreground">
      Analytics
    </h1>

    <p className="mt-2 text-muted-foreground">
      Workspace performance and productivity insights.
    </p>

  </div>

  <div className="grid gap-6 md:grid-cols-4">

    <div className="rounded-3xl border border-border bg-card p-6">
      <TrendingUp className="mb-4 text-emerald-400" />
      <h2 className="text-3xl font-bold text-foreground">
        94%
      </h2>
      <p className="text-muted-foreground">
        Productivity Score
      </p>
    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <FolderKanban className="mb-4 text-indigo-400" />
      <h2 className="text-3xl font-bold text-foreground">
        24
      </h2>
      <p className="text-muted-foreground">
        Active lists
      </p>
    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <CheckSquare className="mb-4 text-amber-400" />
      <h2 className="text-3xl font-bold text-foreground">
        138
      </h2>
      <p className="text-muted-foreground">
        Completed Tasks
      </p>
    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <Users className="mb-4 text-pink-400" />
      <h2 className="text-3xl font-bold text-foreground">
        36
      </h2>
      <p className="text-muted-foreground">
        Team Members
      </p>
    </div>

  </div>

  <div className="grid gap-6 xl:grid-cols-3">

    <div
      className="
        xl:col-span-2
        rounded-3xl
        border border-border
        bg-card
        p-6
      "
    >

      <h2 className="mb-6 text-xl font-semibold text-foreground">
        Task Completion Trend
      </h2>

      <div
        className="
          flex h-80 items-center
          justify-center
          rounded-2xl
          border border-dashed border-border
        "
      >
        <span className="text-muted-foreground">
          Chart Area
        </span>
      </div>

    </div>

    <div
      className="
        rounded-3xl
        border border-border
        bg-card
        p-6
      "
    >

      <h2 className="mb-6 text-xl font-semibold text-foreground">
        Project Health
      </h2>

      <div className="space-y-6">

        <div>
          <div className="mb-2 flex justify-between">
            <span className="text-muted-foreground">
              TaskFlow
            </span>
            <span className="text-foreground">
              78%
            </span>
          </div>

          <div className="h-2 rounded-full bg-background">
            <div className="h-2 w-[78%] rounded-full bg-indigo-500" />
          </div>
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <span className="text-muted-foreground">
              Mobile App
            </span>
            <span className="text-foreground">
              42%
            </span>
          </div>

          <div className="h-2 rounded-full bg-background">
            <div className="h-2 w-[42%] rounded-full bg-emerald-500" />
          </div>
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <span className="text-muted-foreground">
              Client Portal
            </span>
            <span className="text-foreground">
              95%
            </span>
          </div>

          <div className="h-2 rounded-full bg-background">
            <div className="h-2 w-[95%] rounded-full bg-pink-500" />
          </div>
        </div>

      </div>

    </div>

  </div>

</div>


);
}
