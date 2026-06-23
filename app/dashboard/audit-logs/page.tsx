import {
Shield,
User,
Lock,
Download,
Activity,
} from "lucide-react";

const logs = [
{
action: "User Login",
user: "Aksh Kanani",
time: "2 minutes ago",
type: "Authentication",
},
{
action: "Project Deleted",
user: "Admin",
time: "18 minutes ago",
type: "Project",
},
{
action: "Role Updated",
user: "Riya Patel",
time: "1 hour ago",
type: "Permission",
},
{
action: "Workspace Settings Changed",
user: "Dev Shah",
time: "3 hours ago",
type: "Workspace",
},
{
action: "Data Export Generated",
user: "Admin",
time: "Yesterday",
type: "Export",
},
];

export default function AuditLogsPage() {
return ( <div className="space-y-8">

  <div className="flex items-center justify-between">

    <div>

      <h1 className="text-4xl font-bold text-white">
        Audit Logs
      </h1>

      <p className="mt-2 text-slate-400">
        Track security events and workspace activity.
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
      Export Logs
    </button>

  </div>

  <div className="grid gap-6 md:grid-cols-4">

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Activity className="mb-4 text-indigo-400" />
      <h2 className="text-3xl font-bold text-white">
        4,821
      </h2>
      <p className="text-slate-400">
        Events Logged
      </p>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <User className="mb-4 text-emerald-400" />
      <h2 className="text-3xl font-bold text-white">
        186
      </h2>
      <p className="text-slate-400">
        User Actions
      </p>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Lock className="mb-4 text-pink-400" />
      <h2 className="text-3xl font-bold text-white">
        12
      </h2>
      <p className="text-slate-400">
        Security Events
      </p>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Shield className="mb-4 text-amber-400" />
      <h2 className="text-3xl font-bold text-white">
        SOC 2
      </h2>
      <p className="text-slate-400">
        Compliance Ready
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
      Activity Timeline
    </h2>

    <div className="space-y-4">

      {logs.map((log, index) => (
        <div
          key={index}
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
              {log.action}
            </h3>

            <p className="mt-1 text-slate-400">
              {log.user}
            </p>

          </div>

          <div className="text-right">

            <div
              className="
                rounded-full
                bg-slate-800
                px-3 py-1
                text-xs
                text-slate-300
              "
            >
              {log.type}
            </div>

            <p className="mt-2 text-sm text-slate-500">
              {log.time}
            </p>

          </div>

        </div>
      ))}

    </div>

  </div>

</div>


);
}
