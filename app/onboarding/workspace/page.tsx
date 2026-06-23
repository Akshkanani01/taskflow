import { createWorkspace } from "../actions";

export default function WorkspacePage() {
return ( <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">

  <form
    action={createWorkspace}
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
      Create Workspace
    </h1>

    <div className="space-y-5">

      <input
        name="name"
        placeholder="Workspace Name"
        className="h-12 w-full rounded-xl bg-slate-800 px-4 text-white"
      />

    

      <button
        className="
          h-12
          w-full
          rounded-xl
          bg-indigo-600
          text-white
        "
      >
        Continue
      </button>

    </div>

  </form>

</main>

);
}
