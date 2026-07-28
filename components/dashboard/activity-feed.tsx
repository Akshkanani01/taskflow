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
  return (
    <div
      className="
        rounded-3xl
        border border-border
        bg-card
        p-6
      "
    >
      <h3 className="text-xl font-semibold text-foreground">
        Activity Feed
      </h3>

      <p className="mt-1 text-sm text-muted-foreground">
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
                <p className="font-medium text-foreground">
                  {activity.title}
                </p>

                <p className="text-sm text-muted-foreground">
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