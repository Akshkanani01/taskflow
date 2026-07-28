import ChecklistForm from "./checklist-form";
import ChecklistItem from "./checklist-item";

type Props = {
  taskId: string;

  items: {
    id: string;
    title: string;
    completed: boolean;
  }[];
};

export default function ChecklistSection({
  taskId,
  items,
}: Props) {
  const completed =
    items.filter(
      (item) => item.completed
    ).length;

  const progress =
    items.length === 0
      ? 0
      : Math.round(
          (completed / items.length) * 100
        );

  return (
    <div className="rounded-3xl border border-border bg-card p-6">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-semibold text-foreground">
            Checklist
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {completed} of {items.length} completed
          </p>

        </div>

        <div className="rounded-full border border-border bg-background px-3 py-1 text-sm text-foreground">

          {progress}%

        </div>

      </div>

      {/* Progress */}

      <div className="mb-6 h-2 overflow-hidden rounded-full bg-background">

        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-300"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      {/* Add */}

      <ChecklistForm taskId={taskId} />

      {/* List */}

      <div className="mt-6 space-y-3">

        {items.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-border bg-background py-10 text-center">

            <p className="font-medium text-foreground">
              No checklist items
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Create your first checklist item.
            </p>

          </div>

        ) : (

          items.map((item) => (

            <ChecklistItem
              key={item.id}
              item={item}
            />

          ))

        )}

      </div>

    </div>
  );
}