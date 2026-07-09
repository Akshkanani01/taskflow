interface Props {
  status: string;
}

export default function StatusBadge({ status }: Props) {
  const styles = {
    TODO: {
      bg: "bg-zinc-800",
      text: "text-zinc-300",
      dot: "bg-zinc-400",
      label: "Todo",
    },

    IN_PROGRESS: {
      bg: "bg-blue-500/15",
      text: "text-blue-400",
      dot: "bg-blue-500",
      label: "In Progress",
    },

    DONE: {
      bg: "bg-emerald-500/15",
      text: "text-emerald-400",
      dot: "bg-emerald-500",
      label: "Done",
    },
  } as const;

  const item =
    styles[status as keyof typeof styles] ??
    styles.TODO;

  return (
    <div
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${item.bg}
        ${item.text}
      `}
    >
      <span
        className={`h-2 w-2 rounded-full ${item.dot}`}
      />

      {item.label}
    </div>
  );
}