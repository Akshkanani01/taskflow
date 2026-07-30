"use client";

import {
  Mail,
  User2,
} from "lucide-react";

import AvatarUpload from "@/components/settings/profile/avatar-upload";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserAvatar } from "@/components/dashboard/user-avatar";

export default function ProfilePanel() {

  const { user } = useCurrentUser();


  return (
    <div
  className="
    flex
    h-full
    flex-col
    space-y-8
  "
>


      {/* Header */}

      <div>

        <h2
          className="
            text-2xl
            font-semibold
            tracking-tight
            text-foreground
          "
        >
          Account 
        </h2>


        <p className="mt-2 text-sm text-muted-foreground">
          Manage your account information, profile photo, and personal details.
        </p>


      </div>



      {/* Avatar */}

      <section
        className="
          rounded-2xl
          border
          border-border
          bg-card/80
        "
      >

        <div
          className="
            border-b
            border-border
            px-6
            py-5
          "
        >

          <h3
            className="
              text-base
              font-semibold
              text-foreground
            "
          >
            Profile Photo
          </h3>


          <p className="mt-1 text-sm text-muted-foreground">
            Upload a profile picture visible across your workspace.
          </p>


        </div>


        <div
  className="
    flex
    flex-col
    gap-6
    p-6
    sm:flex-row
    sm:items-center
  "
>

          <UserAvatar
            className="h-28 w-28 text-3xl"
          />


          <div className="space-y-3">

            <AvatarUpload
              endpoint="avatarUploader"
            />


            <p className="text-xs text-muted-foreground">
              PNG, JPG, or WebP. Maximum file size: 5 MB.
            </p>


          </div>


        </div>


      </section>



      {/* Personal Information */}


      <section
        className="
          rounded-2xl
          border
          border-border
          bg-card/80
        "
      >

        <div
          className="
            border-b
            border-border
            px-6
            py-5
          "
        >

          <h3
            className="
              text-base
              font-semibold
              text-foreground
            "
          >
            Personal Information
          </h3>


          <p className="mt-1 text-sm text-muted-foreground">
            Update your display name and account details.
          </p>


        </div>



        <div
  className="
    grid
    gap-6
    p-6
    lg:grid-cols-2
  "
>


          <div className="space-y-2 md:col-span-2">

            <label
              className="
                text-sm
                font-medium
                text-muted-foreground
              "
            >
              Full Name
            </label>


            <div className="relative">

              <User2
                className="
                  absolute
                  left-4
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-muted-foreground
                "
              />


              <input
                defaultValue={user.name ?? ""}
                placeholder="Your full name"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-border
                  bg-background
                  pl-11
                  pr-4
                  text-foreground
                  outline-none
                  transition
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/20
                "
              />

            </div>

          </div>




          <div className="space-y-2 md:col-span-2">


            <label
              className="
                text-sm
                font-medium
                text-muted-foreground
              "
            >
              Email Address
            </label>


            <div className="relative">


              <Mail
                className="
                  absolute
                  left-4
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-muted-foreground
                "
              />


              <input
                value={user.email}
                readOnly
                className="
                  h-12
                  w-full
                  cursor-not-allowed
                  rounded-xl
                  border
                  border-border
                  bg-muted
                  pl-11
                  pr-4
                  text-muted-foreground
                "
              />


            </div>


            <p className="text-xs text-muted-foreground">
              Your email is managed by your authentication provider.
            </p>


          </div>


        </div>


      </section>



      {/* Actions */}
<div className="flex-1" />

      <div className="mt-auto flex justify-end">

        <button
          type="button"
          className="
            inline-flex
min-w-36
            h-11
            items-center
            justify-center
            rounded-xl
            bg-primary
            px-8
            text-sm
            font-medium
            text-foreground
            transition
            hover:opacity-90
          "
        >
          Save Changes
        </button>


      </div>


    </div>
  );
}