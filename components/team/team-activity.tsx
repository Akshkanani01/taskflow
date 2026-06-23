const logs = [
  {
    action:
      "Member Invited",
    user:
      "aksh@gmail.com",
    time:
      "2 minutes ago",
  },

  {
    action:
      "Role Updated",
    user:
      "john@gmail.com",
    time:
      "15 minutes ago",
  },

  {
    action:
      "Member Removed",
    user:
      "test@gmail.com",
    time:
      "1 hour ago",
  },

  {
    action:
      "Invite Accepted",
    user:
      "newuser@gmail.com",
    time:
      "2 hours ago",
  },
];

export default function TeamActivity() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-white/10
        bg-slate-900
      "
    >
      {logs.map((log, index) => (
        <div
          key={index}
          className="
            border-b
            border-white/5
            p-6
          "
        >
          <div className="flex items-center justify-between">

            <div>

              <p className="font-medium text-white">
                {log.action}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                {log.user}
              </p>

            </div>

            <div className="text-sm text-slate-500">
              {log.time}
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}