"use client";

import { Loader2, Plus } from "lucide-react";

type Props = {
  loading: boolean;
  onCancel: () => void;
};

export default function CreateTaskFooter({
  loading,
  onCancel,
}: Props) {
  return (
    <div className="sticky bottom-0 flex items-center justify-between border-t border-white/10 bg-[#0B1220]/95 px-8 py-5 backdrop-blur-xl">

      <button
        type="button"
        disabled={loading}
        onClick={onCancel}
        className="rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating...
          </>
        ) : (
          <>
            <Plus className="h-4 w-4" />
            Create Task
          </>
        )}
      </button>

    </div>
  );
}