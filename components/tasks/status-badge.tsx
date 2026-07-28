type Props = {
  status: string;
};

const styles = {
  TODO: {
    label: "Todo",
    color:
      "border-border bg-muted text-foreground",
    dot: "bg-muted-foreground",
  },

  IN_PROGRESS: {
    label: "In Progress",
    color:
      "border-blue-500/30 bg-blue-500/15 text-blue-300",
    dot: "bg-blue-400",
  },

  IN_REVIEW: {
    label: "In Review",
    color:
      "border-amber-500/30 bg-amber-500/15 text-amber-300",
    dot: "bg-amber-400",
  },

  DONE: {
    label: "Done",
    color:
      "border-emerald-500/30 bg-emerald-500/15 text-emerald-300",
    dot: "bg-emerald-400",
  },
} as const;

export default function StatusBadge({
  status,
}: Props) {
  const badge =
    styles[
      status as keyof typeof styles
    ] ?? styles.TODO;

  return (
    <span
      className={`
        inline-flex
        h-8
        min-w-[92px]
        items-center
        justify-center
        gap-2
        rounded-full
        border
        px-3
        text-xs
        font-semibold
        whitespace-nowrap
        transition-colors
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
    </span>
  );
}