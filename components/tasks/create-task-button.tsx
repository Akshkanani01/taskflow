"use client";

import { Plus } from "lucide-react";

type Props = {
  onClick: () => void;
};

export default function CreateTaskButton({
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="
        inline-flex
        items-center
        gap-2
        rounded-xl
        bg-indigo-600
        px-5
        py-2.5
        text-sm
        font-medium
        text-white
        transition
        hover:bg-indigo-500
      "
    >
      <Plus size={18} />

      Create Task
    </button>
  );
}