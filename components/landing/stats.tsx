export function Stats() {
const stats = [
{ value: "10K+", label: "Active Users" },
{ value: "500+", label: "Teams" },
{ value: "50K+", label: "Tasks Completed" },
{ value: "99.9%", label: "Uptime" },
];

return ( <section className="py-24"> <div className="container mx-auto px-6">

    <div className="grid gap-8 md:grid-cols-4">

      {stats.map((stat) => (
        <div
          key={stat.label}
          className="
            rounded-3xl
            border
            border-white/10
            bg-slate-900
            p-8
            text-center
          "
        >
          <h3 className="text-5xl font-bold text-indigo-400">
            {stat.value}
          </h3>

          <p className="mt-3 text-slate-400">
            {stat.label}
          </p>
        </div>
      ))}

    </div>

  </div>
</section>

);
}
