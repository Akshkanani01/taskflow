"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function CreateTaskModal({
  open,
  onClose,
  title = "Create Task",
  children,
}: Props) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="
          fixed
          inset-0
          z-40
          bg-background/70
          backdrop-blur-md
        "
      />

      {/* Modal */}

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
          onClick={(e) => e.stopPropagation()}
          className="
            w-full
            max-w-4xl
            overflow-hidden
            rounded-3xl
            border
            border-border
            bg-[#111827]
            shadow-2xl
          "
        >
          {/* Header */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-border
              px-8
              py-6
            "
          >
            <h2 className="text-2xl font-bold text-foreground">
              {title}
            </h2>

            <button
              onClick={onClose}
              className="
                rounded-xl
                p-2
                text-muted-foreground
                transition
                hover:bg-background/10
                hover:text-foreground
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