export function TrustedBy() {
  const stats = [
    {
      value: "10K+",
      label: "Active Users",
    },
    {
      value: "500+",
      label: "Growing Teams",
    },
    {
      value: "50K+",
      label: "Tasks Completed",
    },
    {
      value: "99.9%",
      label: "Platform Uptime",
    },
    {
      value: "Free",
      label: "Forever Plan",
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Trusted By Modern Teams
          </p>

          <h2 className="mt-4 text-4xl font-bold text-foreground">
            Built For Productivity
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="
                rounded-3xl
                border
                border-border
                bg-card
                p-8
                text-center
                transition-colors
              "
            >
              <h3
                className="text-4xl font-bold"
                style={{ color: "var(--primary)" }}
              >
                {stat.value}
              </h3>

              <p className="mt-3 text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}