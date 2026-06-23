import Link from "next/link";
import {
  BookOpen,
  Rocket,
  Shield,
  Workflow,
  Users,
  Settings,
  ArrowRight,
} from "lucide-react";

export default function DocumentationPage() {
  const sections = [
    {
      icon: Rocket,
      title: "Getting Started",
      description:
        "Learn how to create your workspace, invite team members, and launch your first list.",
      href: "/documentation/getting-started",
    },
    {
      icon: Workflow,
      title: "lists & Tasks",
      description:
        "Manage lists, create tasks, track progress, and automate workflows.",
      href: "/documentation/lists",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Collaborate with teammates using comments, mentions, and shared workspaces.",
      href: "/documentation/team",
    },
    {
      icon: Shield,
      title: "Security",
      description:
        "Learn about authentication, permissions, access control, and data protection.",
      href: "/documentation/security",
    },
    {
      icon: Settings,
      title: "Integrations",
      description:
        "Connect Slack, Google Workspace, GitHub, and other productivity tools.",
      href: "/documentation/integrations",
    },
    {
      icon: BookOpen,
      title: "API Reference",
      description:
        "Comprehensive REST API documentation for developers and enterprise teams.",
      href: "/documentation/api",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl">
            <span className="rounded-full border px-4 py-2 text-sm font-medium">
              Documentation
            </span>

            <h1 className="mt-6 text-5xl font-bold tracking-tight">
              Everything you need to master TaskFlow
            </h1>

            <p className="mt-6 text-xl text-muted-foreground">
              Explore guides, tutorials, API references, integrations,
              workspace management, and enterprise deployment resources.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-3 text-muted-foreground">
                  {item.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-primary font-medium">
                  Read Docs
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-t bg-muted/30">
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold">
            Need additional help?
          </h2>

          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Our support team is available to help with onboarding,
            integrations, troubleshooting, and enterprise deployments.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-primary px-6 py-3 text-primary-foreground font-medium"
            >
              Contact Support
            </Link>

            <Link
              href="/faq"
              className="rounded-xl border px-6 py-3 font-medium"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}