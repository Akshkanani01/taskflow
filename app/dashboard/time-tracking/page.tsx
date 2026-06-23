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

      <h1 className="text-4xl font-bold text-white">
        Time Tracking
      </h1>

      <p className="mt-2 text-slate-400">
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
          text-white
        "
      >
        <Play size={18} />
        Start Timer
      </button>

      <button
        className="
          flex items-center gap-2
          rounded-xl
          border border-white/10
          px-5 py-3
          text-white
        "
      >
        <Pause size={18} />
        Stop
      </button>

    </div>

  </div>

  <div className="grid gap-6 md:grid-cols-4">

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Clock3 className="mb-4 text-indigo-400" />

      <h2 className="text-3xl font-bold text-white">
        186h
      </h2>

      <p className="text-slate-400">
        Total Hours
      </p>

    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Timer className="mb-4 text-emerald-400" />

      <h2 className="text-3xl font-bold text-white">
        128h
      </h2>

      <p className="text-slate-400">
        Billable Hours
      </p>

    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Calendar className="mb-4 text-pink-400" />

      <h2 className="text-3xl font-bold text-white">
        21
      </h2>

      <p className="text-slate-400">
        Active Days
      </p>

    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Clock3 className="mb-4 text-amber-400" />

      <h2 className="text-3xl font-bold text-white">
        7.2h
      </h2>

      <p className="text-slate-400">
        Avg / Day
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
      Recent Entries
    </h2>

    <div className="space-y-4">

      {entries.map((entry) => (
        <div
          key={entry.project + entry.user}
          className="
            flex items-center justify-between
            rounded-2xl
            border border-white/10
            bg-slate-950
            p-5
          "
        >

          <div>

            <h3 className="font-semibold text-white">
              {entry.project}
            </h3>

            <p className="mt-1 text-slate-400">
              {entry.user}
            </p>

          </div>

          <div className="text-right">

            <h4 className="font-semibold text-white">
              {entry.duration}
            </h4>

            <p className="text-slate-500">
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
