import {
Plus,
Zap,
Mail,
Bell,
CheckCircle,
ArrowRight,
} from "lucide-react";

const automations = [
{
name: "Task Assignment",
trigger: "Task Created",
action: "Assign Project Manager",
icon: CheckCircle,
active: true,
},
{
name: "Deadline Reminder",
trigger: "1 Day Before Due Date",
action: "Send Notification",
icon: Bell,
active: true,
},
{
name: "Project Completion",
trigger: "Project Status = Done",
action: "Send Email Report",
icon: Mail,
active: true,
},
{
name: "Client Onboarding",
trigger: "New Client Added",
action: "Create Starter Tasks",
icon: Zap,
active: false,
},
];

export default function AutomationPage() {
return ( <div className="space-y-8">

  <div className="flex items-center justify-between">

    <div>

      <h1 className="text-4xl font-bold text-white">
        Automation Center
      </h1>

      <p className="mt-2 text-slate-400">
        Automate repetitive workflows and boost productivity.
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
      New Automation
    </button>

  </div>

  <div className="grid gap-6 md:grid-cols-4">

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Zap className="mb-4 text-indigo-400" />
      <h2 className="text-3xl font-bold text-white">
        12
      </h2>
      <p className="text-slate-400">
        Active Workflows
      </p>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <CheckCircle className="mb-4 text-emerald-400" />
      <h2 className="text-3xl font-bold text-white">
        3,281
      </h2>
      <p className="text-slate-400">
        Executions
      </p>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Bell className="mb-4 text-amber-400" />
      <h2 className="text-3xl font-bold text-white">
        842
      </h2>
      <p className="text-slate-400">
        Notifications Sent
      </p>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Mail className="mb-4 text-pink-400" />
      <h2 className="text-3xl font-bold text-white">
        156
      </h2>
      <p className="text-slate-400">
        Emails Triggered
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

    <div className="mb-6 flex items-center justify-between">

      <h2 className="text-xl font-semibold text-white">
        Active Automations
      </h2>

      <span className="text-sm text-slate-400">
        Enterprise Workflow Engine
      </span>

    </div>

    <div className="space-y-5">

      {automations.map((automation) => {
        const Icon = automation.icon;

        return (
          <div
            key={automation.name}
            className="
              flex items-center justify-between
              rounded-2xl
              border border-white/10
              bg-slate-950
              p-5
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
                <Icon
                  className="text-indigo-400"
                  size={20}
                />
              </div>

              <div>

                <h3 className="font-medium text-white">
                  {automation.name}
                </h3>

                <div className="mt-2 flex items-center gap-3 text-sm">

                  <span className="text-slate-400">
                    {automation.trigger}
                  </span>

                  <ArrowRight
                    size={14}
                    className="text-slate-600"
                  />

                  <span className="text-white">
                    {automation.action}
                  </span>

                </div>

              </div>

            </div>

            <div
              className={`
                rounded-full px-3 py-1 text-xs
                ${
                  automation.active
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-slate-800 text-slate-400"
                }
              `}
            >
              {automation.active ? "Active" : "Disabled"}
            </div>

          </div>
        );
      })}

    </div>

  </div>

  <div className="grid gap-6 xl:grid-cols-2">

    <div
      className="
        rounded-3xl
        border border-white/10
        bg-slate-900
        p-6
      "
    >

      <h2 className="mb-5 text-xl font-semibold text-white">
        Popular Templates
      </h2>

      <div className="space-y-4">

        <div className="rounded-2xl bg-slate-950 p-4">
          Task Created → Assign Team Member
        </div>

        <div className="rounded-2xl bg-slate-950 p-4">
          Due Date Near → Send Reminder
        </div>

        <div className="rounded-2xl bg-slate-950 p-4">
          Project Complete → Generate Report
        </div>

      </div>

    </div>

    <div
      className="
        rounded-3xl
        border border-indigo-500/20
        bg-indigo-500/10
        p-6
      "
    >

      <Zap
        className="mb-4 text-indigo-400"
        size={28}
      />

      <h2 className="text-2xl font-bold text-white">
        TaskFlow Automation
      </h2>

      <p className="mt-3 text-slate-300">
        Connect tasks, lists, files,
        notifications and AI workflows
        without writing code.
      </p>

    </div>

  </div>

</div>


);
}
