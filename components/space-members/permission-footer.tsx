"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  loading?: boolean;
  onCancel: () => void;
  onSave: () => void;
}

export default function PermissionFooter({
  loading = false,
  onCancel,
  onSave,
}: Props) {
  return (
    <div
      className="
        sticky
        bottom-0
        flex
        items-center
        justify-end
        gap-3
        border-t
        border-zinc-800
        bg-[#111827]/95
        px-6
        py-5
        backdrop-blur-xl
      "
    >
      <Button
        variant="outline"
        disabled={loading}
        onClick={onCancel}
        className="
          border-zinc-700
          bg-transparent
          hover:bg-zinc-800
        "
      >
        Cancel
      </Button>

      <Button
        disabled={loading}
        onClick={onSave}
        className="
          min-w-[150px]
          bg-blue-600
          hover:bg-blue-500
        "
      >
        {loading ? (
          <>
            <Loader2
              className="mr-2 h-4 w-4 animate-spin"
            />
            Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </div>
  );
}