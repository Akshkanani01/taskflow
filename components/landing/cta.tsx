import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            p-16
            text-center
          "
          style={{
            border: "1px solid color-mix(in srgb, var(--primary) 20%, var(--border))",
            background: `
              linear-gradient(
                90deg,
                color-mix(in srgb, var(--primary) 20%, transparent),
                color-mix(in srgb, var(--primary) 10%, transparent),
                color-mix(in srgb, var(--primary) 20%, transparent)
              )
            `,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(
                  circle at center,
                  color-mix(in srgb, var(--primary) 15%, transparent),
                  transparent 70%
                )
              `,
            }}
          />

          <div className="relative">
            <h2 className="text-5xl font-bold text-foreground">
              Ready To Transform
              <br />
              Your Workflow?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground">
              Manage projects, collaborate with teams and
              track progress — all from one workspace.
            </p>

            <Link href="/login">
              <Button
                size="lg"
                variant="secondary"
                className="mt-8 h-14 px-10 text-lg"
              >
                Launch Workspace →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}