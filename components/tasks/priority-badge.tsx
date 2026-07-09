interface Props {
  priority: string;
}

export default function PriorityBadge({
  priority,
}: Props) {
  const styles = {
    LOW: {
      bg: "bg-zinc-800",
      text: "text-zinc-300",
      label: "Low",
    },

    MEDIUM: {
      bg: "bg-yellow-500/15",
      text: "text-yellow-400",
      label: "Medium",
    },

    HIGH: {
      bg: "bg-red-500/15",
      text: "text-red-400",
      label: "High",
    },
  } as const;

  const item =
    styles[priority as keyof typeof styles] ??
    styles.MEDIUM;

  return (
    <div
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${item.bg}
        ${item.text}
      `}
    >
      {item.label}
    </div>
  );
}