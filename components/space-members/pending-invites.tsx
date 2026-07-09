"use client";

import { Copy, Trash2, Clock3 } from "lucide-react";
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
  onCancel: (id: string) => Promise<void>;
}

export default function PendingInvites({
  invites,
  onCancel,
}: Props) {
  if (!invites.length) {
    return null;
  }

  async function copyInvite(token: string) {
    const url =
      `${window.location.origin}/invite/${token}/accept`;

    await navigator.clipboard.writeText(url);

    alert("Invite link copied.");
  }

  return (
    <div className="rounded-2xl border border-[#232B38] bg-[#121722]">

      <div className="border-b border-[#232B38] p-5">

        <h2 className="text-lg font-semibold text-white">
          Pending Invitations
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Invitations waiting to be accepted.
        </p>

      </div>

      <div className="divide-y divide-[#232B38]">

        {invites.map((invite) => (
          <div
            key={invite.id}
            className="flex items-center justify-between p-5"
          >
            <div>

              <p className="font-medium text-white">
                {invite.email}
              </p>

              <div className="mt-2 flex items-center gap-4">

                <span
                  className="
                    rounded-full
                    bg-indigo-500/10
                    px-3
                    py-1
                    text-xs
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
  <Clock3 size={14} />

  {format(
    new Date(invite.createdAt),
    "dd MMM yyyy • hh:mm a"
  )}
</span>
              </div>

            </div>

            <div className="flex gap-2">

              <button
                onClick={() =>
                  copyInvite(invite.token)
                }
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-zinc-700
                  px-3
                  py-2
                  text-sm
                  text-white
                  hover:bg-zinc-800
                "
              >
                <Copy size={16} />
                Copy Link
              </button>

              <button
                onClick={() =>
                  onCancel(invite.id)
                }
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-red-500/30
                  px-3
                  py-2
                  text-sm
                  text-red-400
                  hover:bg-red-500/10
                "
              >
                <Trash2 size={16} />
                Cancel
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}