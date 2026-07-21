"use client";

import { useState, useTransition } from "react";
import AvatarUpload from "@/components/shared/avatar-upload";
import {
  User2,
  Mail,
  Calendar,
  Save,
  Loader2,
} from "lucide-react";

import { toast } from "sonner";

import { updateMemberProfile } from "@/app/actions/member-actions";

import type {
  ProfileCardProps,
} from "@/types/member";

export default function ProfileCard({
  member,
}: ProfileCardProps) {

  const [pending, startTransition] =
    useTransition();

  const [name, setName] =
    useState(member.user.name ?? "");

  const [image, setImage] =
    useState(member.user.image ?? "");

  function saveProfile() {

    startTransition(async () => {

      try {

        await updateMemberProfile({

          name,

          image,

        });

        toast.success(
          "Profile updated successfully."
        );

      } catch (error: unknown) {

  toast.error(
    error instanceof Error
      ? error.message
      : "Unable to update profile."
  );

}

    });

  }

  return (

    <section className="rounded-3xl border border-white/10 bg-[#111827]">

      <div className="border-b border-white/10 p-7">

        <div className="flex items-center gap-3">

          <User2 className="h-6 w-6 text-indigo-400" />

          <div>

            <h2 className="text-xl font-semibold text-white">

              Profile

            </h2>

            <p className="mt-1 text-sm text-slate-400">

              Update your personal information.

            </p>

          </div>

        </div>

      </div>

      <div className="grid gap-8 p-8 lg:grid-cols-[220px_1fr]">
                {/* Avatar */}

        <div>

          

          <AvatarUpload
  value={image}
  onChange={setImage}
/>

        </div>

        {/* Profile Form */}

        <div className="space-y-6">

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-400">

              Full Name

            </label>

            <input

              value={name}

              onChange={(e) =>
                setName(
                  e.target.value
                )
              }

              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#0F172A]
                px-4
                py-3
                text-white
                outline-none
                transition
                focus:border-indigo-500
              "

            />

          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">

            <div className="flex items-center gap-3">

              <Mail className="h-5 w-5 text-indigo-400" />

              <div>

                <p className="text-xs uppercase tracking-wider text-slate-500">

                  Email Address

                </p>

                <p className="mt-1 text-white">

                  {member.user.email}

                </p>

              </div>

            </div>

          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">

            <div className="flex items-center gap-3">

              <Calendar className="h-5 w-5 text-indigo-400" />

              <div>

                <p className="text-xs uppercase tracking-wider text-slate-500">

                  Joined

                </p>

                <p className="mt-1 text-white">

                  {new Date(
                    member.joinedAt
                  ).toLocaleDateString(
                    "en-GB"
                  )}

                </p>

              </div>

            </div>

          </div>

          <div className="flex justify-end">

            <button

              type="button"

              disabled={pending}

              onClick={saveProfile}

              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-indigo-600
                px-6
                py-3
                font-medium
                text-white
                transition
                hover:bg-indigo-500
                disabled:cursor-not-allowed
                disabled:opacity-60
              "

            >

              {pending ? (

                <Loader2
                  size={18}
                  className="animate-spin"
                />

              ) : (

                <Save size={18} />

              )}

              Save Changes

            </button>

          </div>

        </div>

      </div>

    </section>

  );

}