import Link from "next/link";

export default function TeamHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-5xl font-bold text-white">
          Team
        </h1>

        <p className="mt-2 text-slate-400">
          Manage members, roles, invites and permissions
        </p>
      </div>

      <Link
        href="/dashboard/team/invites"
        className="
          rounded-2xl
          bg-indigo-600
          px-5
          py-3
          font-medium
          text-white
          transition
          hover:bg-indigo-500
        "
      >
        Invite Member
      </Link>
    </div>
  );
}