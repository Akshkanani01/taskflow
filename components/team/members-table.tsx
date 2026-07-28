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
return ( <div
   className="
     overflow-hidden
     rounded-3xl
     border
     border-border
     bg-card
   "
 > <div
     className="
       border-b
       border-border
       px-6
       py-5
     "
   > <h3 className="text-xl font-semibold text-foreground">
Team Members </h3>

    <p className="mt-1 text-sm text-muted-foreground">
      Workspace members and permissions
    </p>
  </div>

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

          <th className="px-6 py-4">
          </th>
        </tr>
      </thead>

      <tbody>
        {members.map((member) => (
          <tr
            key={member.id}
            className="
              border-b
              border-border
            "
          >
            <td className="px-6 py-5">
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex h-12 w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-indigo-600
                    text-lg
                    font-semibold
                    text-foreground
                  "
                >
                  {member.user.name?.charAt(0) || "U"}
                </div>

                <div>
                  <p className="font-medium text-foreground">
                    {member.user.name}
                  </p>
                </div>
              </div>
            </td>

            <td className="px-6 py-5 text-foreground">
              {member.user.email}
            </td>

            <td className="px-6 py-5">
              <RoleSelector
                role={member.role}
              />
            </td>

            <td className="px-6 py-5 text-muted-foreground">
              {new Date(
                member.joinedAt
              ).toLocaleDateString()}
            </td>

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
