import {
FolderKanban,
CheckSquare,
Users,
BarChart3,
} from "lucide-react";

export function Showcase() {
return ( <section
   id="showcase"
   className="py-32"
 > <div className="container mx-auto px-6">


    <div className="mb-20 text-center">

      <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">
        Dashboard
      </p>

      <h2 className="mt-4 text-5xl font-bold text-foreground">
        Everything In One Place
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
        Manage lists, tasks, teams and analytics
        from a single beautiful dashboard.
      </p>

    </div>

    <div
      className="
        rounded-3xl
        border
        border-border
        bg-card
        p-8
        shadow-2xl
      "
    >

      <div className="grid gap-6 lg:grid-cols-4">

        <div className="rounded-2xl bg-background p-6">
          <FolderKanban className="h-8 w-8 text-indigo-400" />

          <p className="mt-4 text-muted-foreground">
            lists
          </p>

          <h3 className="mt-2 text-4xl font-bold text-foreground">
            24
          </h3>
        </div>

        <div className="rounded-2xl bg-background p-6">
          <CheckSquare className="h-8 w-8 text-indigo-400" />

          <p className="mt-4 text-muted-foreground">
            Tasks
          </p>

          <h3 className="mt-2 text-4xl font-bold text-foreground">
            482
          </h3>
        </div>

        <div className="rounded-2xl bg-background p-6">
          <Users className="h-8 w-8 text-indigo-400" />

          <p className="mt-4 text-muted-foreground">
            Team Members
          </p>

          <h3 className="mt-2 text-4xl font-bold text-foreground">
            18
          </h3>
        </div>

        <div className="rounded-2xl bg-background p-6">
          <BarChart3 className="h-8 w-8 text-emerald-400" />

          <p className="mt-4 text-muted-foreground">
            Completion
          </p>

          <h3 className="mt-2 text-4xl font-bold text-emerald-400">
            87%
          </h3>
        </div>

      </div>

      <div className="mt-8 rounded-2xl bg-background p-8">

        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">
            Project Overview
          </h3>

          <span className="rounded-full bg-emerald-500/20 px-4 py-1 text-sm text-emerald-400">
            Active
          </span>
        </div>

        <div className="space-y-5">

          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-muted-foreground">
                Website Redesign
              </span>

              <span className="text-foreground">
                92%
              </span>
            </div>

            <div className="h-3 rounded-full bg-slate-700">
              <div className="h-3 w-[92%] rounded-full bg-indigo-500" />
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-muted-foreground">
                Mobile App
              </span>

              <span className="text-foreground">
                74%
              </span>
            </div>

            <div className="h-3 rounded-full bg-slate-700">
              <div className="h-3 w-[74%] rounded-full bg-purple-500" />
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-muted-foreground">
                Marketing Campaign
              </span>

              <span className="text-foreground">
                58%
              </span>
            </div>

            <div className="h-3 rounded-full bg-slate-700">
              <div className="h-3 w-[58%] rounded-full bg-emerald-500" />
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>
</section>


);
}
