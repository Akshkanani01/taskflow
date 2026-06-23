type Invite = {
id: string;
email: string;
role: string;
status: string;
createdAt: Date;
token: string;
};

export default function PendingInvites({
invites,
}: {
invites: Invite[];
}) {
return ( <div
   className="
     overflow-hidden
     rounded-3xl
     border
     border-white/10
     bg-slate-900
   "
 > <div
     className="
       flex items-center
       justify-between
       border-b
       border-white/10
       px-6
       py-5
     "
   > <div> <h3 className="text-xl font-semibold text-white">
Pending Invitations </h3>


      <p className="mt-1 text-sm text-slate-400">
        Invitations waiting for acceptance
      </p>
    </div>

    <div
      className="
        rounded-xl
        bg-indigo-600/20
        px-4 py-2
        text-sm
        font-medium
        text-indigo-300
      "
    >
      {invites.length} Active
    </div>
  </div>

  {invites.length === 0 && (
    <div
      className="
        flex h-40
        items-center
        justify-center
        text-slate-500
      "
    >
      No pending invitations
    </div>
  )}

  <div className="divide-y divide-white/5">
    {invites.map((invite) => (
      <div
        key={invite.id}
        className="
          flex items-center
          justify-between
          px-6 py-5
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="
              flex h-12 w-12
              items-center
              justify-center
              rounded-full
              bg-indigo-600
              font-semibold
              text-white
            "
          >
            {invite.email
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <p className="font-medium text-white">
              {invite.email}
            </p>

            <div className="mt-1 flex items-center gap-3">
              <span
                className="
                  rounded-full
                  bg-emerald-500/20
                  px-3 py-1
                  text-xs
                  font-medium
                  text-emerald-300
                "
              >
                {invite.role}
              </span>

              <span className="text-xs text-slate-500">
                {new Date(
                  invite.createdAt
                ).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className="
              rounded-full
              bg-amber-500/20
              px-3 py-1
              text-xs
              font-medium
              text-amber-300
            "
          >
            Pending
          </span>

          <button
            className="
              rounded-xl
              border
              border-white/10
              px-4 py-2
              text-sm
              text-slate-300
              hover:bg-slate-800
            "
          >
            Resend
          </button>

          <button
            className="
              rounded-xl
              border
              border-red-500/20
              px-4 py-2
              text-sm
              text-red-400
              hover:bg-red-500/10
            "
          >
            Revoke
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

);
}
