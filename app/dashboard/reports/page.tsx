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

      <h1 className="text-4xl font-bold text-foreground">
        Reports
      </h1>

      <p className="mt-2 text-muted-foreground">
        Generate and download workspace reports.
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
      <Download size={18} />
      Export Report
    </button>

  </div>

  <div className="grid gap-6 md:grid-cols-4">

    <div className="rounded-3xl border border-border bg-card p-6">
      <TrendingUp className="mb-4 text-emerald-400" />
      <h2 className="text-3xl font-bold text-foreground">
        94%
      </h2>
      <p className="text-muted-foreground">
        Productivity
      </p>
    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <FolderKanban className="mb-4 text-indigo-400" />
      <h2 className="text-3xl font-bold text-foreground">
        24
      </h2>
      <p className="text-muted-foreground">
        lists
      </p>
    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <Users className="mb-4 text-pink-400" />
      <h2 className="text-3xl font-bold text-foreground">
        36
      </h2>
      <p className="text-muted-foreground">
        Members
      </p>
    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <Calendar className="mb-4 text-amber-400" />
      <h2 className="text-3xl font-bold text-foreground">
        12
      </h2>
      <p className="text-muted-foreground">
        Reports Generated
      </p>
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
      Recent Reports
    </h2>

    <div className="space-y-4">

      {reports.map((report) => (
        <div
          key={report.name}
          className="
            flex items-center justify-between
            rounded-2xl
            border border-border
            bg-background
            p-4
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-xl
                bg-background
              "
            >
              <FileText className="text-indigo-400" />
            </div>

            <div>

              <h3 className="font-medium text-foreground">
                {report.name}
              </h3>

              <p className="text-sm text-muted-foreground">
                {report.type} • {report.date}
              </p>

            </div>

          </div>

          <button
            className="
              rounded-xl
              border border-border
              px-4 py-2
              text-foreground
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
      border border-border
      bg-card
      p-6
    "
  >

    <h2 className="mb-4 text-xl font-semibold text-foreground">
      Scheduled Reports
    </h2>

    <p className="text-muted-foreground">
      Automatically generate weekly, monthly and quarterly reports.
    </p>

  </div>

</div>

);
}
