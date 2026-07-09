"use client";

import { CheckCircle2 } from "lucide-react";

import { ROLE_PERMISSIONS } from "./permission-presets";
import { SpaceRole } from "./permission-types";

interface Props {
  role: SpaceRole;
  onCustomize?: () => void;
}

export default function PermissionSummary({
  role,
  onCustomize,
}: Props) {
  const permissions = ROLE_PERMISSIONS[role];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#141A24]">

      {/* Header */}

      <div className="border-b border-zinc-800 p-5">

        <h3 className="text-base font-semibold text-white">
          Role Permissions
        </h3>

        <p className="mt-1 text-sm text-zinc-500">
          These permissions are automatically applied for the selected role.
        </p>

      </div>

      {/* Permission List */}

      <div className="space-y-2 p-5">

        {permissions.map((permission) => (
          <div
            key={permission}
            className="
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-zinc-800
              bg-[#0F172A]
              px-4
              py-3
              transition-all
              hover:border-zinc-700
            "
          >
            <CheckCircle2
              size={18}
              className="text-emerald-400"
            />

            <span className="text-sm text-zinc-200">
              {permission}
            </span>

          </div>
        ))}

      </div>

      {/* Footer */}

      <div className="border-t border-zinc-800 p-5">

        <button
          onClick={onCustomize}
          className="
            w-full
            rounded-xl
            border
            border-blue-500/30
            bg-blue-500/10
            px-4
            py-3
            text-sm
            font-medium
            text-blue-300
            transition-all
            hover:bg-blue-500/20
            hover:border-blue-400
          "
        >
          Customize Permissions →
        </button>

        <p className="mt-3 text-center text-xs text-zinc-500">
          Advanced permissions override the default role permissions.
        </p>

      </div>

    </div>
  );
}