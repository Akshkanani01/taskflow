import {
  ArrowUpRight,
  Users,
  FolderKanban,
} from "lucide-react";

export function DashboardHero() {
  return (
    <section
      className="
        relative overflow-hidden
        rounded-3xl
        border border-border
        bg-gradient-to-r
        from-indigo-600
        via-violet-600
        to-fuchsia-600
        p-8
      "
    >
      <div className="max-w-3xl">

        <span
          className="
            inline-flex items-center
            rounded-full
            bg-background/10
            px-3 py-1
            text-sm
            text-primary-foreground
          "
        >
          🚀 Productivity up 24% this month
        </span>

        <h1
          className="
            mt-6
            text-5xl
            font-bold
            tracking-tight
            text-primary-foreground
          "
        >
          Welcome back, Aksh 👋
        </h1>

        <p
          className="
            mt-4
            text-lg
            text-indigo-100
          "
        >
          Manage lists, tasks, teams and
          workflows from a single enterprise
          workspace.
        </p>

        <div className="mt-8 flex gap-4">

          <button
            className="
              rounded-xl
              bg-primary
              px-5 py-3
              font-medium
              text-primary-foreground
            "
          >
            Create Project
          </button>

          <button
            className="
              flex items-center gap-2
              rounded-xl
              border border-border
              px-5 py-3
              text-primary-foreground
            "
          >
            View Reports
            <ArrowUpRight size={16} />
          </button>

        </div>

      </div>

      <div
        className="
          mt-10
          grid gap-4
          md:grid-cols-3
        "
      >

        <div
          className="
            rounded-2xl
            bg-background/10
            p-5
            backdrop-blur
          "
        >
          <FolderKanban size={24} />

          <p className="mt-4 text-3xl font-bold">
            24
          </p>

          <p className="text-indigo-100">
            Active lists
          </p>
        </div>

        <div
          className="
            rounded-2xl
            bg-background/10
            p-5
            backdrop-blur
          "
        >
          <Users size={24} />

          <p className="mt-4 text-3xl font-bold">
            18
          </p>

          <p className="text-indigo-100">
            Team Members
          </p>
        </div>

        <div
          className="
            rounded-2xl
            bg-background/10
            p-5
            backdrop-blur
          "
        >
          <ArrowUpRight size={24} />

          <p className="mt-4 text-3xl font-bold">
            87%
          </p>

          <p className="text-indigo-100">
            Productivity Score
          </p>
        </div>

      </div>

    </section>
  );
}