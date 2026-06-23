import {
Sparkles,
Send,
Clock3,
Plus,
} from "lucide-react";

const prompts = [
"Create sprint plan for next week",
"Summarize project progress",
"Generate project roadmap",
"Create meeting notes",
];

export default function AIPage() {
return ( <div className="h-[calc(100vh-140px)]">

```
  <div className="grid h-full gap-6 xl:grid-cols-[320px_1fr]">

    <div
      className="
        flex flex-col
        rounded-3xl
        border border-white/10
        bg-slate-900
        p-5
      "
    >

      <button
        className="
          flex items-center justify-center gap-2
          rounded-xl
          bg-indigo-600
          py-3
          text-white
        "
      >
        <Plus size={18} />
        New Chat
      </button>

      <div className="mt-8">

        <h3 className="mb-4 text-sm font-semibold text-slate-400">
          RECENT PROMPTS
        </h3>

        <div className="space-y-2">

          {prompts.map((prompt) => (
            <button
              key={prompt}
              className="
                w-full rounded-xl
                border border-white/10
                bg-slate-950
                p-3 text-left
                text-sm text-slate-300
                hover:border-indigo-500/30
              "
            >
              {prompt}
            </button>
          ))}

        </div>

      </div>

      <div className="mt-auto">

        <div
          className="
            rounded-2xl
            border border-indigo-500/20
            bg-indigo-500/10
            p-4
          "
        >

          <Sparkles
            className="mb-3 text-indigo-400"
            size={22}
          />

          <h4 className="font-semibold text-white">
            AI Pro
          </h4>

          <p className="mt-2 text-sm text-slate-300">
            Generate tasks, reports and project plans.
          </p>

        </div>

      </div>

    </div>

    <div
      className="
        flex h-full flex-col
        rounded-3xl
        border border-white/10
        bg-slate-900
      "
    >

      <div
        className="
          flex items-center gap-3
          border-b border-white/10
          p-5
        "
      >

        <Sparkles
          className="text-indigo-400"
          size={24}
        />

        <div>

          <h2 className="font-semibold text-white">
            TaskFlow AI
          </h2>

          <p className="text-sm text-slate-400">
            Workspace Assistant
          </p>

        </div>

      </div>

      <div className="flex-1 overflow-auto p-6">

        <div className="space-y-6">

          <div className="flex">

            <div
              className="
                max-w-2xl
                rounded-3xl
                bg-slate-950
                p-5
              "
            >

              <p className="text-white">
                Create a sprint plan for next week.
              </p>

            </div>

          </div>

          <div className="flex justify-end">

            <div
              className="
                max-w-2xl
                rounded-3xl
                bg-indigo-600
                p-5
                text-white
              "
            >

              <p>
                Generated sprint plan with
                12 tasks, priorities and
                estimated completion dates.
              </p>

            </div>

          </div>

        </div>

      </div>

      <div
        className="
          border-t border-white/10
          p-5
        "
      >

        <div
          className="
            flex items-center gap-3
            rounded-2xl
            border border-white/10
            bg-slate-950
            p-3
          "
        >

          <input
            placeholder="Ask TaskFlow AI..."
            className="
              flex-1
              bg-transparent
              text-white
              outline-none
            "
          />

          <button
            className="
              rounded-xl
              bg-indigo-600
              p-3
              text-white
            "
          >
            <Send size={18} />
          </button>

        </div>

        <div className="mt-3 flex items-center gap-2">

          <Clock3
            size={14}
            className="text-slate-500"
          />

          <span className="text-xs text-slate-500">
            AI responses are generated
            from workspace data.
          </span>

        </div>

      </div>

    </div>

  </div>

</div>

);
}
