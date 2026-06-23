import {
TrendingUp,
FolderKanban,
CheckSquare,
Users,
} from "lucide-react";

export default function AnalyticsPage() {
return ( <div className="space-y-8">

  <div>

    <h1 className="text-4xl font-bold text-white">
      Analytics
    </h1>

    <p className="mt-2 text-slate-400">
      Workspace performance and productivity insights.
    </p>

  </div>

  <div className="grid gap-6 md:grid-cols-4">

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <TrendingUp className="mb-4 text-emerald-400" />
      <h2 className="text-3xl font-bold text-white">
        94%
      </h2>
      <p className="text-slate-400">
        Productivity Score
      </p>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <FolderKanban className="mb-4 text-indigo-400" />
      <h2 className="text-3xl font-bold text-white">
        24
      </h2>
      <p className="text-slate-400">
        Active lists
      </p>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <CheckSquare className="mb-4 text-amber-400" />
      <h2 className="text-3xl font-bold text-white">
        138
      </h2>
      <p className="text-slate-400">
        Completed Tasks
      </p>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Users className="mb-4 text-pink-400" />
      <h2 className="text-3xl font-bold text-white">
        36
      </h2>
      <p className="text-slate-400">
        Team Members
      </p>
    </div>

  </div>

  <div className="grid gap-6 xl:grid-cols-3">

    <div
      className="
        xl:col-span-2
        rounded-3xl
        border border-white/10
        bg-slate-900
        p-6
      "
    >

      <h2 className="mb-6 text-xl font-semibold text-white">
        Task Completion Trend
      </h2>

      <div
        className="
          flex h-80 items-center
          justify-center
          rounded-2xl
          border border-dashed border-white/10
        "
      >
        <span className="text-slate-500">
          Chart Area
        </span>
      </div>

    </div>

    <div
      className="
        rounded-3xl
        border border-white/10
        bg-slate-900
        p-6
      "
    >

      <h2 className="mb-6 text-xl font-semibold text-white">
        Project Health
      </h2>

      <div className="space-y-6">

        <div>
          <div className="mb-2 flex justify-between">
            <span className="text-slate-400">
              TaskFlow
            </span>
            <span className="text-white">
              78%
            </span>
          </div>

          <div className="h-2 rounded-full bg-slate-800">
            <div className="h-2 w-[78%] rounded-full bg-indigo-500" />
          </div>
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <span className="text-slate-400">
              Mobile App
            </span>
            <span className="text-white">
              42%
            </span>
          </div>

          <div className="h-2 rounded-full bg-slate-800">
            <div className="h-2 w-[42%] rounded-full bg-emerald-500" />
          </div>
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <span className="text-slate-400">
              Client Portal
            </span>
            <span className="text-white">
              95%
            </span>
          </div>

          <div className="h-2 rounded-full bg-slate-800">
            <div className="h-2 w-[95%] rounded-full bg-pink-500" />
          </div>
        </div>

      </div>

    </div>

  </div>

</div>


);
}
