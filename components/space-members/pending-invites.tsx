"use client";

import {
  Trash2,
  Clock3,
  Mail,
} from "lucide-react";

import { format } from "date-fns";

export type PendingInvite = {
  id: string;
  email: string;
  role: string;
  token: string;
  createdAt: Date | string;
};

interface Props {
  invites: PendingInvite[];
  onCancel: (
    id: string
  ) => Promise<void>;
}

export default function PendingInvites({
  invites,
  onCancel,
}: Props) {
  if (!invites.length) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-[#232B38] bg-[#121722]">
      <div className="border-b border-[#232B38] p-5">
        <h2 className="text-lg font-semibold text-white">
          Pending Invitations
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Invitation emails have been sent and
          are waiting to be accepted.
        </p>
      </div>

      <div className="divide-y divide-[#232B38]">
        {invites.map(
          (invite) => (
            <div
              key={invite.id}
              className="flex items-center justify-between p-5"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail
                    size={16}
                    className="text-blue-400"
                  />

                  <p className="font-medium text-white">
                    {invite.email}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <span
                    className="
                      rounded-full
                      bg-indigo-500/10
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-indigo-300
                    "
                  >
                    {invite.role}
                  </span>

                  <span
                    className="
                      flex
                      items-center
                      gap-1
                      text-xs
                      text-zinc-500
                    "
                  >
                    <Clock3
                      size={14}
                    />

                    {format(
                      new Date(
                        invite.createdAt
                      ),
                      "dd MMM yyyy • hh:mm a"
                    )}
                  </span>

                  <span
                    className="
                      rounded-full
                      border
                      border-amber-500/30
                      bg-amber-500/10
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-amber-300
                    "
                  >
                    Waiting for acceptance
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  onCancel(
                    invite.id
                  )
                }
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-red-500/30
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-red-400
                  transition-colors
                  hover:bg-red-500/10
                "
              >
                <Trash2
                  size={16}
                />

                Cancel
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}