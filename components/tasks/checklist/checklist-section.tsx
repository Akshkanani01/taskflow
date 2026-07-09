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
    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-semibold text-white">
            Checklist
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {completed} of {items.length} completed
          </p>

        </div>

        <div className="rounded-full border border-white/10 bg-slate-950 px-3 py-1 text-sm text-slate-300">

          {progress}%

        </div>

      </div>

      {/* Progress */}

      <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-800">

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

          <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950 py-10 text-center">

            <p className="font-medium text-white">
              No checklist items
            </p>

            <p className="mt-2 text-sm text-slate-500">
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