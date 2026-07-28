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
      <DialogContent className="max-w-lg rounded-2xl border border-border bg-card p-0 text-foreground">
        <DialogHeader className="border-b border-border p-6">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <UserPlus className="h-5 w-5 text-primary" />
            Invite Member
          </DialogTitle>

          <DialogDescription className="text-muted-foreground">
            Send a secure invitation email to join your workspace.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 p-6">
          <div className="space-y-2">
            <Label>Email Address</Label>

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

              <Input
                type="email"
                autoComplete="email"
                value={email}
                disabled={loading}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="john@example.com"
                className="h-11 border-border bg-background pl-10"
              />
            </div>

            {!emailValid &&
              email.length > 0 && (
                <p className="text-xs text-destructive">
                  Please enter a valid email address.
                </p>
              )}
          </div>

          <div className="space-y-2">
            <Label>Workspace Role</Label>

            <select
              disabled={loading}
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              className="
                h-11
                w-full
                rounded-lg
                border
                border-border
                bg-background
                px-3
                text-foreground
                outline-none
                focus:border-primary
              "
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
            <Label>Personal Message</Label>

            <textarea
              rows={4}
              disabled={loading}
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              placeholder="Welcome to our workspace..."
              className="
                w-full
                rounded-lg
                border
                border-border
                bg-background
                p-3
                text-sm
                text-foreground
                outline-none
                focus:border-primary
              "
            />

            <p className="text-xs text-muted-foreground">
              This message is optional and can be included in the invitation email.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-border p-6">
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
            onClick={handleInvite}
            className="
              min-w-[170px]
              bg-primary
              text-primary-foreground
              hover:bg-primary/90
            "
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