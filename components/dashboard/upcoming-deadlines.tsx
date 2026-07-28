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
     border border-border
     bg-card
     p-6
   "
 > <h3 className="text-xl font-semibold text-foreground">
Upcoming Deadlines </h3>

  <div className="mt-6 space-y-4">

    {deadlines.map((item) => (
      <div
        key={item.title}
        className="
          flex items-center
          justify-between
          rounded-xl
          bg-background
          p-4
        "
      >

        <span className="text-foreground">
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
