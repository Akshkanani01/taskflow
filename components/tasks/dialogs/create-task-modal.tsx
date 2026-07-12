"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function CreateTaskModal({
  open,
  onClose,
  children,
}: Props) {
      useEffect(() => {

    function handleEscape(
      event: KeyboardEvent
    ) {

      if (event.key === "Escape") {

        onClose();

      }

    }

    if (open) {

      document.body.style.overflow =
        "hidden";

      window.addEventListener(
        "keydown",
        handleEscape
      );

    }

    return () => {

      document.body.style.overflow =
        "auto";

      window.removeEventListener(
        "keydown",
        handleEscape
      );

    };

  }, [open, onClose]);

  if (!open) {

    return null;

  }
    return (

    <>

      {/* BACKDROP */}

      <div

        onClick={onClose}

        className="
          fixed
          inset-0
          z-40
          bg-black/70
          backdrop-blur-md
          animate-in
          fade-in
        "

      />

      {/* MODAL */}

      <div
        className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          p-6
        "
      >
                <div

          onClick={(e) =>
            e.stopPropagation()
          }

          className="
            w-full
            max-w-4xl
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-[#111827]
            shadow-2xl
          "

        >

          {/* HEADER */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-white/10
              px-8
              py-6
            "
          >

            <h2 className="text-2xl font-bold text-white">

              Create Task

            </h2>

            <button

              onClick={onClose}

              className="
                rounded-xl
                p-2
                text-slate-400
                transition
                hover:bg-white/10
                hover:text-white
              "

            >

              ✕

            </button>

          </div>
                    <div
            className="
              max-h-[80vh]
              overflow-y-auto
              p-8
            "
          >

            {children}

          </div>

        </div>

      </div>

    </>

  );

}