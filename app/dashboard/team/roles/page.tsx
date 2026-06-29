export default function RolesPage() {
  const roles = [
    {
      name: "OWNER",
      description: "Full system control",
      permissions: [
        "Everything in workspace",
        "Billing management",
        "Delete workspace",
        "Manage roles",
      ],
    },
    {
      name: "ADMIN",
      description: "Manage team & projects",
      permissions: [
        "Manage members",
        "Create/Delete projects",
        "Manage spaces",
        "Invite users",
      ],
    },
    {
      name: "MANAGER",
      description: "Manage tasks & execution",
      permissions: [
        "Create tasks",
        "Assign tasks",
        "Update tasks",
        "Manage project workflow",
      ],
    },
    {
      name: "MEMBER",
      description: "Standard team member",
      permissions: [
        "Create tasks",
        "Update own tasks",
        "Comment on tasks",
      ],
    },
    {
      name: "VIEWER",
      description: "Read-only access",
      permissions: [
        "View tasks",
        "View projects",
        "View dashboard",
      ],
    },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case "OWNER":
        return "from-purple-600 to-pink-600";
      case "ADMIN":
        return "from-indigo-600 to-blue-600";
      case "MANAGER":
        return "from-emerald-600 to-teal-600";
      case "MEMBER":
        return "from-slate-600 to-slate-700";
      case "VIEWER":
        return "from-gray-600 to-gray-700";
      default:
        return "from-slate-600 to-slate-700";
    }
  };

  return (
    <div className="space-y-10 p-6">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          Workspace Roles
        </h1>
        <p className="text-slate-400 mt-2">
          Manage permissions and access levels for your team
        </p>
      </div>

      {/* GRID */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {roles.map((role) => (
          <div
            key={role.name}
            className="
              rounded-3xl
              border border-white/10
              bg-slate-900/60
              backdrop-blur-xl
              p-6
              hover:border-white/20
              transition
            "
          >

            {/* ROLE HEADER */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {role.name}
              </h2>

              <span
                className={`
                  text-xs px-3 py-1 rounded-full text-white
                  bg-gradient-to-r ${getRoleColor(role.name)}
                `}
              >
                Role
              </span>
            </div>

            <p className="mt-2 text-slate-400 text-sm">
              {role.description}
            </p>

            {/* PERMISSIONS */}
            <div className="mt-5 space-y-2">
              <p className="text-xs text-slate-500 uppercase">
                Permissions
              </p>

              <div className="flex flex-wrap gap-2">
                {role.permissions.map((p) => (
                  <span
                    key={p}
                    className="
                      text-xs
                      px-3 py-1
                      rounded-lg
                      bg-slate-800
                      text-slate-300
                      border border-white/10
                    "
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}