"use client";

import {
  KeyRound,
  Laptop,
  Link2,
  ShieldCheck,
} from "lucide-react";

export default function SecurityPanel() {
  return (
    <div className="space-y-8">

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
          Security
        </h2>


        <p className="mt-2 text-sm text-muted-foreground">
          Manage your account security and active sessions.
        </p>

      </div>



      {/* Authentication */}

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

          <div className="flex items-center gap-3">

            <KeyRound className="h-5 w-5 text-blue-400" />


            <div>

              <h3
                className="
                  font-medium
                  text-foreground
                "
              >
                Authentication
              </h3>


              <p className="mt-1 text-sm text-muted-foreground">
                Your account uses passwordless Magic Link authentication.
              </p>

            </div>

          </div>

        </div>



        <div className="space-y-4 p-6">


          <div
            className="
              rounded-xl
              border
              border-border
              bg-background
              p-4
            "
          >

            <p className="font-medium text-foreground">
              Sign in Method
            </p>


            <p className="mt-1 text-sm text-muted-foreground">
              Magic Link via email
            </p>


          </div>



          <button
            type="button"
            className="
              rounded-xl
              border
              border-border
              bg-muted
              px-5
              py-2.5
              text-sm
              font-medium
              text-foreground
              transition
              hover:bg-accent
            "
          >
            Send New Magic Link
          </button>


        </div>


      </section>



      {/* Sessions */}


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

          <div className="flex items-center gap-3">

            <Laptop className="h-5 w-5 text-emerald-400" />


            <div>

              <h3 className="font-medium text-foreground">
                Active Sessions
              </h3>


              <p className="mt-1 text-sm text-muted-foreground">
                Devices currently signed into your account.
              </p>


            </div>


          </div>


        </div>



        <div className="space-y-4 p-6">


          <div
            className="
              rounded-xl
              border
              border-border
              bg-background
              p-4
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="font-medium text-foreground">
                  Current Device
                </p>


                <p className="mt-1 text-sm text-muted-foreground">
                  Windows • Chrome
                </p>


              </div>


              <span
                className="
                  rounded-full
                  bg-emerald-500/10
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-emerald-400
                "
              >
                Active
              </span>


            </div>


          </div>



          <button
            type="button"
            className="
              rounded-xl
              border
              border-red-500/20
              bg-red-500/10
              px-5
              py-2.5
              text-sm
              font-medium
              text-red-300
              transition
              hover:bg-red-500/20
            "
          >
            Sign Out Other Sessions
          </button>


        </div>


      </section>
      
      {/* Connected Providers */}

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

          <div className="flex items-center gap-3">

            <Link2 className="h-5 w-5 text-violet-400" />


            <div>

              <h3
                className="
                  font-medium
                  text-foreground
                "
              >
                Connected Providers
              </h3>


              <p className="mt-1 text-sm text-muted-foreground">
                Authentication providers linked to your account.
              </p>


            </div>


          </div>


        </div>



        <div className="space-y-4 p-6">


          <div
            className="
              rounded-xl
              border
              border-border
              bg-background
              p-4
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <div>

                <p className="font-medium text-foreground">
                  Email Magic Link
                </p>


                <p className="mt-1 text-sm text-muted-foreground">
                  Connected
                </p>


              </div>


              <ShieldCheck
                className="
                  h-5
                  w-5
                  text-emerald-400
                "
              />


            </div>


          </div>


        </div>


      </section>


    </div>
  );
}