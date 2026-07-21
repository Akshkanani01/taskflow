"use client";

import { useEffect, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import PermissionRole from "./permission-role";
import PermissionSummary from "./permission-summary";
import PermissionFooter from "./permission-footer";

import { SpaceRole } from "./permission-types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  member: {
    id: string;
    name: string;
    email: string;
    role: SpaceRole;
  } | null;

  onSave?: (
    role: SpaceRole
  ) => void;
}

export default function PermissionDrawer({
  open,
  onOpenChange,
  member,
  onSave,
}: Props) {
  const [role, setRole] =
    useState<SpaceRole>("MEMBER");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (member) {
      setRole(member.role);
    }
  }, [member]);

  if (!member) return null;
    return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent
        side="right"
        className="
          w-full
          border-l
          border-zinc-800
          bg-[#0B1017]
          p-0
          text-white
          sm:max-w-2xl
        "
      >
        {/* Header */}

        <SheetHeader className="border-b border-zinc-800 px-8 py-6">

          <SheetTitle className="text-left text-2xl font-semibold text-white">
            Manage Permissions
          </SheetTitle>

          <SheetDescription className="text-left text-zinc-500">
  Update this member&apos;s role and permissions.
</SheetDescription>

        </SheetHeader>

        {/* Member */}

        <div className="border-b border-zinc-800 px-8 py-6">

          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-violet-600
                to-blue-600
                text-lg
                font-semibold
              "
            >
              {member.name
                .split(" ")
                .map((x) => x[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div>

              <h2 className="text-lg font-semibold">
                {member.name}
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                {member.email}
              </p>

            </div>

          </div>

        </div>

        {/* Body */}

        <div
          className="
            flex-1
            overflow-y-auto
            px-8
            py-8
            space-y-8
          "
        >
                      {/* Role */}

          <PermissionRole
            value={role}
            onChange={setRole}
          />

          {/* Permission Summary */}

          <PermissionSummary
            role={role}
            onCustomize={() => {
              // TODO:
              // Open Advanced Permission Drawer
            }}
          />

          {/* Future */}

          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-zinc-800
              bg-[#141A24]
              p-6
            "
          >
            <h3 className="text-base font-semibold text-white">
              Advanced Permissions
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Need more control?
              <br />
              Create custom permissions for this member
              instead of using the default role preset.
            </p>

            <button
              type="button"
              className="
                mt-5
                rounded-xl
                bg-blue-600
                px-5
                py-2.5
                text-sm
                font-medium
                transition
                hover:bg-blue-500
              "
            >
              Customize Permissions
            </button>

          </div>

        </div>
                <PermissionFooter
          loading={loading}
          onCancel={() =>
            onOpenChange(false)
          }
          onSave={async () => {
            try {
              setLoading(true);

              await onSave?.(role);

              onOpenChange(false);
            } finally {
              setLoading(false);
            }
          }}
        />

      </SheetContent>

    </Sheet>
  );
}