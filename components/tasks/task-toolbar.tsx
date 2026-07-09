"use client";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function TaskToolbar() {
  const router = useRouter();

  const params = useSearchParams();

  function update(
    key: string,
    value: string
  ) {
    const search =
      new URLSearchParams(
        params.toString()
      );

    if (!value) {
      search.delete(key);
    } else {
      search.set(key, value);
    }

    router.push(
      `?${search.toString()}`
    );
  }

  return (
    <div className="mb-6 flex items-center justify-between">

      <div className="flex items-center gap-3">

        <input
          defaultValue={
            params.get("search") ??
            ""
          }
          placeholder="Search tasks..."
          onKeyDown={(e) => {
            if (
              e.key === "Enter"
            ) {
              update(
                "search",
                (
                  e.target as HTMLInputElement
                ).value
              );
            }
          }}
          className="h-11 w-72 rounded-xl border border-white/10 bg-slate-900 px-4 text-sm text-white outline-none"
        />

        <select
          defaultValue={
            params.get("status") ??
            ""
          }
          onChange={(e) =>
            update(
              "status",
              e.target.value
            )
          }
          className="h-11 rounded-xl border border-white/10 bg-slate-900 px-4 text-white"
        >
          <option value="">
            All Status
          </option>

          <option value="TODO">
            Todo
          </option>

          <option value="IN_PROGRESS">
            In Progress
          </option>

          <option value="DONE">
            Done
          </option>
        </select>

        <select
          defaultValue={
            params.get(
              "priority"
            ) ?? ""
          }
          onChange={(e) =>
            update(
              "priority",
              e.target.value
            )
          }
          className="h-11 rounded-xl border border-white/10 bg-slate-900 px-4 text-white"
        >
          <option value="">
            Priority
          </option>

          <option value="LOW">
            Low
          </option>

          <option value="MEDIUM">
            Medium
          </option>

          <option value="HIGH">
            High
          </option>
        </select>

      </div>

      <select
        defaultValue={
          params.get("sort") ??
          "position"
        }
        onChange={(e) =>
          update(
            "sort",
            e.target.value
          )
        }
        className="h-11 rounded-xl border border-white/10 bg-slate-900 px-4 text-white"
      >
        <option value="position">
          Sort
        </option>

        <option value="title">
          Title
        </option>

        <option value="priority">
          Priority
        </option>

        <option value="dueDate">
          Due Date
        </option>
      </select>

    </div>
  );
}