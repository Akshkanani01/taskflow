const deadlines = [
{
title: "Website Launch",
date: "Jun 20",
},
{
title: "Client Review",
date: "Jun 22",
},
{
title: "Mobile App Release",
date: "Jun 28",
},
];

export function UpcomingDeadlines() {
return ( <div
   className="
     rounded-3xl
     border border-white/10
     bg-slate-900
     p-6
   "
 > <h3 className="text-xl font-semibold text-white">
Upcoming Deadlines </h3>

  <div className="mt-6 space-y-4">

    {deadlines.map((item) => (
      <div
        key={item.title}
        className="
          flex items-center
          justify-between
          rounded-xl
          bg-slate-800
          p-4
        "
      >

        <span className="text-white">
          {item.title}
        </span>

        <span className="text-red-400">
          {item.date}
        </span>

      </div>
    ))}

  </div>

</div>


);
}
