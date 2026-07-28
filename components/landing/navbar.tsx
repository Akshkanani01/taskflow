import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-6 z-50">
      <div className="mx-auto max-w-7xl px-6">
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
            shadow-2xl
            backdrop-blur-xl
          "
        >
          <Link
            href="/"
            className="text-3xl font-bold tracking-tight text-foreground"
          >
            ⚡ TaskFlow
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-foreground transition-colors hover:text-primary"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-foreground transition-colors hover:text-primary"
            >
              How It Works
            </a>

            <a
              href="#faq"
              className="text-foreground transition-colors hover:text-primary"
            >
              FAQ
            </a>

            <a
              href="#contact"
              className="text-foreground transition-colors hover:text-primary"
            >
              Contact
            </a>
          </nav>

          <Link href="/login">
            <Button className="px-6">
              Launch Workspace →
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}