import { Fragment } from "react";

const permissions = [
  {
    category: "Workspace",
    items: [
      ["Delete Workspace", true, false, false, false, false],
      ["Transfer Ownership", true, false, false, false, false],
      ["Manage Billing", true, false, false, false, false],
      ["Manage Workspace Settings", true, true, false, false, false],
      ["Manage Roles & Permissions", true, true, false, false, false],
      ["Invite Members", true, true, true, false, false],
      ["Remove Members", true, true, true, false, false],
    ],
  },
  {
    category: "Spaces",
    items: [
      ["Create Space", true, true, true, false, false],
      ["Edit Space", true, true, true, false, false],
      ["Delete Space", true, true, true, false, false],
      ["View Space", true, true, true, true, true],
    ],
  },
  {
    category: "Lists",
    items: [
      ["Create List", true, true, true, false, false],
      ["Edit List", true, true, true, false, false],
      ["Delete List", true, true, true, false, false],
      ["View List", true, true, true, true, true],
    ],
  },
  {
    category: "Tasks",
    items: [
      ["Create Task", true, true, true, false, false],
      ["Assign Task", true, true, true, false, false],
      ["Edit Task Title", true, true, true, false, false],
      ["Edit Task Description", true, true, true, false, false],
      ["Change Priority", true, true, true, false, false],
      ["Change Due Date", true, true, true, false, false],
      ["Delete Task", true, true, true, false, false],
      ["Archive Task", true, true, true, false, false],
      ["Change Status", true, true, true, true, false],
      ["Add Comments", true, true, true, true, false],
      ["Upload Attachments", true, true, true, true, false],
      ["Create Subtasks", true, true, true, true, false],
      ["Log Time", true, true, true, true, false],
    ],
  },
  {
    category: "Reports",
    items: [
      ["View Analytics", true, true, true, false, false],
      ["Export Reports", true, true, true, false, false],
    ],
  },
];

export default function PermissionMatrix() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl">
      <div className="border-b border-white/10 px-8 py-6">

        
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02]">
              <th className="px-6 py-5 text-left text-sm font-semibold text-slate-400">
                Permission
              </th>

              <th className="px-6 py-5 text-center text-sm font-semibold text-amber-400">
                Owner
              </th>

              <th className="px-6 py-5 text-center text-sm font-semibold text-red-400">
                Admin
              </th>

              <th className="px-6 py-5 text-center text-sm font-semibold text-blue-400">
                Manager
              </th>

              <th className="px-6 py-5 text-center text-sm font-semibold text-green-400">
                Member
              </th>

              <th className="px-6 py-5 text-center text-sm font-semibold text-slate-400">
                Viewer
              </th>
            </tr>
          </thead>

          <tbody>
            {permissions.map((section) => (
              <Fragment key={section.category}>
                <tr>
                  <td
                    colSpan={6}
                    className="bg-violet-500/10 px-6 py-3 text-sm font-bold uppercase tracking-wider text-violet-300"
                  >
                    {section.category}
                  </td>
                </tr>

                {section.items.map((item) => (
                  <tr
                    key={`${section.category}-${item[0]}`}
                    className="border-b border-white/5 transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="px-6 py-4 text-white">
                      {item[0]}
                    </td>

                    {item.slice(1).map((allowed, index) => (
                      <td
                        key={`${section.category}-${item[0]}-${index}`}
                        className="px-6 py-4 text-center"
                      >
                        {allowed ? (
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                            ✓
                          </span>
                        ) : (
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-600">
                            —
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}