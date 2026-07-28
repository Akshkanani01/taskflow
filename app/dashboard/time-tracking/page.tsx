import {
Clock3,
Play,
Pause,
Calendar,
Timer,
} from "lucide-react";

const entries = [
{
project: "TaskFlow Dashboard",
user: "Aksh Kanani",
duration: "4h 32m",
date: "Today",
},
{
project: "Mobile App",
user: "Riya Patel",
duration: "2h 10m",
date: "Today",
},
{
project: "Client Portal",
user: "Dev Shah",
duration: "6h 05m",
date: "Yesterday",
},
];

export default function TimeTrackingPage() {
return ( <div className="space-y-8">

  <div className="flex items-center justify-between">

    <div>

      <h1 className="text-4xl font-bold text-foreground">
        Time Tracking
      </h1>

      <p className="mt-2 text-muted-foreground">
        Track productivity, billable hours and team effort.
      </p>

    </div>

    <div className="flex gap-3">

      <button
        className="
          flex items-center gap-2
          rounded-xl
          bg-emerald-600
          px-5 py-3
          text-foreground
        "
      >
        <Play size={18} />
        Start Timer
      </button>

      <button
        className="
          flex items-center gap-2
          rounded-xl
          border border-border
          px-5 py-3
          text-foreground
        "
      >
        <Pause size={18} />
        Stop
      </button>

    </div>

  </div>

  <div className="grid gap-6 md:grid-cols-4">

    <div className="rounded-3xl border border-border bg-card p-6">
      <Clock3 className="mb-4 text-indigo-400" />

      <h2 className="text-3xl font-bold text-foreground">
        186h
      </h2>

      <p className="text-muted-foreground">
        Total Hours
      </p>

    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <Timer className="mb-4 text-emerald-400" />

      <h2 className="text-3xl font-bold text-foreground">
        128h
      </h2>

      <p className="text-muted-foreground">
        Billable Hours
      </p>

    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <Calendar className="mb-4 text-pink-400" />

      <h2 className="text-3xl font-bold text-foreground">
        21
      </h2>

      <p className="text-muted-foreground">
        Active Days
      </p>

    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <Clock3 className="mb-4 text-amber-400" />

      <h2 className="text-3xl font-bold text-foreground">
        7.2h
      </h2>

      <p className="text-muted-foreground">
        Avg / Day
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
      Recent Entries
    </h2>

    <div className="space-y-4">

      {entries.map((entry) => (
        <div
          key={entry.project + entry.user}
          className="
            flex items-center justify-between
            rounded-2xl
            border border-border
            bg-background
            p-5
          "
        >

          <div>

            <h3 className="font-semibold text-foreground">
              {entry.project}
            </h3>

            <p className="mt-1 text-muted-foreground">
              {entry.user}
            </p>

          </div>

          <div className="text-right">

            <h4 className="font-semibold text-foreground">
              {entry.duration}
            </h4>

            <p className="text-muted-foreground">
              {entry.date}
            </p>

          </div>

        </div>
      ))}

    </div>

  </div>

</div>

);
}
