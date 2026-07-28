import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-32 pt-40">
      <div
        className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-[150px]"
        style={{
          background:
            "color-mix(in srgb, var(--primary) 20%, transparent)",
        }}
      />

      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-6xl text-center">
          <div
            className="inline-flex items-center rounded-full border px-4 py-2 text-sm"
            style={{
              borderColor:
                "color-mix(in srgb, var(--primary) 20%, transparent)",
              background:
                "color-mix(in srgb, var(--primary) 10%, transparent)",
              color: "var(--primary)",
            }}
          >
            🚀 Free Forever Project Management Platform
          </div>

          <h1
            className="
              mt-8
              text-6xl
              font-bold
              tracking-tight
              text-foreground
              md:text-8xl
              lg:text-9xl
            "
          >
            Manage lists
            <br />
            Without Limits
          </h1>

          <p
            className="
              mx-auto
              mt-8
              max-w-3xl
              text-xl
              text-muted-foreground
              md:text-2xl
            "
          >
            Organize lists, manage tasks, collaborate with teams,
            and track progress — all in one beautiful workspace.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/login">
              <Button
                size="lg"
                className="h-14 px-10 text-lg"
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