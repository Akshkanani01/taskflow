"use client";

import { useState } from "react";
import { Mail, UserPlus } from "lucide-react";

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
  onOpenChange: (open: boolean) => void;
  onInvite?: (data: {
    email: string;
    role: string;
    message: string;
  }) => void;
}

export default function InviteDialog({
  open,
  onOpenChange,
  onInvite,
}: Props) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("MEMBER");
  const [message, setMessage] = useState("");

  function handleInvite() {
    onInvite?.({
      email,
      role,
      message,
    });

    setEmail("");
    setRole("MEMBER");
    setMessage("");

    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-lg rounded-2xl border border-zinc-800 bg-[#111827] p-0 text-white">

        <DialogHeader className="border-b border-zinc-800 p-6">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <UserPlus className="h-5 w-5 text-blue-400" />
            Invite Member
          </DialogTitle>

          <DialogDescription className="text-zinc-400">
            Invite a new member to this space.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 p-6">

          {/* Email */}

          <div className="space-y-2">
            <Label>Email Address</Label>

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />

              <Input
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="john@example.com"
                className="h-11 border-zinc-700 bg-[#0F172A] pl-10"
              />
            </div>
          </div>

          {/* Role */}

          <div className="space-y-2">
            <Label>Role</Label>

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              className="h-11 w-full rounded-lg border border-zinc-700 bg-[#0F172A] px-3 text-white"
            >
              <option value="OWNER">Owner</option>
              <option value="MANAGER">Manager</option>
              <option value="MEMBER">Member</option>
              <option value="VIEWER">Viewer</option>
            </select>
          </div>

          {/* Message */}

          <div className="space-y-2">
            <Label>Message (Optional)</Label>

            <textarea
              rows={4}
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              placeholder="Welcome to the project..."
              className="w-full rounded-lg border border-zinc-700 bg-[#0F172A] p-3 text-sm text-white outline-none"
            />
          </div>

        </div>

        <div className="flex justify-end gap-3 border-t border-zinc-800 p-6">

          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            onClick={handleInvite}
            className="bg-blue-600 hover:bg-blue-500"
          >
            Send Invite
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}