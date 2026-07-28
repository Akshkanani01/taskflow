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
    <section className="rounded-3xl border border-border bg-card">

      <div className="border-b border-border p-7">

        <div className="flex items-center gap-3">

          <User2 className="h-6 w-6 text-primary" />

          <div>

            <h2 className="text-xl font-semibold text-foreground">
              Profile
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
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

            <label className="mb-2 block text-sm font-medium text-muted-foreground">
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
                border-border
                bg-background
                px-4
                py-3
                text-foreground
                outline-none
                transition
                focus:border-primary
              "
            />

          </div>

          <div className="rounded-2xl border border-border bg-card p-5">

            <div className="flex items-center gap-3">

              <Mail className="h-5 w-5 text-primary" />

              <div>

                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Email Address
                </p>

                <p className="mt-1 text-foreground">
                  {member.user.email}
                </p>

              </div>

            </div>

          </div>

          <div className="rounded-2xl border border-border bg-card p-5">

            <div className="flex items-center gap-3">

              <Calendar className="h-5 w-5 text-primary" />

              <div>

                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Joined
                </p>

                <p className="mt-1 text-foreground">
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
                bg-primary
                px-6
                py-3
                font-medium
                text-primary-foreground
                transition
                hover:bg-primary/90
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