import {
CalendarDays,
Plus,
Clock,
Users,
} from "lucide-react";

const events = [
{
title: "Sprint Planning",
time: "09:00 AM",
team: "Product Team",
},
{
title: "Client Meeting",
time: "01:30 PM",
team: "Sales Team",
},
{
title: "Design Review",
time: "04:00 PM",
team: "Design Team",
},
];

export default function CalendarPage() {
return ( <div className="space-y-8">

  <div className="flex items-center justify-between">

    <div>
      <h1 className="text-4xl font-bold text-white">
        Calendar
      </h1>

      <p className="mt-2 text-slate-400">
        Manage schedules, meetings and deadlines.
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
      <Plus size={18} />
      New Event
    </button>

  </div>

  <div className="grid gap-6 md:grid-cols-4">

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <CalendarDays className="mb-4 text-indigo-400" />
      <h2 className="text-3xl font-bold text-white">
        24
      </h2>
      <p className="text-slate-400">
        Events This Month
      </p>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Clock className="mb-4 text-emerald-400" />
      <h2 className="text-3xl font-bold text-white">
        12
      </h2>
      <p className="text-slate-400">
        Upcoming Meetings
      </p>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Users className="mb-4 text-pink-400" />
      <h2 className="text-3xl font-bold text-white">
        8
      </h2>
      <p className="text-slate-400">
        Team Sessions
      </p>
    </div>

  </div>

  <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">

    <h2 className="mb-6 text-xl font-semibold text-white">
      Today's Schedule
    </h2>

    <div className="space-y-4">

      {events.map((event) => (
        <div
          key={event.title}
          className="
            flex items-center justify-between
            rounded-2xl
            border border-white/10
            bg-slate-950
            p-5
          "
        >
          <div>
            <h3 className="font-medium text-white">
              {event.title}
            </h3>

            <p className="mt-1 text-slate-400">
              {event.team}
            </p>
          </div>

          <div className="text-slate-300">
            {event.time}
          </div>
        </div>
      ))}

    </div>

  </div>

</div>
);
}
