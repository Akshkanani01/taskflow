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
     border-white/10
     bg-slate-900
   "
 > <div
     className="
       border-b
       border-white/10
       px-6
       py-5
     "
   > <h3 className="text-xl font-semibold text-white">
Team Members </h3>

    <p className="mt-1 text-sm text-slate-400">
      Workspace members and permissions
    </p>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr
          className="
            border-b
            border-white/10
            text-left
            text-xs
            uppercase
            tracking-wider
            text-slate-500
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
              border-white/5
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
                    text-white
                  "
                >
                  {member.user.name?.charAt(0) || "U"}
                </div>

                <div>
                  <p className="font-medium text-white">
                    {member.user.name}
                  </p>
                </div>
              </div>
            </td>

            <td className="px-6 py-5 text-slate-300">
              {member.user.email}
            </td>

            <td className="px-6 py-5">
              <RoleSelector
                role={member.role}
              />
            </td>

            <td className="px-6 py-5 text-slate-400">
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
