import PermissionMatrix
from "@/components/team/permission-matrix";

export default function PermissionsPage() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Permissions
        </h1>

        <p className="mt-2 text-slate-400">
          Role permission matrix
        </p>
      </div>

      <PermissionMatrix />

    </div>
  );
}