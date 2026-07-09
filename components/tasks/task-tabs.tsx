"use client";

import { ListTodo, CheckCircle2, Clock3, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  {
    id: "all",
    label: "All Tasks",
    icon: ListTodo,
    count: 124,
  },
  {
    id: "todo",
    label: "Todo",
    icon: AlertTriangle,
    count: 36,
  },
  {
    id: "progress",
    label: "In Progress",
    icon: Clock3,
    count: 51,
  },
  {
    id: "done",
    label: "Completed",
    icon: CheckCircle2,
    count: 37,
  },
];

export default function TaskTabs() {
  return (
    <div className="rounded-2xl border bg-white p-2 shadow-sm">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              className={cn(
                "flex items-center gap-3 rounded-xl px-5 py-3 transition-all",
                index === 0
                  ? "bg-slate-900 text-white shadow"
                  : "hover:bg-slate-100"
              )}
            >
              <Icon className="h-4 w-4" />

              <span className="font-medium">
                {tab.label}
              </span>

              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-semibold",
                  index === 0
                    ? "bg-white/20"
                    : "bg-slate-200"
                )}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}