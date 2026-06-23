import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
return ( <section className="relative overflow-hidden pt-40 pb-32">


  <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[150px]" />

  <div className="container relative mx-auto px-6">

    <div className="mx-auto max-w-6xl text-center">

      <div className="inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
        🚀 Free Forever Project Management Platform
      </div>

      <h1
        className="
          mt-8
          text-6xl
          font-bold
          tracking-tight
          text-white
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
          text-slate-400
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
            className="
              h-14
              px-10
              text-lg
              bg-indigo-600
              hover:bg-indigo-500
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
