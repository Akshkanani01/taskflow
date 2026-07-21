"use client";

import { useEffect, useState } from "react";
import {
  Crown,
  ShieldCheck,
  User,
  Eye,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  memberName: string;

  currentRole:
    | "OWNER"
    | "MANAGER"
    | "MEMBER"
    | "VIEWER";

  onSave?: (role: string) => void;
}

const roles: {
  value: Props["currentRole"];
  label: string;
  icon: typeof Crown;
  color: string;
  description: string;
}[] = [
  {
    value: "OWNER",
    label: "Owner",
    icon: Crown,
    color: "text-violet-400",
    description:
      "Full access to this Space.",
  },

  {
    value: "MANAGER",
    label: "Manager",
    icon: ShieldCheck,
    color: "text-blue-400",
    description:
      "Manage lists and tasks.",
  },

  {
    value: "MEMBER",
    label: "Member",
    icon: User,
    color: "text-emerald-400",
    description:
      "Work on assigned tasks.",
  },

  {
    value: "VIEWER",
    label: "Viewer",
    icon: Eye,
    color: "text-zinc-400",
    description:
      "Read-only access.",
  },
];

export default function ChangeRoleDialog({
  open,
  onOpenChange,
  memberName,
  currentRole,
  onSave,
}: Props) {
  const [selected, setSelected] =
    useState(currentRole);

  useEffect(() => {
    setSelected(currentRole);
  }, [currentRole]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-xl rounded-2xl border border-zinc-800 bg-[#111827] p-0 text-white">

        <DialogHeader className="border-b border-zinc-800 p-6">

          <DialogTitle>
            Change Role
          </DialogTitle>

          <DialogDescription>
            Update the role for{" "}
            <span className="font-medium text-white">
              {memberName}
            </span>
          </DialogDescription>

        </DialogHeader>

        <div className="space-y-3 p-6">

          {roles.map((role) => {

            const Icon = role.icon;

            const active =
              selected === role.value;

            return (
              <button
                key={role.value}
                type="button"
                onClick={() =>
                  setSelected(role.value)
                }
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  border
                  p-4
                  text-left
                  transition-all

                  ${
                    active
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900"
                  }
                `}
              >

                <div className="flex items-center gap-4">

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#1B2433]
                    "
                  >
                    <Icon
                      className={role.color}
                      size={20}
                    />
                  </div>

                  <div>

                    <h4 className="font-medium">
                      {role.label}
                    </h4>

                    <p className="mt-1 text-sm text-zinc-500">
                      {role.description}
                    </p>

                  </div>

                </div>

                <div
                  className={`
                    h-5
                    w-5
                    rounded-full
                    border-2

                    ${
                      active
                        ? "border-blue-500 bg-blue-500"
                        : "border-zinc-600"
                    }
                  `}
                />

              </button>
            );

          })}

        </div>

        <div className="flex justify-end gap-3 border-t border-zinc-800 p-6">

          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            className="bg-blue-600 hover:bg-blue-500"
            onClick={() => {
              onSave?.(selected);

              onOpenChange(false);
            }}
          >
            Save Changes
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}