import { createSpace } from "../actions";

export default async function SpacePage({
searchParams,
}: {
searchParams: Promise<{
workspaceId: string;
}>;
}) {
const { workspaceId } =
await searchParams;

return ( <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">

  <form
    action={createSpace}
    className="
      w-full
      max-w-xl
      rounded-3xl
      border
      border-white/10
      bg-slate-900
      p-8
    "
  >

    <h1 className="mb-8 text-4xl font-bold text-white">
      Create Space
    </h1>

    <input
      type="hidden"
      name="workspaceId"
      value={workspaceId}
    />

    <div className="space-y-5">

      <input
        name="name"
        placeholder="Development"
        className="h-12 w-full rounded-xl bg-slate-800 px-4 text-white"
      />

      <select
        name="color"
        className="h-12 w-full rounded-xl bg-slate-800 px-4 text-white"
      >
        <option value="blue">Blue</option>
        <option value="purple">
          Purple
        </option>
        <option value="green">
          Green
        </option>
      </select>

      <button
        className="
          h-12
          w-full
          rounded-xl
          bg-indigo-600
          text-white
        "
      >
        Launch Dashboard
      </button>

    </div>

  </form>

</main>

);
}
