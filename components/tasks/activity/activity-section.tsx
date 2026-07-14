"use client";

type Activity = {
  id: string;
  action: string;
  createdAt: Date;
};

type Props = {
  activities: Activity[];
};

export default function ActivitySection({
  activities,
}: Props) {
  return (
    <div className="space-y-4">

      <h2 className="text-lg font-semibold text-white">
        Activity
      </h2>

      {activities.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950 py-10 text-center text-slate-500">
          No activity yet.
        </div>
      ) : (
        <div className="space-y-3">

          {activities.map((activity) => (
            <div
              key={activity.id}
              className="rounded-xl border border-white/10 bg-slate-950 p-4"
            >
              <p className="text-white">
                {activity.action}
              </p>

              <p className="mt-2 text-xs text-slate-500">
  {new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(activity.createdAt))}
</p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}
