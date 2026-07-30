"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type WorkspaceFormProps = {
  onSuccess?: () => void;
};

export default function WorkspaceForm({
  onSuccess,
}: WorkspaceFormProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function createWorkspace() {
    const workspaceName = name.trim();

    if (!workspaceName || loading) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/workspaces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: workspaceName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create workspace");
      }

      setName("");

      router.refresh();

      if (onSuccess) {
        onSuccess();
        return;
      }

      router.push("/dashboard/workspaces");
    } catch (error) {
      console.error(error);
      alert("Failed to create workspace");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        rounded-3xl
        border border-border
        bg-card
        p-8
      "
    >
      <div className="space-y-5">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Workspace Name"
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              void createWorkspace();
            }
          }}
          className="
            w-full
            rounded-xl
            border border-border
            bg-background
            px-4 py-3
            text-foreground
            outline-none
            disabled:opacity-60
          "
        />

        <button
          type="button"
          onClick={createWorkspace}
          disabled={loading || !name.trim()}
          className="
            rounded-xl
            bg-primary
            px-5
            py-3
            text-primary-foreground
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading ? "Creating..." : "Create Workspace"}
        </button>
      </div>
    </div>
  );
}