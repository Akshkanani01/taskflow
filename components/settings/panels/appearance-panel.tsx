"use client";

import {
  Laptop,
  Moon,
  Palette,
  Sun,
} from "lucide-react";

import {
  AccentColor,
  InterfaceDensity,
  ThemeMode,
} from "@prisma/client";

import {
  useTheme,
} from "@/components/providers/theme-provider";

export default function AppearancePanel() {

  const {
    theme,
    accentColor,
    interfaceDensity,
    reducedMotion,

    setTheme,
    setAccentColor,
    setInterfaceDensity,
    setReducedMotion,

    isUpdating,

  } = useTheme();


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
          Appearance
        </h2>


        <p className="mt-2 text-sm text-muted-foreground">

          Customize how TaskFlow looks and feels.

        </p>

      </div>



      {/* Theme */}


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
            py-4
          "
        >

          <h3
            className="
              text-base
              font-semibold
              text-foreground
            "
          >
            Theme
          </h3>


          <p className="mt-1 text-sm text-muted-foreground">

            Choose how TaskFlow should appear.

          </p>

        </div>



        <div
          className="
            grid
            gap-3
            p-5
            md:grid-cols-3
          "
        >


          <button
            type="button"
            disabled={isUpdating}
            onClick={() =>
              void setTheme(ThemeMode.DARK)
            }
            className={`rounded-xl border p-4 text-left transition ${
              theme === ThemeMode.DARK

                ? "border-blue-500/30 bg-blue-500/10"

                : "border-border bg-background hover:border-border"
            }`}
          >

            <Moon
              className="
                mb-3
                h-5
                w-5
                text-blue-400
              "
            />


            <h4
              className="
                font-medium
                text-foreground
              "
            >
              Dark
            </h4>


            <p className="mt-1 text-xs text-muted-foreground">

              Low-light workspace.

            </p>


          </button>

</div>


          <button
            type="button"
            disabled={isUpdating}
            onClick={() =>
              void setTheme(ThemeMode.LIGHT)
            }
            className={`rounded-xl border p-4 text-left transition ${
              theme === ThemeMode.LIGHT

                ? "border-blue-500/30 bg-blue-500/10"

                : "border-border bg-background hover:border-border"
            }`}
          >

            <Sun
              className="
                mb-3
                h-5
                w-5
                text-amber-400
              "
            />


            <h4
              className="
                font-medium
                text-foreground
              "
            >
              Light
            </h4>


            <p className="mt-1 text-xs text-muted-foreground">

              Bright daytime interface.

            </p>


          </button>




          <button
            type="button"
            disabled={isUpdating}
            onClick={() =>
              void setTheme(ThemeMode.SYSTEM)
            }
            className={`rounded-xl border p-4 text-left transition ${
              theme === ThemeMode.SYSTEM

                ? "border-blue-500/30 bg-blue-500/10"

                : "border-border bg-background hover:border-border"
            }`}
          >

            <Laptop
              className="
                mb-3
                h-5
                w-5
                text-violet-400
              "
            />


            <h4
              className="
                font-medium
                text-foreground
              "
            >
              System
            </h4>


            <p className="mt-1 text-xs text-muted-foreground">

              Follow device settings.

            </p>


          </button>
        <div
          className="
            border-t
            border-border
            px-5
            py-4
          "
        >

          <div
            className="
              mb-3
              flex
              items-center
              gap-2
            "
          >

            <Palette
              className="
                h-4
                w-4
                text-pink-400
              "
            />


            <h4
              className="
                text-sm
                font-medium
                text-foreground
              "
            >
              Accent Color
            </h4>

          </div>


          <div className="flex flex-wrap gap-3">

            {[
              {
                value: AccentColor.BLUE,
                className: "bg-blue-500",
              },
              {
                value: AccentColor.VIOLET,
                className: "bg-violet-500",
              },
              {
                value: AccentColor.EMERALD,
                className: "bg-emerald-500",
              },
              {
                value: AccentColor.ORANGE,
                className: "bg-orange-500",
              },
              {
                value: AccentColor.ROSE,
                className: "bg-rose-500",
              },
              {
                value: AccentColor.CYAN,
                className: "bg-cyan-500",
              },
            ].map((color) => (

              <button
                key={color.value}
                type="button"
                disabled={isUpdating}
                onClick={() =>
                  void setAccentColor(color.value)
                }
                className={`
                  h-10
                  w-10
                  rounded-full
                  transition
                  hover:scale-105
                  ${color.className}
                  ${
                    accentColor === color.value
                      ? "ring-4 ring-foreground"
                      : "ring-2 ring-transparent hover:ring-foreground/20"
                  }
                `}
              />

            ))}

          </div>

        </div>

      </section>



      {/* Density */}


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
            Interface Density
          </h3>


          <p className="mt-1 text-sm text-muted-foreground">

            Adjust spacing across the application.

          </p>


        </div>



        <div className="space-y-5 p-6">


          <label
            className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
              interfaceDensity ===
              InterfaceDensity.COMFORTABLE

                ? "border-blue-500/30 bg-blue-500/10"

                : "border-border bg-background hover:border-border"
            }`}
          >

            <div>

              <p
                className="
                  font-medium
                  text-foreground
                "
              >
                Comfortable
              </p>


              <p className="mt-1 text-sm text-muted-foreground">

                More spacing for easier reading.

              </p>

            </div>


            <input
              type="radio"
              name="density"
              checked={
                interfaceDensity ===
                InterfaceDensity.COMFORTABLE
              }
              disabled={isUpdating}
              onChange={() =>
                void setInterfaceDensity(
                  InterfaceDensity.COMFORTABLE
                )
              }
            />


          </label>



          <label
            className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
              interfaceDensity ===
              InterfaceDensity.COMPACT

                ? "border-blue-500/30 bg-blue-500/10"

                : "border-border bg-background hover:border-border"
            }`}
          >

            <div>

              <p
                className="
                  font-medium
                  text-foreground
                "
              >
                Compact
              </p>


              <p className="mt-1 text-sm text-muted-foreground">

                Fit more information on screen.

              </p>

            </div>


            <input
              type="radio"
              name="density"
              checked={
                interfaceDensity ===
                InterfaceDensity.COMPACT
              }
              disabled={isUpdating}
              onChange={() =>
                void setInterfaceDensity(
                  InterfaceDensity.COMPACT
                )
              }
            />


          </label>


        </div>


      </section>
      
      {/* Accessibility */}

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
            Accessibility
          </h3>


          <p className="mt-1 text-sm text-muted-foreground">

            Reduce interface animations and motion effects.

          </p>

        </div>


        <div className="p-6">

          <label
            className="
              flex
              cursor-pointer
              items-center
              justify-between
              rounded-xl
              border
              border-border
              bg-background
              p-4
              transition
              hover:border-border
            "
          >

            <div>

              <p
                className="
                  font-medium
                  text-foreground
                "
              >
                Reduced Motion
              </p>


              <p className="mt-1 text-sm text-muted-foreground">

                Minimize animations throughout TaskFlow.

              </p>

            </div>


            <input
              type="checkbox"
              checked={reducedMotion}
              disabled={isUpdating}
              onChange={(e) =>
                void setReducedMotion(
                  e.target.checked
                )
              }
            />

          </label>

        </div>


      </section>



      {/* Preview */}


      <section
        className="
          rounded-2xl
          border
          border-dashed
          border-border
          bg-background
          p-6
        "
      >

        <div className="space-y-3">


          <div className="flex items-center justify-between">

            <span className="text-sm text-muted-foreground">
              Current Theme
            </span>


            <span
              className="
                rounded-full
                border
                border-border
                px-3
                py-1
                text-xs
                font-medium
                uppercase
                text-foreground
              "
            >
              {theme}
            </span>

          </div>



          <div className="flex items-center justify-between">

            <span className="text-sm text-muted-foreground">
              Accent
            </span>


            <span
              className="
                rounded-full
                border
                border-border
                px-3
                py-1
                text-xs
                font-medium
                uppercase
                text-foreground
              "
            >
              {accentColor}
            </span>

          </div>



          <div className="flex items-center justify-between">

            <span className="text-sm text-muted-foreground">
              Density
            </span>


            <span
              className="
                rounded-full
                border
                border-border
                px-3
                py-1
                text-xs
                font-medium
                uppercase
                text-foreground
              "
            >
              {interfaceDensity}
            </span>

          </div>



          <div className="flex items-center justify-between">

            <span className="text-sm text-muted-foreground">
              Motion
            </span>


            <span
              className="
                rounded-full
                border
                border-border
                px-3
                py-1
                text-xs
                font-medium
                uppercase
                text-foreground
              "
            >
              {reducedMotion
                ? "Reduced"
                : "Normal"}
            </span>

          </div>



          {isUpdating && (

            <div
              className="
                pt-2
                text-sm
                text-blue-400
              "
            >
              Saving appearance settings...
            </div>

          )}


        </div>


      </section>


    </div>
  );
}