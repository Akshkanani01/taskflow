export default function RolesPage() {
  const roles = [
    {
      name: "OWNER",
      permissions:
        "Full access",
    },
    {
      name: "ADMIN",
      permissions:
        "Manage members and projects",
    },
    {
      name: "MEMBER",
      permissions:
        "Manage tasks and projects",
    },
    {
      name: "VIEWER",
      permissions:
        "Read only access",
    },
  ];

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Roles
        </h1>
      </div>

      <div className="grid gap-6">
        {roles.map((role) => (
          <div
            key={role.name}
            className="
              rounded-3xl
              border
              border-white/10
              bg-slate-900
              p-6
            "
          >
            <h2 className="text-xl font-bold text-white">
              {role.name}
            </h2>

            <p className="mt-2 text-slate-400">
              {role.permissions}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}