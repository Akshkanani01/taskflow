import RoleSelector from "./role-selector";
import MemberActions from "./member-actions";

type Member = {
  id: string;
  role: string;
  joinedAt: Date;

  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
};

export default function MembersTable({
  members,
}: {
  members: Member[];
}) {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-border
        bg-card
      "
    >
      {/* Header */}

      <div
        className="
          border-b
          border-border
          px-6
          py-5
        "
      >
        <h3 className="text-xl font-semibold text-foreground">
          Team Members
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Workspace members and permissions
        </p>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              className="
                border-b
                border-border
                text-left
                text-xs
                uppercase
                tracking-wider
                text-muted-foreground
              "
            >
              <th className="px-6 py-4">
                Member
              </th>

              <th className="px-6 py-4">
                Email
              </th>

              <th className="px-6 py-4">
                Role
              </th>

              <th className="px-6 py-4">
                Joined
              </th>

              <th className="px-6 py-4"></th>
            </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <tr
                key={member.id}
                className="
                  border-b
                  border-border
                  transition
                  hover:bg-muted/40
                "
              >
                {/* Member */}

                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    {member.user.image ? (
                      <img
                        src={member.user.image}
                        alt={member.user.name ?? "User"}
                        className="h-12 w-12 rounded-full border border-border object-cover"
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-full
                          bg-primary
                          text-lg
                          font-semibold
                          text-primary-foreground
                        "
                      >
                        {member.user.name
                          ?.charAt(0)
                          .toUpperCase() ?? "U"}
                      </div>
                    )}

                    <div>
                      <p className="font-medium text-foreground">
                        {member.user.name ?? "Unknown User"}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Email */}

                <td className="px-6 py-5 text-foreground">
                  {member.user.email}
                </td>

                {/* Role */}

                <td className="px-6 py-5">
                  <RoleSelector
                    role={member.role}
                  />
                </td>

                {/* Joined */}

                <td className="px-6 py-5 text-muted-foreground">
                  {new Date(
                    member.joinedAt
                  ).toLocaleDateString("en-GB")}
                </td>

                {/* Actions */}

                <td className="px-6 py-5">
                  <div className="flex justify-end">
                    <MemberActions />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}