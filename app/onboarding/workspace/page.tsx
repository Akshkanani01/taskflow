import { createWorkspace } from "../actions";

export default function WorkspacePage() {
return ( <main className="flex min-h-screen items-center justify-center bg-background px-6">

  <form
    action={createWorkspace}
    className="
      w-full
      max-w-xl
      rounded-3xl
      border
      border-border
      bg-card
      p-8
    "
  >

    <h1 className="mb-8 text-4xl font-bold text-foreground">
      Create Workspace
    </h1>

    <div className="space-y-5">

      <input
        name="name"
        placeholder="Workspace Name"
        className="h-12 w-full rounded-xl bg-background px-4 text-foreground"
      />

    

      <button
        className="
          h-12
          w-full
          rounded-xl
          bg-indigo-600
          text-foreground
        "
      >
        Continue
      </button>

    </div>

  </form>

</main>

);
}
