export function ListChart() {
return ( <div
   className="
     rounded-3xl
     border border-white/10
     bg-slate-900
     p-6
   "
 > <div className="flex items-center justify-between">


    <div>

      <h3 className="text-xl font-semibold text-white">
        Project Progress
      </h3>

      <p className="mt-1 text-sm text-slate-400">
        Monthly performance overview
      </p>

    </div>

    <button
      className="
        rounded-xl
        border border-white/10
        px-4 py-2
        text-sm text-slate-300
      "
    >
      Last 30 Days
    </button>

  </div>

  <div className="mt-8">

    <div className="flex h-64 items-end gap-4">

      <div className="flex flex-1 flex-col items-center">
        <div className="h-24 w-full rounded-t-xl bg-indigo-500" />
        <span className="mt-2 text-xs text-slate-500">
          Jan
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center">
        <div className="h-36 w-full rounded-t-xl bg-indigo-500" />
        <span className="mt-2 text-xs text-slate-500">
          Feb
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center">
        <div className="h-28 w-full rounded-t-xl bg-indigo-500" />
        <span className="mt-2 text-xs text-slate-500">
          Mar
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center">
        <div className="h-44 w-full rounded-t-xl bg-indigo-500" />
        <span className="mt-2 text-xs text-slate-500">
          Apr
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center">
        <div className="h-52 w-full rounded-t-xl bg-indigo-500" />
        <span className="mt-2 text-xs text-slate-500">
          May
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center">
        <div className="h-60 w-full rounded-t-xl bg-indigo-500" />
        <span className="mt-2 text-xs text-slate-500">
          Jun
        </span>
      </div>

    </div>

  </div>

</div>
);
}
