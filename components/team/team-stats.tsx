type Props = {
totalMembers: number;
totalInvites: number;
admins: number;
};

export default function TeamStats({
totalMembers,
totalInvites,
admins,
}: Props) {
const stats = [
{
title: "Total Members",
value: totalMembers,
color: "text-indigo-400",
},
{
title: "Pending Invites",
value: totalInvites,
color: "text-amber-400",
},
{
title: "Administrators",
value: admins,
color: "text-emerald-400",
},
];

return ( <div className="grid gap-6 lg:grid-cols-3">
{stats.map((stat) => ( <div
       key={stat.title}
       className="
         rounded-3xl
         border
         border-border
         bg-card
         p-6
       "
     > <p className="text-sm text-muted-foreground">
{stat.title} </p>

      <div
        className={`
          mt-4
          text-5xl
          font-bold
          ${stat.color}
        `}
      >
        {stat.value}
      </div>

      <div className="mt-4 h-2 rounded-full bg-background">
        <div
          className="
            h-2
            w-2/3
            rounded-full
            bg-indigo-600
          "
        />
      </div>
    </div>
  ))}
</div>


);
}
