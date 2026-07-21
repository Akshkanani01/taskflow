const testimonials = [
{
name: "Sarah Johnson",
role: "Product Manager",
company: "TechNova",
review:
"TaskFlow completely transformed how our team manages lists. Clean, fast and incredibly intuitive.",
},
{
name: "Michael Chen",
role: "Founder",
company: "StartupHub",
review:
"We've tried multiple project management tools. TaskFlow is by far the easiest to use.",
},
{
name: "David Smith",
role: "Operations Lead",
company: "GrowthWorks",
review:
"The dashboard and reporting features help us stay organized and deliver faster.",
},
];

export function Testimonials() {
return ( <section className="py-32"> <div className="container mx-auto px-6">

    <div className="mb-20 text-center">

      <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">
        Testimonials
      </p>

      <h2 className="mt-4 text-5xl font-bold text-white">
        Loved By Teams Worldwide
      </h2>

      <p className="mt-6 text-lg text-slate-400">
        See what our users say about TaskFlow.
      </p>

    </div>

    <div className="grid gap-8 lg:grid-cols-3">

      {testimonials.map((item) => (
        <div
          key={item.name}
          className="
            rounded-3xl
            border
            border-white/10
            bg-slate-900
            p-8
          "
        >
          <div className="mb-6 flex text-yellow-400">
            ★★★★★
          </div>

          <p className="text-slate-300">
  &quot;{item.review}&quot;
</p>

          <div className="mt-8">
            <h4 className="font-semibold text-white">
              {item.name}
            </h4>

            <p className="text-sm text-slate-500">
              {item.role} • {item.company}
            </p>
          </div>
        </div>
      ))}

    </div>

  </div>
</section>


);
}
