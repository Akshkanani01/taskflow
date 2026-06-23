import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTA() {
return ( <section className="py-32"> <div className="container mx-auto px-6">

    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-indigo-500/20
        bg-gradient-to-r
        from-indigo-600/20
        via-purple-600/20
        to-indigo-600/20
        p-16
        text-center
      "
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_70%)]" />

      <div className="relative">

        <h2 className="text-5xl font-bold text-white">
          Ready To Transform
          <br />
          Your Workflow?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
          Manage lists, collaborate with teams and
          track progress — all from one workspace.
        </p>

        <Link href="/login">
          <Button
            size="lg"
            className="
              mt-8
              h-14
              px-10
              text-lg
              bg-white
              text-black
              hover:bg-slate-200
            "
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
