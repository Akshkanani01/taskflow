type Props = {
  name: string;
  email: string;
  image: string | null;
  size?: number;
};

export default function TaskAvatar({
  name,
  email,
  image,
  size = 34,
}: Props) {
  const displayName =
    name.trim() || email;

  const initials = displayName
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (image) {
    return (
      <img
        src={image}
        alt={displayName}
        width={size}
        height={size}
        draggable={false}
        className="
          h-auto
          shrink-0
          select-none
          rounded-full
          object-cover
          ring-2
          ring-border
        "
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className="
        flex
        shrink-0
        select-none
        items-center
        justify-center
        rounded-full
        bg-primary
        text-xs
        font-semibold
        text-primary-foreground
        ring-2
        ring-border
      "
    >
      {initials}
    </div>
  );
}