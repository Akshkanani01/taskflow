"use client";

export default function RoleSelector({
  role,
}: {
  role: string;
}) {
  const colors = {
    OWNER:
      "bg-purple-500/20 text-purple-300",

    ADMIN:
      "bg-indigo-500/20 text-indigo-300",

    MEMBER:
      "bg-emerald-500/20 text-emerald-300",

    VIEWER:
      "bg-slate-500/20 text-slate-300",
  };

  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${colors[
          role as keyof typeof colors
        ]}
      `}
    >
      {role}
    </span>
  );
}