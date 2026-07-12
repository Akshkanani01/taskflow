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

  size = 40,

}: Props) {
      const displayName =
    name.trim() || email;

  const initials =
    displayName
      .split(" ")
      .map((part) =>
        part.charAt(0)
      )
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

        className="
          rounded-full
          object-cover
          ring-2
          ring-white/10
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
        items-center
        justify-center
        rounded-full
        bg-gradient-to-br
        from-indigo-600
        via-violet-600
        to-fuchsia-600
        text-sm
        font-bold
        text-white
        ring-2
        ring-white/10
      "

    >

      {initials}

    </div>

  );

}