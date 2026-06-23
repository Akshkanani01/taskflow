import {
FolderKanban,
CheckSquare,
UserPlus,
MessageSquare,
} from "lucide-react";

const activities = [
{
title: "New project created",
description: "Website Redesign",
icon: FolderKanban,
},
{
title: "Task completed",
description: "Landing page UI",
icon: CheckSquare,
},
{
title: "Member invited",
description: "[jeet55@gmail.com](mailto:jeet55@.com)",
icon: UserPlus,
},
{
title: "Comment added",
description: "Project discussion",
icon: MessageSquare,
},
];

export function ActivityFeed() {
return ( <div
   className="
     rounded-3xl
     border border-white/10
     bg-slate-900
     p-6
   "
 > <h3 className="text-xl font-semibold text-white">
Activity Feed </h3>


  <p className="mt-1 text-sm text-slate-400">
    Recent workspace updates
  </p>

  <div className="mt-6 space-y-5">

    {activities.map((activity, index) => {
      const Icon = activity.icon;

      return (
        <div
          key={index}
          className="flex gap-4"
        >

          <div
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              bg-indigo-600/20
            "
          >
            <Icon
              size={18}
              className="text-indigo-400"
            />
          </div>

          <div>

            <p className="font-medium text-white">
              {activity.title}
            </p>

            <p className="text-sm text-slate-400">
              {activity.description}
            </p>

          </div>

        </div>
      );
    })}

  </div>

</div>
);
}
