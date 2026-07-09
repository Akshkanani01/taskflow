"use client";

import { ReactNode, useEffect } from "react";

import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function CreateTaskModal({
  open,
  onClose,
  children,
}: Props) {
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    function esc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", esc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener(
        "keydown",
        esc
      );
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="
      fixed
      inset-0
      z-[999]
      flex
      items-center
      justify-center
      bg-black/70
      backdrop-blur-xl
      p-8
      "
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="
        flex
        h-[92vh]
        w-full
        max-w-7xl
        overflow-hidden
        rounded-[34px]
        border
        border-white/10
        bg-[#0B1220]
        shadow-[0_30px_120px_rgba(0,0,0,.65)]
        "
      >
        {/* LEFT */}

        <div className="flex flex-1 flex-col">

          <div className="flex items-center justify-between border-b border-white/10 px-10 py-7">

            <div>

              <h2 className="text-3xl font-bold text-white">
                Create Task
              </h2>

              <p className="mt-2 text-slate-400">
                Create a new task for your
                workspace.
              </p>

            </div>

            <button
              onClick={onClose}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                transition
                hover:bg-slate-800
              "
            >
              <X className="text-slate-400" />
            </button>

          </div>

          <div className="flex-1 overflow-y-auto px-10 py-8">

            {children}

          </div>

        </div>

        {/* RIGHT */}

        <aside
          className="
          w-[360px]
          border-l
          border-white/10
          bg-[#0F172A]
          p-8
          "
        >
          <h3 className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Task Settings
          </h3>

          <div className="space-y-6">

            <div>

              <label className="mb-2 block text-xs uppercase tracking-wider text-slate-500">
                Status
              </label>

              <div className="h-11 rounded-xl border border-white/10 bg-slate-900" />

            </div>

            <div>

              <label className="mb-2 block text-xs uppercase tracking-wider text-slate-500">
                Priority
              </label>

              <div className="h-11 rounded-xl border border-white/10 bg-slate-900" />

            </div>

            <div>

              <label className="mb-2 block text-xs uppercase tracking-wider text-slate-500">
                Assignees
              </label>

              <div className="h-11 rounded-xl border border-white/10 bg-slate-900" />

            </div>

            <div>

              <label className="mb-2 block text-xs uppercase tracking-wider text-slate-500">
                Due Date
              </label>

              <div className="h-11 rounded-xl border border-white/10 bg-slate-900" />

            </div>

            <div>

              <label className="mb-2 block text-xs uppercase tracking-wider text-slate-500">
                Estimate
              </label>

              <div className="h-11 rounded-xl border border-white/10 bg-slate-900" />

            </div>

          </div>

        </aside>

      </div>

    </div>
  );
}