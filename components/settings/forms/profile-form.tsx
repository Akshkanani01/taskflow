"use client";

import {
  useActionState,
  useEffect,
  useTransition,
} from "react";

import {
  useFormStatus,
} from "react-dom";

import {
  toast,
} from "sonner";

import {
  updateProfile,
  type UpdateProfileState,
} from "@/app/actions/settings/update-profile";

import {
  useCurrentUser,
} from "@/hooks/use-current-user";


const initialState: UpdateProfileState = {
  success: false,
  message: "",
  errors: undefined,
  user: undefined,
};



function SaveButton() {

  const {
    pending,
  } = useFormStatus();


  return (

    <button
      type="submit"
      disabled={pending}
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
        text-foreground
        transition
        hover:bg-blue-500
        disabled:pointer-events-none
        disabled:opacity-50
      "
    >

      {pending
        ? "Saving..."
        : "Save Changes"}

    </button>

  );

}



export default function ProfileForm() {

  const {
    user,
    updateUser,
  } = useCurrentUser();



  const [
    state,
    formAction,
  ] = useActionState(
    updateProfile,
    initialState
  );



  const [
    ,
    startTransition,
  ] = useTransition();



  useEffect(() => {

    if (!state.message) return;


    if (state.success) {

      toast.success(
        state.message
      );


      if (state.user) {

        const updatedUser =
          state.user;


        startTransition(() => {

          updateUser(
            updatedUser
          );

        });

      }


    } else {

      toast.error(
        state.message
      );

    }


  }, [
    state,
    updateUser,
    startTransition,
  ]);



  return (

    <form
      action={formAction}
      className="space-y-8"
    >

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

            Update your profile information.

          </p>


        </div>



        <div className="p-6">


          <div className="space-y-2">


            <label
              className="
                text-sm
                font-medium
                text-muted-foreground
              "
            >
              Full Name
            </label>


            <input
              name="name"
              defaultValue={
                user.name ?? ""
              }
              placeholder="Enter your full name"
              className="
                h-11
                w-full
                rounded-xl
                border
                border-border
                bg-background
                px-4
                text-foreground
                outline-none
                transition
                focus:border-blue-500/40
                focus:ring-2
                focus:ring-blue-500/20
              "
            />


            {state.errors?.name?.length ? (

              <p className="text-sm text-red-400">

                {state.errors.name[0]}

              </p>

            ) : null}


          </div>



          <div className="mt-6 space-y-2">


            <label
              className="
                text-sm
                font-medium
                text-muted-foreground
              "
            >
              Email
            </label>


            <input
              value={
                user.email
              }
              readOnly
              disabled
              className="
                h-11
                w-full
                cursor-not-allowed
                rounded-xl
                border
                border-border
                bg-muted
                px-4
                text-muted-foreground
              "
            />


            <p className="text-xs text-muted-foreground">

              Email address is managed by your authentication provider.

            </p>


          </div>


        </div>


      </section>



      <div className="flex justify-end">

        <SaveButton />

      </div>


    </form>

  );

}