"use client";

import {
  Calendar,
  Clock3,
  Flag,
  User2,
} from "lucide-react";

type UserOption = {
  id: string;
  name: string;
};

type Props = {
  priority: string;
  dueDate: string;
  estimatedHours: string;

  assignees: string[];

  members: UserOption[];

  onPriorityChange: (
    value: string
  ) => void;

  onDueDateChange: (
    value: string
  ) => void;

  onEstimateChange: (
    value: string
  ) => void;

  onAssigneeChange: (
    value: string[]
  ) => void;
};

export default function CreateTaskSidebar({
  priority,
  dueDate,
  estimatedHours,
  assignees,
  members,
  onPriorityChange,
  onDueDateChange,
  onEstimateChange,
  onAssigneeChange,
}: Props) {
  return (
    <div className="space-y-7">

      <div>

        <label className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500">

          <Flag size={14} />

          Priority

        </label>

        <select
          value={priority}
          onChange={(e) =>
            onPriorityChange(
              e.target.value
            )
          }
          className="
            h-11
            w-full
            rounded-xl
            border
            border-white/10
            bg-slate-900
            px-3
            text-white
          "
        >
          <option value="LOW">
            LOW
          </option>

          <option value="MEDIUM">
            MEDIUM
          </option>

          <option value="HIGH">
            HIGH
          </option>

          <option value="URGENT">
            URGENT
          </option>

        </select>

      </div>

      <div>

        <label className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500">

          <Calendar size={14} />

          Due Date

        </label>

        <input
          type="date"
          value={dueDate}
          onChange={(e) =>
            onDueDateChange(
              e.target.value
            )
          }
          className="
            h-11
            w-full
            rounded-xl
            border
            border-white/10
            bg-slate-900
            px-3
            text-white
          "
        />

      </div>

      <div>

        <label className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500">

          <Clock3 size={14} />

          Estimate

        </label>

        <input
          type="number"
          min={0}
          value={estimatedHours}
          onChange={(e) =>
            onEstimateChange(
              e.target.value
            )
          }
          className="
            h-11
            w-full
            rounded-xl
            border
            border-white/10
            bg-slate-900
            px-3
            text-white
          "
        />

      </div>

      <div>

        <label className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500">

          <User2 size={14} />

          Assignees

        </label>

        <select
          multiple
          value={assignees}
          onChange={(e) =>
            onAssigneeChange(
              Array.from(
                e.target.selectedOptions
              ).map(
                (o) =>
                  o.value
              )
            )
          }
          className="
            min-h-[180px]
            w-full
            rounded-xl
            border
            border-white/10
            bg-slate-900
            p-3
            text-white
          "
        >
          {members.map((member) => (
            <option
              key={member.id}
              value={member.id}
            >
              {member.name}
            </option>
          ))}

        </select>

      </div>

    </div>
  );
}