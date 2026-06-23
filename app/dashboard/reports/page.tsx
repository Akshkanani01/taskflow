import {
FileText,
Download,
Calendar,
TrendingUp,
Users,
FolderKanban,
} from "lucide-react";

const reports = [
{
name: "Weekly Productivity Report",
date: "Jun 14, 2026",
type: "Performance",
},
{
name: "Project Status Report",
date: "Jun 13, 2026",
type: "lists",
},
{
name: "Team Activity Report",
date: "Jun 10, 2026",
type: "Team",
},
];

export default function ReportsPage() {
return ( <div className="space-y-8">

  <div className="flex items-center justify-between">

    <div>

      <h1 className="text-4xl font-bold text-white">
        Reports
      </h1>

      <p className="mt-2 text-slate-400">
        Generate and download workspace reports.
      </p>

    </div>

    <button
      className="
        flex items-center gap-2
        rounded-xl
        bg-indigo-600
        px-5 py-3
        text-white
      "
    >
      <Download size={18} />
      Export Report
    </button>

  </div>

  <div className="grid gap-6 md:grid-cols-4">

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <TrendingUp className="mb-4 text-emerald-400" />
      <h2 className="text-3xl font-bold text-white">
        94%
      </h2>
      <p className="text-slate-400">
        Productivity
      </p>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <FolderKanban className="mb-4 text-indigo-400" />
      <h2 className="text-3xl font-bold text-white">
        24
      </h2>
      <p className="text-slate-400">
        lists
      </p>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Users className="mb-4 text-pink-400" />
      <h2 className="text-3xl font-bold text-white">
        36
      </h2>
      <p className="text-slate-400">
        Members
      </p>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Calendar className="mb-4 text-amber-400" />
      <h2 className="text-3xl font-bold text-white">
        12
      </h2>
      <p className="text-slate-400">
        Reports Generated
      </p>
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
      Recent Reports
    </h2>

    <div className="space-y-4">

      {reports.map((report) => (
        <div
          key={report.name}
          className="
            flex items-center justify-between
            rounded-2xl
            border border-white/10
            bg-slate-950
            p-4
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-xl
                bg-slate-800
              "
            >
              <FileText className="text-indigo-400" />
            </div>

            <div>

              <h3 className="font-medium text-white">
                {report.name}
              </h3>

              <p className="text-sm text-slate-400">
                {report.type} • {report.date}
              </p>

            </div>

          </div>

          <button
            className="
              rounded-xl
              border border-white/10
              px-4 py-2
              text-slate-300
            "
          >
            Download
          </button>

        </div>
      ))}

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

    <h2 className="mb-4 text-xl font-semibold text-white">
      Scheduled Reports
    </h2>

    <p className="text-slate-400">
      Automatically generate weekly, monthly and quarterly reports.
    </p>

  </div>

</div>

);
}
