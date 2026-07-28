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

      <h2 className="text-lg font-semibold text-foreground">
        Activity
      </h2>

      {activities.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-background py-10 text-center text-muted-foreground">
          No activity yet.
        </div>
      ) : (
        <div className="space-y-3">

          {activities.map((activity) => (
            <div
              key={activity.id}
              className="rounded-xl border border-border bg-background p-4"
            >
              <p className="text-foreground">
                {activity.action}
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
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
