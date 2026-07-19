"use client";

import Image from "next/image";
import { User } from "lucide-react";

import { useCurrentUser } from "@/hooks/use-current-user";

type Props = {
  className?: string;
};

function getInitials(name: string | null, email: string) {
  if (name?.trim()) {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  }

  return email.charAt(0).toUpperCase();
}

export function UserAvatar({
  className = "",
}: Props) {
  const { user } = useCurrentUser();

  if (user.image) {
    return (
      <Image
        src={user.image}
        alt={user.name ?? user.email}
        width={40}
        height={40}
        className={`rounded-full object-cover ${className}`}
      />
    );
  }

  const initials = getInitials(
    user.name,
    user.email
  );

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white ${className}`}
    >
      {initials || (
        <User className="h-4 w-4" />
      )}
    </div>
  );
}