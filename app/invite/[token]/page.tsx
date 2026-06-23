import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { acceptInvite } from "./actions";

export default async function InvitePage({
  params,
}: {
  params: Promise<{
    token: string;
  }>;
}) {
  const { token } =
    await params;

  const invite =
    await prisma.workspaceInvite.findUnique({
      where: {
        token,
      },

      include: {
        workspace: true,
      },
    });

  if (!invite) {
    notFound();
  }

  const expired =
    invite.expiresAt <
    new Date();

  return (
    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-slate-950
        px-6
      "
    >
      <div
        className="
          w-full
          max-w-xl
          rounded-3xl
          border
          border-white/10
          bg-slate-900
          p-10
        "
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">
            Workspace Invitation
          </h1>

          <p className="mt-3 text-slate-400">
            You have been invited
            to join
            <span className="font-semibold text-white">
              {" "}
              {invite.workspace.name}
            </span>
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-slate-950
            p-5
          "
        >
          <div className="space-y-2">
            <p className="text-sm text-slate-500">
              Email
            </p>

            <p className="text-white">
              {invite.email}
            </p>
          </div>

          <div className="mt-5 space-y-2">
            <p className="text-sm text-slate-500">
              Role
            </p>

            <p className="text-white">
              {invite.role}
            </p>
          </div>
        </div>

        {expired ? (
          <div
            className="
              mt-6
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/10
              p-4
              text-red-300
            "
          >
            This invitation has expired.
          </div>
        ) : (
          <form
            action={acceptInvite}
            className="mt-8"
          >
            <input
              type="hidden"
              name="token"
              value={invite.token}
            />

            <button
              type="submit"
              className="
                w-full
                rounded-2xl
                bg-indigo-600
                py-4
                font-medium
                text-white
                transition
                hover:bg-indigo-500
              "
            >
              Accept Invitation
            </button>
          </form>
        )}
      </div>
    </div>
  );
}