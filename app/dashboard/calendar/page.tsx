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
      <h1 className="text-4xl font-bold text-foreground">
        Calendar
      </h1>

      <p className="mt-2 text-muted-foreground">
        Manage schedules, meetings and deadlines.
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
      New Event
    </button>

  </div>

  <div className="grid gap-6 md:grid-cols-4">

    <div className="rounded-3xl border border-border bg-card p-6">
      <CalendarDays className="mb-4 text-indigo-400" />
      <h2 className="text-3xl font-bold text-foreground">
        24
      </h2>
      <p className="text-muted-foreground">
        Events This Month
      </p>
    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <Clock className="mb-4 text-emerald-400" />
      <h2 className="text-3xl font-bold text-foreground">
        12
      </h2>
      <p className="text-muted-foreground">
        Upcoming Meetings
      </p>
    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <Users className="mb-4 text-pink-400" />
      <h2 className="text-3xl font-bold text-foreground">
        8
      </h2>
      <p className="text-muted-foreground">
        Team Sessions
      </p>
    </div>

  </div>

  <div className="rounded-3xl border border-border bg-card p-6">
<h2 className="mb-6 text-xl font-semibold text-foreground">
  Today&apos;s Schedule
</h2>

    <div className="space-y-4">

      {events.map((event) => (
        <div
          key={event.title}
          className="
            flex items-center justify-between
            rounded-2xl
            border border-border
            bg-background
            p-5
          "
        >
          <div>
            <h3 className="font-medium text-foreground">
              {event.title}
            </h3>

            <p className="mt-1 text-muted-foreground">
              {event.team}
            </p>
          </div>

          <div className="text-foreground">
            {event.time}
          </div>
        </div>
      ))}

    </div>

  </div>

</div>
);
}
