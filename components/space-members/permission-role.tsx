"use client";

import {
  Crown,
  ShieldCheck,
  User,
  Eye,
} from "lucide-react";

import { SpaceRole } from "./permission-types";

interface Props {
  value: SpaceRole;
  onChange: (role: SpaceRole) => void;
}

const roles = [
  {
    value: "OWNER",
    title: "Owner",
    description: "Full access to this Space",
    icon: Crown,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },

  {
    value: "MANAGER",
    title: "Manager",
    description: "Manage lists and tasks",
    icon: ShieldCheck,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },

  {
    value: "MEMBER",
    title: "Member",
    description: "Work on assigned tasks",
    icon: User,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },

  {
    value: "VIEWER",
    title: "Viewer",
    description: "Read-only access",
    icon: Eye,
    color: "text-zinc-400",
    bg: "bg-zinc-700/20",
  },
] as const;

export default function PermissionRole({
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-3">

      <div>
        <h3 className="text-base font-semibold text-white">
          Space Role
        </h3>

    <p className="mt-1 text-sm text-zinc-500">
  Choose the member&apos;s role.
</p>
      </div>

      <div className="grid gap-3">

        {roles.map((role) => {

          const Icon = role.icon;

          const active =
            value === role.value;

          return (
            <button
              key={role.value}
              type="button"
              onClick={() =>
                onChange(role.value)
              }
              className={`
                group
                flex
                items-center
                justify-between
                rounded-2xl
                border
                p-4
                text-left
                transition-all
                duration-200

                ${
                  active
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-zinc-800 bg-[#141A24] hover:border-zinc-700 hover:bg-[#181F2C]"
                }
              `}
            >

              <div className="flex items-center gap-4">

                <div
                  className={`
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    ${role.bg}
                  `}
                >
                  <Icon
                    className={role.color}
                    size={20}
                  />
                </div>

                <div>

                  <h4 className="font-medium text-white">
                    {role.title}
                  </h4>

                  <p className="mt-1 text-sm text-zinc-500">
                    {role.description}
                  </p>

                </div>

              </div>

              <div
                className={`
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  transition-all

                  ${
                    active
                      ? "border-blue-500 bg-blue-500"
                      : "border-zinc-600"
                  }
                `}
              >
                {active && (
                  <div className="h-2 w-2 rounded-full bg-white" />
                )}
              </div>

            </button>
          );

        })}

      </div>

    </div>
  );
}