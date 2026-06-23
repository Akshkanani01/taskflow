import {
Bell,
CheckCircle,
AlertCircle,
MessageSquare,
FolderKanban,
Clock3,
} from "lucide-react";

const notifications = [
{
title: "New task assigned",
description: "Design Dashboard UI assigned to you",
time: "2 min ago",
icon: CheckCircle,
color: "text-emerald-400",
},
{
title: "Project updated",
description: "TaskFlow Web App progress changed to 78%",
time: "15 min ago",
icon: FolderKanban,
color: "text-indigo-400",
},
{
title: "New comment",
description: "Riya commented on Mobile App project",
time: "1 hour ago",
icon: MessageSquare,
color: "text-pink-400",
},
{
title: "Deadline approaching",
description: "Client Portal review due tomorrow",
time: "3 hours ago",
icon: AlertCircle,
color: "text-amber-400",
},
{
title: "Automation completed",
description: "Weekly report generated successfully",
time: "Yesterday",
icon: Clock3,
color: "text-cyan-400",
},
];

export default function NotificationsPage() {
return ( <div className="space-y-8">

  <div className="flex items-center justify-between">

    <div>

      <h1 className="text-4xl font-bold text-white">
        Notifications
      </h1>

      <p className="mt-2 text-slate-400">
        Stay updated with workspace activity.
      </p>

    </div>

    <button
      className="
        rounded-xl
        border border-white/10
        px-4 py-3
        text-slate-300
      "
    >
      Mark All Read
    </button>

  </div>

  <div className="grid gap-6 md:grid-cols-3">

    <div
      className="
        rounded-3xl
        border border-white/10
        bg-slate-900
        p-6
      "
    >
      <Bell className="mb-4 text-indigo-400" />

      <h2 className="text-3xl font-bold text-white">
        28
      </h2>

      <p className="text-slate-400">
        Total Notifications
      </p>

    </div>

    <div
      className="
        rounded-3xl
        border border-white/10
        bg-slate-900
        p-6
      "
    >
      <CheckCircle className="mb-4 text-emerald-400" />

      <h2 className="text-3xl font-bold text-white">
        14
      </h2>

      <p className="text-slate-400">
        Unread
      </p>

    </div>

    <div
      className="
        rounded-3xl
        border border-white/10
        bg-slate-900
        p-6
      "
    >
      <AlertCircle className="mb-4 text-amber-400" />

      <h2 className="text-3xl font-bold text-white">
        5
      </h2>

      <p className="text-slate-400">
        Important Alerts
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
      Recent Activity
    </h2>

    <div className="space-y-4">

      {notifications.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              flex items-start gap-4
              rounded-2xl
              border border-white/10
              bg-slate-950
              p-5
            "
          >

            <div
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-xl
                bg-slate-800
              "
            >
              <Icon
                className={item.color}
                size={20}
              />
            </div>

            <div className="flex-1">

              <div className="flex items-center justify-between">

                <h3 className="font-medium text-white">
                  {item.title}
                </h3>

                <span className="text-xs text-slate-500">
                  {item.time}
                </span>

              </div>

              <p className="mt-1 text-slate-400">
                {item.description}
              </p>

            </div>

          </div>
        );
      })}

    </div>

  </div>

</div>

);
}
