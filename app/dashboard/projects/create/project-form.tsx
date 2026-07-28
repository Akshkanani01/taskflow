"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ProjectFormProps = {
  spaceId: string;
  onSuccess?: () => void;
};

export default function ProjectForm({
  spaceId,
  onSuccess,
}: ProjectFormProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function createList() {
    if (!name.trim()) {
      toast.error("List name is required", {
        description:
          "Please enter a name before creating the list.",
      });

      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          spaceId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();

        throw new Error(
          error.error ?? "Failed to create list"
        );
      }

      toast.success("List created", {
        description:
          "Your new list has been created successfully.",
      });

      if (onSuccess) {
        setName("");
        setDescription("");
        onSuccess();
        return;
      }

      router.push(`/dashboard/spaces/${spaceId}`);
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error("Failed to create list", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          List Name
        </label>

        <input
          autoFocus
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Enter your list name here"
          className="
            w-full
            rounded-xl
            border
            border-border
            bg-background
            px-4
            py-3
            text-foreground
            outline-none
            transition
            focus:border-indigo-500
          "
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Description
        </label>

        <textarea
          rows={4}
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          placeholder="Optional description..."
          className="
            w-full
            rounded-xl
            border
            border-border
            bg-background
            px-4
            py-3
            text-foreground
            outline-none
            transition
            focus:border-indigo-500
          "
        />
      </div>

      <button
        type="button"
        disabled={
          loading ||
          !name.trim()
        }
        onClick={createList}
        className="
          w-full
          rounded-xl
          bg-indigo-600
          py-3
          font-medium
          text-foreground
          transition
          hover:bg-indigo-500
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {loading
          ? "Creating..."
          : "Create List"}
      </button>
    </div>
  );
}