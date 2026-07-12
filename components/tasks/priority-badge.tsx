type Props = {
  priority: string;
};

const styles = {

  LOW: {
    label: "Low",
    color:
      "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    dot: "bg-emerald-400",
  },

  MEDIUM: {
    label: "Medium",
    color:
      "bg-sky-500/15 text-sky-300 border-sky-500/30",
    dot: "bg-sky-400",
  },

  HIGH: {
    label: "High",
    color:
      "bg-orange-500/15 text-orange-300 border-orange-500/30",
    dot: "bg-orange-400",
  },

  URGENT: {
    label: "Urgent",
    color:
      "bg-red-500/15 text-red-300 border-red-500/30",
    dot: "bg-red-400",
  },

} as const;

export default function PriorityBadge({
  priority,
}: Props) {
    const badge =
    styles[
      priority as keyof typeof styles
    ] ??
    styles.MEDIUM;

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