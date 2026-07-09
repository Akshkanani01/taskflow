"use client";

import {
  useMemo,
  useState,
  useTransition,
} from "react";

import {
  Search,
  Check,
} from "lucide-react";

import { updateTaskAssignees } from "@/app/dashboard/spaces/[id]/lists/[listId]/actions";

type Member = {
  id: string;
  name: string;
};

type Props = {
  taskId: string;

  members: Member[];

  selected: string[];
};

export default function TaskAssigneeEditor({
  taskId,
  members,
  selected,
}: Props) {

  const [
    pending,
    startTransition,
  ] = useTransition();

  const [query, setQuery] =
    useState("");

  const [
    selectedUsers,
    setSelectedUsers,
  ] = useState(selected);

  const filtered =
    useMemo(() => {

      return members.filter((member) =>
        member.name
          .toLowerCase()
          .includes(
            query.toLowerCase()
          )
      );

    }, [members, query]);

  function toggle(
    id: string
  ) {

    const next =
      selectedUsers.includes(id)
        ? selectedUsers.filter(
            (x) => x !== id
          )
        : [
            ...selectedUsers,
            id,
          ];

    setSelectedUsers(next);

    startTransition(async () => {

      await updateTaskAssignees(
        taskId,
        next
      );

    });

  }
    return (

    <div>

      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">

        Assignees

      </label>

      {/* SEARCH */}

      <div className="relative mb-4">

        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          value={query}
          onChange={(e) =>
            setQuery(
              e.target.value
            )
          }
          placeholder="Search member..."
          className="
            h-11
            w-full
            rounded-xl
            border
            border-white/10
            bg-slate-900
            pl-10
            pr-4
            text-white
            outline-none
            focus:border-indigo-500
          "
        />

      </div>

      {/* MEMBER LIST */}

      <div className="max-h-72 space-y-2 overflow-y-auto rounded-xl border border-white/10 bg-slate-900 p-2">

        {filtered.length === 0 ? (

          <div className="py-6 text-center text-sm text-slate-500">

            No members found

          </div>

        ) : (

          filtered.map((member) => {

            const active =
              selectedUsers.includes(
                member.id
              );

            return (

              <button
                key={member.id}
                type="button"
                onClick={() =>
                  toggle(
                    member.id
                  )
                }
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  px-3
                  py-3
                  transition

                  ${
                    active
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-slate-800 text-slate-300"
                  }
                `}
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-slate-700
                      text-sm
                      font-semibold
                    "
                  >
                    {member.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <span>

                    {member.name}

                  </span>

                </div>

                {active && (

                  <Check
                    size={18}
                  />

                )}

              </button>

            );

          })

        )}

      </div>

      {pending && (

        <p className="mt-3 text-xs text-emerald-400">

          Saving assignees...

        </p>

      )}

    </div>

  );

}