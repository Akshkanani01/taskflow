import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
return ( <header className="fixed top-6 left-0 right-0 z-50"> <div className="mx-auto max-w-7xl px-6">

    <div
      className="
        flex
        h-16
        items-center
        justify-between
        rounded-2xl
        border
        border-white/10
        bg-slate-900/80
        px-8
        backdrop-blur-xl
        shadow-2xl
      "
    >
      <Link
        href="/"
        className="text-3xl font-bold tracking-tight text-white"
      >
        ⚡ TaskFlow
      </Link>

      <nav className="hidden md:flex items-center gap-8">

        <a
          href="#features"
          className="text-slate-300 transition hover:text-white"
        >
          Features
        </a>

        <a
          href="#how-it-works"
          className="text-slate-300 transition hover:text-white"
        >
          How It Works
        </a>

        <a
          href="#faq"
          className="text-slate-300 transition hover:text-white"
        >
          FAQ
        </a>

        <a
          href="#contact"
          className="text-slate-300 transition hover:text-white"
        >
          Contact
        </a>

      </nav>

      <Link href="/login">
        <Button
          className="
            bg-indigo-600
            hover:bg-indigo-500
            px-6
          "
        >
          Launch Workspace →
        </Button>
      </Link>

    </div>

  </div>
</header>
);
}
