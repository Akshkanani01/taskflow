type Props = {
  status: string;
};

const styles = {

  TODO: {
    label: "Todo",
    color:
      "bg-slate-700/60 text-slate-200 border-slate-600",
    dot: "bg-slate-300",
  },

  IN_PROGRESS: {
    label: "In Progress",
    color:
      "bg-blue-500/15 text-blue-300 border-blue-500/30",
    dot: "bg-blue-400",
  },

  IN_REVIEW: {
    label: "In Review",
    color:
      "bg-amber-500/15 text-amber-300 border-amber-500/30",
    dot: "bg-amber-400",
  },

  DONE: {
    label: "Done",
    color:
      "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    dot: "bg-emerald-400",
  },

} as const;

export default function StatusBadge({
  status,
}: Props) {
    const badge =
    styles[
      status as keyof typeof styles
    ] ??
    styles.TODO;

  return (

    <div
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        px-3
        py-1.5
        text-xs
        font-semibold
        ${badge.color}
      `}
    >

      <span
        className={`
          h-2
          w-2
          rounded-full
          ${badge.dot}
        `}
      />

      {badge.label}

    </div>

  );

}