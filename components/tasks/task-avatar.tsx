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
          rounded-full
          object-cover
          ring-2
          ring-white/10
          select-none
          shrink-0
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
        bg-gradient-to-br
        from-indigo-600
        via-violet-600
        to-fuchsia-600
        text-xs
        font-semibold
        text-white
        ring-2
        ring-white/10
      "
    >
      {initials}
    </div>
  );
}