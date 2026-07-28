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
    <div className="rounded-2xl border border-border bg-card">
      <div className="border-b border-border p-5">
        <h2 className="text-lg font-semibold text-foreground">
          Pending Invitations
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Invitation emails have been sent and are waiting to be accepted.
        </p>
      </div>

      <div className="divide-y divide-border">
        {invites.map((invite) => (
          <div
            key={invite.id}
            className="flex items-center justify-between p-5"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail
                  size={16}
                  className="text-primary"
                />

                <p className="font-medium text-foreground">
                  {invite.email}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <span
                  className="
                    rounded-full
                    border
                    border-primary/20
                    bg-primary/10
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-primary
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
                    text-muted-foreground
                  "
                >
                  <Clock3 size={14} />

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
                border-destructive/30
                px-4
                py-2
                text-sm
                font-medium
                text-destructive
                transition
                hover:bg-destructive/10
              "
            >
              <Trash2
                size={16}
              />

              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}