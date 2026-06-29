const members = [
{
name: "Aksh",
completed: 42,
},
{
name: "John",
completed: 38,
},
{
name: "Sarah",
completed: 31,
},
{
name: "David",
completed: 27,
},
];

export function TeamPerformance() {
return ( <div
   className="
     rounded-3xl
     border border-white/10
     bg-slate-900
     p-6
   "
 > <h3 className="text-xl font-semibold text-white">
Team Performance </h3>

  <p className="mt-1 text-sm text-slate-400">
    Tasks completed this month
  </p>

  <div className="mt-6 space-y-5">

    {(members ?? []).map((member) => (
      <div key={member.name}>

        <div className="mb-2 flex justify-between">

          <span className="text-white">
            {member.name}
          </span>

          <span className="text-slate-400">
            {member.completed}
          </span>

        </div>

        <div
          className="
            h-3
            overflow-hidden
            rounded-full
            bg-slate-800
          "
        >

          <div
            className="
              h-full
              rounded-full
              bg-indigo-500
            "
            style={{
              width: `${member.completed * 2}%`,
            }}
          />

        </div>

      </div>
    ))}

  </div>

</div>

);
}
