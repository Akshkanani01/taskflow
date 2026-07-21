"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AcceptInviteButtonProps {
  token: string;
}

export function AcceptInviteButton({
  token,
}: AcceptInviteButtonProps) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleAccept() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        "/api/team/accept",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            token,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ??
            "Unable to accept invitation."
        );
      }

      if (data.workspaceId) {
        await fetch(
          "/api/workspace/select",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              workspaceId:
                data.workspaceId,
            }),
          }
        );
      }

      router.replace("/dashboard");

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "Something went wrong."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8">
      {error && (
        <div
          className="
            mb-4
            rounded-xl
            border
            border-red-500/30
            bg-red-500/10
            p-4
            text-sm
            text-red-300
          "
        >
          {error}
        </div>
      )}

      <button
        onClick={handleAccept}
        disabled={loading}
        className="
          w-full
          rounded-xl
          bg-indigo-600
          px-5
          py-3
          font-semibold
          text-white
          transition
          hover:bg-indigo-500
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {loading
          ? "Joining Workspace..."
          : "Accept Invitation"}
      </button>
    </div>
  );
}