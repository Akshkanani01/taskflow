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
        border-border
        bg-card/80
        px-8
        backdrop-blur-xl
        shadow-2xl
      "
    >
      <Link
        href="/"
        className="text-3xl font-bold tracking-tight text-foreground"
      >
        ⚡ TaskFlow
      </Link>

      <nav className="hidden md:flex items-center gap-8">

        <a
          href="#features"
          className="text-foreground transition hover:text-foreground"
        >
          Features
        </a>

        <a
          href="#how-it-works"
          className="text-foreground transition hover:text-foreground"
        >
          How It Works
        </a>

        <a
          href="#faq"
          className="text-foreground transition hover:text-foreground"
        >
          FAQ
        </a>

        <a
          href="#contact"
          className="text-foreground transition hover:text-foreground"
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
