import {
Users,
TrendingUp,
AlertTriangle,
Briefcase,
} from "lucide-react";

const team = [
{
name: "Aksh Kanani",
role: "Project Manager",
utilization: 92,
tasks: 18,
status: "Overloaded",
},
{
name: "Riya Patel",
role: "UI Designer",
utilization: 68,
tasks: 11,
status: "Healthy",
},
{
name: "Dev Shah",
role: "Frontend Developer",
utilization: 81,
tasks: 15,
status: "Busy",
},
{
name: "Priya Mehta",
role: "QA Engineer",
utilization: 44,
tasks: 6,
status: "Available",
},
];

export default function WorkloadsPage() {
return ( <div className="space-y-8">

  <div>

    <h1 className="text-4xl font-bold text-white">
      Workload Management
    </h1>

    <p className="mt-2 text-slate-400">
      Monitor team capacity and prevent burnout.
    </p>

  </div>

  <div className="grid gap-6 md:grid-cols-4">

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Users className="mb-4 text-indigo-400" />
      <h2 className="text-3xl font-bold text-white">
        24
      </h2>
      <p className="text-slate-400">
        Team Members
      </p>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <TrendingUp className="mb-4 text-emerald-400" />
      <h2 className="text-3xl font-bold text-white">
        76%
      </h2>
      <p className="text-slate-400">
        Avg Utilization
      </p>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Briefcase className="mb-4 text-sky-400" />
      <h2 className="text-3xl font-bold text-white">
        182
      </h2>
      <p className="text-slate-400">
        Active Tasks
      </p>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <AlertTriangle className="mb-4 text-amber-400" />
      <h2 className="text-3xl font-bold text-white">
        3
      </h2>
      <p className="text-slate-400">
        Burnout Risks
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
      Team Capacity Overview
    </h2>

    <div className="space-y-5">

      {team.map((member) => (
        <div
          key={member.name}
          className="
            rounded-2xl
            border border-white/10
            bg-slate-950
            p-5
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <h3 className="font-semibold text-white">
                {member.name}
              </h3>

              <p className="mt-1 text-slate-400">
                {member.role}
              </p>

            </div>

            <span
              className={`
                rounded-full px-3 py-1 text-xs
                ${
                  member.status === "Overloaded"
                    ? "bg-red-500/20 text-red-300"
                    : member.status === "Busy"
                    ? "bg-amber-500/20 text-amber-300"
                    : member.status === "Healthy"
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-sky-500/20 text-sky-300"
                }
              `}
            >
              {member.status}
            </span>

          </div>

          <div className="mt-5">

            <div className="mb-2 flex justify-between text-sm">

              <span className="text-slate-400">
                Utilization
              </span>

              <span className="text-white">
                {member.utilization}%
              </span>

            </div>

            <div className="h-3 rounded-full bg-slate-800">

              <div
                className={`
                  h-3 rounded-full
                  ${
                    member.utilization > 90
                      ? "bg-red-500"
                      : member.utilization > 75
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                  }
                `}
                style={{
                  width: `${member.utilization}%`,
                }}
              />

            </div>

          </div>

          <div className="mt-4 text-sm text-slate-400">
            {member.tasks} Active Tasks
          </div>

        </div>
      ))}

    </div>

  </div>

</div>

);
}
