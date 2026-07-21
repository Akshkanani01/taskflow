"use client";

import { useMemo, useState } from "react";
import {
  Loader2,
  Mail,
  UserPlus,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  open: boolean;
  onOpenChange: (
    open: boolean
  ) => void;

  onInvite?: (data: {
    email: string;
    role: string;
    message: string;
  }) => Promise<void>;
}

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function InviteDialog({
  open,
  onOpenChange,
  onInvite,
}: Props) {
  const [email, setEmail] =
    useState("");

  const [role, setRole] =
    useState("MEMBER");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const emailValid =
    useMemo(() => {
      return EMAIL_REGEX.test(
        email.trim()
      );
    }, [email]);

  const canSubmit =
    emailValid && !loading;

  async function handleInvite() {
    if (!canSubmit) {
      return;
    }

    try {
      setLoading(true);

      await onInvite?.({
        email: email
          .trim()
          .toLowerCase(),
        role,
        message,
      });

      setEmail("");
      setRole("MEMBER");
      setMessage("");

      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!loading) {
          onOpenChange(value);
        }
      }}
    >
      <DialogContent className="max-w-lg rounded-2xl border border-zinc-800 bg-[#111827] p-0 text-white">
        <DialogHeader className="border-b border-zinc-800 p-6">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <UserPlus className="h-5 w-5 text-blue-400" />

            Invite Member
          </DialogTitle>

          <DialogDescription className="text-zinc-400">
            Send a secure invitation email to
            join your workspace.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 p-6">
          <div className="space-y-2">
            <Label>
              Email Address
            </Label>

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />

              <Input
                type="email"
                autoComplete="email"
                value={email}
                disabled={loading}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="john@example.com"
                className="h-11 border-zinc-700 bg-[#0F172A] pl-10"
              />
            </div>

            {!emailValid &&
              email.length >
                0 && (
                <p className="text-xs text-red-400">
                  Please enter a
                  valid email
                  address.
                </p>
              )}
          </div>

          <div className="space-y-2">
            <Label>
              Workspace Role
            </Label>

            <select
              disabled={loading}
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value
                )
              }
              className="h-11 w-full rounded-lg border border-zinc-700 bg-[#0F172A] px-3 text-white outline-none"
            >
              <option value="OWNER">
                Owner
              </option>

              <option value="MANAGER">
                Manager
              </option>

              <option value="MEMBER">
                Member
              </option>

              <option value="VIEWER">
                Viewer
              </option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>
              Personal Message
            </Label>

            <textarea
              rows={4}
              disabled={loading}
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              placeholder="Welcome to our workspace..."
              className="w-full rounded-lg border border-zinc-700 bg-[#0F172A] p-3 text-sm text-white outline-none"
            />

            <p className="text-xs text-zinc-500">
              This message is optional
              and can be included in the
              invitation email.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-zinc-800 p-6">
          <Button
            variant="outline"
            disabled={loading}
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            disabled={!canSubmit}
            onClick={
              handleInvite
            }
            className="min-w-[170px] bg-blue-600 hover:bg-blue-500"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                Sending...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />

                Send Invitation
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}