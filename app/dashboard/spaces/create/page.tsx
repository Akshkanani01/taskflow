import { prisma } from "@/lib/prisma";
import SpaceForm from "./space-form";

export default async function CreateSpacePage() {
const workspaces =
await prisma.workspace.findMany({
orderBy: {
createdAt: "desc",
},
});

return ( <div className="max-w-2xl"> <h1 className="mb-6 text-4xl font-bold text-white">
Create Space </h1>

  <div
    className="
      rounded-3xl
      border border-white/10
      bg-slate-900
      p-8
    "
  >
    <SpaceForm
      workspaces={
        workspaces
      }
    />
  </div>
</div>

);
}
