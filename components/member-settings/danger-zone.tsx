"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  AlertTriangle,
  Trash2,
  LogOut,
  Crown,
  Loader2,
} from "lucide-react";

import { toast } from "sonner";

import {
  removeMember,
  leaveWorkspace,
  transferOwnership,
} from "@/app/actions/member-actions";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
  member: any;
}

export default function DangerZone({
  member,
}: Props) {

  const router = useRouter();

  const [pending, startTransition] =
    useTransition();

  const [leaveOpen, setLeaveOpen] =
    useState(false);

  const [removeOpen, setRemoveOpen] =
    useState(false);

  const [ownerOpen, setOwnerOpen] =
    useState(false);

  function leave() {

    startTransition(async () => {

      try {

        await leaveWorkspace({

          workspaceId:
            member.space.workspaceId,

        });

        toast.success(
          "You left the workspace."
        );

        router.push("/dashboard");

      } catch (e: any) {

        toast.error(
          e.message ??
            "Unable to leave workspace."
        );

      }

    });

  }

  function remove() {

    startTransition(async () => {

      try {

        await removeMember({

          workspaceId:
            member.space.workspaceId,

          targetUserId:
            member.userId,

        });

        toast.success(
          "Member removed successfully."
        );

        router.push(
          `/dashboard/spaces/${member.spaceId}/members`
        );

        router.refresh();

      } catch (e: any) {

        toast.error(
          e.message ??
            "Unable to remove member."
        );

      }

    });

  }

  function transfer() {

    startTransition(async () => {

      try {

        await transferOwnership({

          workspaceId:
            member.space.workspaceId,

          newOwnerId:
            member.userId,

        });

        toast.success(
          "Workspace ownership transferred."
        );

        router.refresh();

      } catch (e: any) {

        toast.error(
          e.message ??
            "Unable to transfer ownership."
        );

      }

    });

  }

  return (

    <>
      <section className="rounded-3xl border border-red-500/20 bg-[#111827] p-7">

        <div className="mb-8 flex items-center gap-3">

          <AlertTriangle className="h-6 w-6 text-red-400" />

          <div>

            <h2 className="text-xl font-semibold text-red-300">

              Danger Zone

            </h2>

            <p className="mt-1 text-sm text-slate-500">

              These actions permanently affect this member.

            </p>

          </div>

        </div>

        <div className="space-y-5">
                      {/* Leave Workspace */}

          <div className="group rounded-3xl border border-orange-500/20 bg-gradient-to-r from-orange-500/5 to-transparent p-6 transition hover:border-orange-400">

            <div className="flex items-center justify-between">

              <div>

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-orange-500/10 p-3">

                    <LogOut className="h-6 w-6 text-orange-400" />

                  </div>

                  <div>

                    <h3 className="text-lg font-semibold text-white">

                      Leave Workspace

                    </h3>

                    <p className="mt-1 text-sm text-slate-400">

                      Remove yourself from this workspace permanently.

                    </p>

                  </div>

                </div>

              </div>

              <button

                disabled={pending}

                onClick={() =>
                  setLeaveOpen(true)
                }

                className="
                  rounded-xl
                  bg-orange-600
                  px-5
                  py-3
                  font-medium
                  text-white
                  transition
                  hover:bg-orange-500
                  disabled:opacity-60
                "

              >

                {pending ? (

                  <Loader2 className="h-5 w-5 animate-spin" />

                ) : (

                  "Leave"

                )}

              </button>

            </div>

          </div>

          {/* Transfer Ownership */}

          <div className="group rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 to-transparent p-6 transition hover:border-yellow-400">

            <div className="flex items-center justify-between">

              <div>

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-yellow-500/10 p-3">

                    <Crown className="h-6 w-6 text-yellow-400" />

                  </div>

                  <div>

                    <h3 className="text-lg font-semibold text-white">

                      Transfer Ownership

                    </h3>

                    <p className="mt-1 text-sm text-slate-400">

                      Make this member the new owner of the workspace.

                    </p>

                  </div>

                </div>

              </div>

              <button

                disabled={pending}

                onClick={() =>
                  setOwnerOpen(true)
                }

                className="
                  rounded-xl
                  bg-yellow-600
                  px-5
                  py-3
                  font-medium
                  text-white
                  transition
                  hover:bg-yellow-500
                  disabled:opacity-60
                "

              >

                {pending ? (

                  <Loader2 className="h-5 w-5 animate-spin" />

                ) : (

                  "Transfer"

                )}

              </button>

            </div>

          </div>

          {/* Remove Member */}

          <div className="group rounded-3xl border border-red-500/20 bg-gradient-to-r from-red-500/5 to-transparent p-6 transition hover:border-red-400">

            <div className="flex items-center justify-between">

              <div>

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-red-500/10 p-3">

                    <Trash2 className="h-6 w-6 text-red-400" />

                  </div>

                  <div>

                    <h3 className="text-lg font-semibold text-white">

                      Remove Member

                    </h3>

                    <p className="mt-1 text-sm text-slate-400">

                      Permanently remove this member from the workspace.

                    </p>

                  </div>

                </div>

              </div>

              <button

                disabled={pending}

                onClick={() =>
                  setRemoveOpen(true)
                }

                className="
                  rounded-xl
                  bg-red-600
                  px-5
                  py-3
                  font-medium
                  text-white
                  transition
                  hover:bg-red-500
                  disabled:opacity-60
                "

              >

                {pending ? (

                  <Loader2 className="h-5 w-5 animate-spin" />

                ) : (

                  "Remove"

                )}

              </button>

            </div>

          </div>

        </div>

      </section>
            {/* Leave Workspace Dialog */}

      <AlertDialog
        open={leaveOpen}
        onOpenChange={setLeaveOpen}
      >
        <AlertDialogContent className="border-white/10 bg-[#111827]">

          <AlertDialogHeader>

            <AlertDialogTitle className="text-white">

              Leave Workspace?

            </AlertDialogTitle>

            <AlertDialogDescription asChild>

<div className="text-slate-400">

  <p>

    This member will immediately lose access to:

  </p>

  <ul className="mt-4 list-disc space-y-2 pl-5">

    <li>Workspace</li>

    <li>Spaces</li>

    <li>Projects</li>

    <li>Assigned Tasks</li>

    <li>Attachments</li>

    <li>Comments</li>

  </ul>

  <p className="mt-5">

    This action cannot be undone.

  </p>

</div>

</AlertDialogDescription>

          </AlertDialogHeader>

          <AlertDialogFooter>

            <AlertDialogCancel>

              Cancel

            </AlertDialogCancel>

            <AlertDialogAction

              disabled={pending}

              onClick={leave}

              className="bg-orange-600 hover:bg-orange-500"

            >

              {pending ? (

                <Loader2 className="mr-2 h-4 w-4 animate-spin" />

              ) : (

                <LogOut className="mr-2 h-4 w-4" />

              )}

              Leave Workspace

            </AlertDialogAction>

          </AlertDialogFooter>

        </AlertDialogContent>

      </AlertDialog>

      {/* Transfer Ownership */}

      <AlertDialog
        open={ownerOpen}
        onOpenChange={setOwnerOpen}
      >
        <AlertDialogContent className="border-white/10 bg-[#111827]">

          <AlertDialogHeader>

            <AlertDialogTitle className="text-white">

              Transfer Ownership?

            </AlertDialogTitle>

            <AlertDialogDescription className="text-slate-400">

              This member will become the new workspace owner.

              <br />

              Your role will automatically become <b>ADMIN</b>.

              <br />
              <br />

              This action should only be used when handing
              ownership to another trusted member.

            </AlertDialogDescription>

          </AlertDialogHeader>

          <AlertDialogFooter>

            <AlertDialogCancel>

              Cancel

            </AlertDialogCancel>

            <AlertDialogAction

              disabled={pending}

              onClick={transfer}

              className="bg-yellow-600 hover:bg-yellow-500"

            >

              {pending ? (

                <Loader2 className="mr-2 h-4 w-4 animate-spin" />

              ) : (

                <Crown className="mr-2 h-4 w-4" />

              )}

              Transfer Ownership

            </AlertDialogAction>

          </AlertDialogFooter>

        </AlertDialogContent>

      </AlertDialog>

      {/* Remove Member */}

      <AlertDialog
        open={removeOpen}
        onOpenChange={setRemoveOpen}
      >
        <AlertDialogContent className="border-red-500/20 bg-[#111827]">

          <AlertDialogHeader>

            <AlertDialogTitle className="text-red-300">

              Remove Member?

            </AlertDialogTitle>

            <AlertDialogDescription className="text-slate-400">

              This member will immediately lose access to:

              <ul className="mt-4 list-disc space-y-2 pl-5">

                <li>Workspace</li>

                <li>Spaces</li>

                <li>Projects</li>

                <li>Assigned Tasks</li>

                <li>Attachments</li>

                <li>Comments</li>

              </ul>

              <p className="mt-5">

                This action cannot be undone.

              </p>

            </AlertDialogDescription>

          </AlertDialogHeader>

          <AlertDialogFooter>

            <AlertDialogCancel>

              Cancel

            </AlertDialogCancel>

            <AlertDialogAction

              disabled={pending}

              onClick={remove}

              className="bg-red-600 hover:bg-red-500"

            >

              {pending ? (

                <Loader2 className="mr-2 h-4 w-4 animate-spin" />

              ) : (

                <Trash2 className="mr-2 h-4 w-4" />

              )}

              Remove Member

            </AlertDialogAction>

          </AlertDialogFooter>

        </AlertDialogContent>

      </AlertDialog>

    </>

  );

}