import Link from "next/link";

export function Footer() {
return ( <footer
   id="contact"
   className="border-t border-border py-20"
 > <div className="container mx-auto px-6">

    <div className="grid gap-12 md:grid-cols-4">

      <div>
        <h3 className="text-3xl font-bold text-foreground">
          ⚡ TaskFlow
        </h3>

        <p className="mt-4 text-muted-foreground">
          Modern project management platform built for
          teams, startups and businesses.
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-foreground">
          Product
        </h4>

        <ul className="mt-4 space-y-3 text-muted-foreground">

          <li>
            <a href="#features">Features</a>
          </li>

          <li>
            <a href="#how-it-works">How It Works</a>
          </li>

          <li>
            <a href="#faq">FAQ</a>
          </li>

          <li>
            <Link href="/docs">
              Documentation
            </Link>
          </li>

        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-foreground">
          Support
        </h4>

        <ul className="mt-4 space-y-3 text-muted-foreground">

          <li>
            <Link href="/support">
              Support Center
            </Link>
          </li>

          <li>
            <Link href="/help">
              Help Center
            </Link>
          </li>

          <li>
            <Link href="/guides">
              Guides
            </Link>
          </li>

          <li>
            <Link href="/feedback">
              Feedback
            </Link>
          </li>

          <li>
            <Link href="/contact">
              Contact Us
            </Link>
          </li>

        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-foreground">
          Company
        </h4>

        <ul className="mt-4 space-y-3 text-muted-foreground">

          <li>
            <Link href="/about">
              About
            </Link>
          </li>

          <li>
            <Link href="/privacy">
              Privacy Policy
            </Link>
          </li>

          <li>
            <Link href="/terms">
              Terms Of Service
            </Link>
          </li>

        </ul>
      </div>

    </div>

    <div className="mt-16 border-t border-border pt-8">

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

        <p className="text-muted-foreground">
          © 2026 TaskFlow. All rights reserved.
        </p>

        <p className="text-muted-foreground">
          Built with ❤️ for productive teams.
        </p>

      </div>

    </div>

  </div>
</footer>


);
}
