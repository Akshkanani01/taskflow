"use client";

import { Camera, Mail, User2 } from "lucide-react";
import AvatarUpload from "@/components/settings/profile/avatar-upload";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserAvatar } from "@/components/dashboard/user-avatar";

export default function ProfilePanel() {
  const { user } = useCurrentUser();

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Profile
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Manage your personal profile information.
        </p>
      </div>

      {/* Avatar */}

      <section className="rounded-2xl border border-white/10 bg-slate-900/40">
        <div className="border-b border-white/10 px-6 py-5">
          <h3 className="text-base font-semibold text-white">
            Profile Photo
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Upload a profile picture visible across your workspace.
          </p>
        </div>

        <div className="flex items-center gap-6 p-6">
          <UserAvatar className="h-24 w-24 text-2xl" />

          <div className="space-y-3">
            <AvatarUpload endpoint="avatarUploader" />
            <p className="text-xs text-slate-500">
              PNG, JPG or WebP up to 5 MB.
            </p>
          </div>
        </div>
      </section>

      {/* Personal Information */}

      <section className="rounded-2xl border border-white/10 bg-slate-900/40">
        <div className="border-b border-white/10 px-6 py-5">
          <h3 className="text-base font-semibold text-white">
            Personal Information
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Update your display name and account details.
          </p>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-300">
              Full Name
            </label>

            <div className="relative">
              <User2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

              <input
                defaultValue={user.name ?? ""}
                placeholder="Your full name"
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-slate-950
                  pl-11
                  pr-4
                  text-white
                  outline-none
                  transition
                  focus:border-blue-500/40
                  focus:ring-2
                  focus:ring-blue-500/20
                "
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-300">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

              <input
                value={user.email}
                readOnly
                className="
                  h-11
                  w-full
                  cursor-not-allowed
                  rounded-xl
                  border
                  border-white/10
                  bg-slate-900/70
                  pl-11
                  pr-4
                  text-slate-400
                "
              />
            </div>

            <p className="text-xs text-slate-500">
              Your email is managed by your authentication provider.
            </p>
          </div>
        </div>
      </section>

      {/* Actions */}

      <div className="flex justify-end">
        <button
          type="button"
          className="
            inline-flex
            h-11
            items-center
            justify-center
            rounded-xl
            bg-blue-600
            px-6
            text-sm
            font-medium
            text-white
            transition
            hover:bg-blue-500
          "
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}