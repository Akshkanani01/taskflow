"use client";

import Image from "next/image";

interface Props {
  name: string;
  avatar?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function MemberAvatar({
  name,
  avatar,
  size = "md",
}: Props) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const sizes = {
    sm: {
      avatar: "h-10 w-10",
      text: "text-sm",
    },

    md: {
      avatar: "h-12 w-12",
      text: "text-lg",
    },

    lg: {
      avatar: "h-16 w-16",
      text: "text-xl",
    },

    xl: {
      avatar: "h-24 w-24",
      text: "text-3xl",
    },
  } as const;

  const s = sizes[size];

  return (
    <div className="relative shrink-0">
      {avatar ? (
        <Image
          src={avatar}
          alt={name}
          width={48}
          height={48}
          className={`
            ${s.avatar}
            rounded-full
            border
            border-border
            object-cover
            transition
            group-hover:border-primary
            group-hover:scale-105
          `}
        />
      ) : (
        <div
          className={`
            ${s.avatar}
            ${s.text}
            flex
            items-center
            justify-center
            rounded-full
            bg-primary
            font-semibold
            text-primary-foreground
            transition
            group-hover:scale-105
          `}
        >
          {initials}
        </div>
      )}

      <span
        className="
          absolute
          bottom-0
          right-0
          rounded-full
          border-2
          border-background
        "
      />
    </div>
  );
}