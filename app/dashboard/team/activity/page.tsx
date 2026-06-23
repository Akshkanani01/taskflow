import TeamActivity
from "@/components/team/team-activity";

export default function TeamActivityPage() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Team Activity
        </h1>

        <p className="mt-2 text-slate-400">
          Workspace audit trail
        </p>
      </div>

      <TeamActivity />

    </div>
  );
}