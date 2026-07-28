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

      <h1 className="text-4xl font-bold text-foreground">
        Audit Logs
      </h1>

      <p className="mt-2 text-muted-foreground">
        Track security events and workspace activity.
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
      Export Logs
    </button>

  </div>

  <div className="grid gap-6 md:grid-cols-4">

    <div className="rounded-3xl border border-border bg-card p-6">
      <Activity className="mb-4 text-indigo-400" />
      <h2 className="text-3xl font-bold text-foreground">
        4,821
      </h2>
      <p className="text-muted-foreground">
        Events Logged
      </p>
    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <User className="mb-4 text-emerald-400" />
      <h2 className="text-3xl font-bold text-foreground">
        186
      </h2>
      <p className="text-muted-foreground">
        User Actions
      </p>
    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <Lock className="mb-4 text-pink-400" />
      <h2 className="text-3xl font-bold text-foreground">
        12
      </h2>
      <p className="text-muted-foreground">
        Security Events
      </p>
    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <Shield className="mb-4 text-amber-400" />
      <h2 className="text-3xl font-bold text-foreground">
        SOC 2
      </h2>
      <p className="text-muted-foreground">
        Compliance Ready
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
      Activity Timeline
    </h2>

    <div className="space-y-4">

      {logs.map((log, index) => (
        <div
          key={index}
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
              {log.action}
            </h3>

            <p className="mt-1 text-muted-foreground">
              {log.user}
            </p>

          </div>

          <div className="text-right">

            <div
              className="
                rounded-full
                bg-background
                px-3 py-1
                text-xs
                text-foreground
              "
            >
              {log.type}
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
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
