type Props = {
  priority: string;
};

const styles = {
  LOW: {
    label: "Low",
    color:
      "border-emerald-500/30 bg-emerald-500/15 text-emerald-300",
    dot: "bg-emerald-400",
  },

  MEDIUM: {
    label: "Medium",
    color:
      "border-sky-500/30 bg-sky-500/15 text-sky-300",
    dot: "bg-sky-400",
  },

  HIGH: {
    label: "High",
    color:
      "border-orange-500/30 bg-orange-500/15 text-orange-300",
    dot: "bg-orange-400",
  },

  URGENT: {
    label: "Urgent",
    color:
      "border-red-500/30 bg-red-500/15 text-red-300",
    dot: "bg-red-400",
  },
} as const;

export default function PriorityBadge({
  priority,
}: Props) {
  const badge =
    styles[
      priority as keyof typeof styles
    ] ?? styles.MEDIUM;

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