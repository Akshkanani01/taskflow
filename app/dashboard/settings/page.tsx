import Link from "next/link";

import {
  ArrowRight,
  Bell,
  Palette,
  Settings2,
  ShieldCheck,
  TriangleAlert,
  UserCircle2,
} from "lucide-react";

const settingsCards = [
  {
    title: "General",
    description:
      "Manage workspace information, timezone and regional preferences.",
    href: "/dashboard/settings/general",
    icon: Settings2,
    color:
      "from-indigo-500 to-violet-600",
    badge: "Workspace",
    count: "6 Settings",
  },

  {
    title: "Profile",
    description:
      "Manage your profile, avatar and personal preferences.",
    href: "/dashboard/settings/profile",
    icon: UserCircle2,
    color:
      "from-sky-500 to-cyan-500",
    badge: "Personal",
    count: "6 Settings",
  },

  {
    title: "Appearance",
    description:
      "Customize theme, interface and display preferences.",
    href: "/dashboard/settings/appearance",
    icon: Palette,
    color:
      "from-purple-500 to-pink-500",
    badge: "UI",
    count: "3 Settings",
  },

  {
    title: "Notifications",
    description:
      "Configure browser, email and workspace notifications.",
    href: "/dashboard/settings/notifications",
    icon: Bell,
    color:
      "from-amber-500 to-orange-500",
    badge: "Alerts",
    count: "5 Settings",
  },

  {
    title: "Security",
    description:
      "Manage account sessions and security preferences.",
    href: "/dashboard/settings/security",
    icon: ShieldCheck,
    color:
      "from-emerald-500 to-green-600",
    badge: "Protected",
    count: "4 Settings",
  },
];

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-10">

      {/* HERO */}

      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-gradient-to-br
          from-slate-900
          via-slate-900
          to-slate-950
          p-10
        "
      >

        <div className="relative z-10">

          <p
            className="
              text-sm
              font-medium
              uppercase
              tracking-[0.3em]
              text-indigo-400
            "
          >
            Settings
          </p>

          <h1
            className="
              mt-4
              text-5xl
              font-bold
              tracking-tight
              text-white
            "
          >
            Workspace Settings
          </h1>

          <p
            className="
              mt-5
              max-w-3xl
              text-lg
              leading-8
              text-slate-400
            "
          >
            Manage your workspace, account, appearance,
            notifications and security preferences from
            one central place.
          </p>

        </div>

        <div
          className="
            absolute
            -right-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-indigo-500/20
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-0
            left-0
            h-44
            w-44
            rounded-full
            bg-violet-500/10
            blur-3xl
          "
        />

      </section>
            {/* WORKSPACE */}

      <section className="space-y-6">

        <div>

          <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">
            Workspace
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Workspace Settings
          </h2>

          <p className="mt-2 text-slate-400">
            Configure global workspace preferences that affect every member.
          </p>

        </div>

        <Link
          href="/dashboard/settings/general"
          className="
            group
            relative
            block
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-slate-900
            p-8
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-indigo-500/40
            hover:bg-slate-900/80
          "
        >

          <div
            className="
              absolute
              right-0
              top-0
              h-40
              w-40
              rounded-full
              bg-indigo-500/10
              blur-3xl
            "
          />

          <div className="relative z-10 flex items-start justify-between gap-8">

            <div className="flex gap-5">

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-indigo-500
                  to-violet-600
                  shadow-lg
                  shadow-indigo-500/20
                "
              >

                <Settings2
                  size={30}
                  className="text-white"
                />

              </div>

              <div>

                <div className="flex items-center gap-3">

                  <h3 className="text-2xl font-bold text-white">
                    General
                  </h3>

                  <span
                    className="
                      rounded-full
                      border
                      border-indigo-500/30
                      bg-indigo-500/10
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-indigo-300
                    "
                  >
                    Workspace
                  </span>

                </div>

                <p className="mt-4 max-w-2xl text-slate-400 leading-7">
                  Manage workspace information, timezone,
                  regional preferences, date & time format,
                  branding and other global settings.
                </p>

                <div className="mt-6 flex items-center gap-6">

                  <span className="text-sm text-slate-500">
                    6 Settings
                  </span>

                  <span className="text-sm text-slate-500">
                    Workspace Level
                  </span>

                </div>

              </div>

            </div>

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-slate-800
                transition-all
                duration-300
                group-hover:translate-x-1
                group-hover:bg-indigo-500
              "
            >

              <ArrowRight
                size={22}
                className="text-white"
              />

            </div>

          </div>

        </Link>

      </section>

      {/* PERSONAL SETTINGS */}

      <section className="space-y-6">

        <div>

          <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">
            Personal
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Personal Settings
          </h2>

          <p className="mt-2 text-slate-400">
            Manage your account, interface preferences and notifications.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {settingsCards
  .filter(
    (card) =>
      card.title !==
      "General"
  )
  .map((card) => {

    const Icon =
      card.icon;

    return (

      <Link
        key={card.title}
        href={card.href}
        className="
          group
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-slate-900
          p-7
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-white/20
          hover:bg-slate-900/80
        "
      >

        <div
          className={`
            absolute
            -right-12
            -top-12
            h-36
            w-36
            rounded-full
            bg-gradient-to-br
            ${card.color}
            opacity-10
            blur-3xl
          `}
        />

        <div className="relative z-10">

          <div className="flex items-start justify-between">

            <div
              className={`
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                ${card.color}
                shadow-lg
              `}
            >

              <Icon
                size={24}
                className="
                  text-white
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />

            </div>

            <span
              className="
                rounded-full
                border
                border-white/10
                bg-slate-800
                px-3
                py-1
                text-xs
                font-medium
                text-slate-300
              "
            >
              {card.badge}
            </span>

          </div>

          <h3
            className="
              mt-6
              text-2xl
              font-bold
              text-white
            "
          >
            {card.title}
          </h3>

          <p
            className="
              mt-3
              leading-7
              text-slate-400
            "
          >
            {card.description}
          </p>

          <div
            className="
              mt-8
              flex
              items-center
              justify-between
            "
          >

            <span
              className="
                text-sm
                text-slate-500
              "
            >
              {card.count}
            </span>

            <div
              className="
                flex
                items-center
                gap-2
                text-sm
                font-medium
                text-white
              "
            >

              Manage

              <ArrowRight
                size={18}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />

            </div>

          </div>

        </div>

      </Link>

    );

  })}
          </div>

      </section>
            {/* DANGER ZONE */}

      <section className="space-y-6">

        <div>

          <p className="text-sm font-medium uppercase tracking-[0.25em] text-red-400">
            Danger Zone
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Critical Workspace Actions
          </h2>

          <p className="mt-2 text-slate-400">
            Perform irreversible actions carefully. These actions may permanently affect your workspace.
          </p>

        </div>

        <Link
          href="/dashboard/settings/danger-zone"
          className="
            group
            relative
            block
            overflow-hidden
            rounded-3xl
            border
            border-red-500/20
            bg-gradient-to-br
            from-red-500/10
            via-slate-900
            to-slate-950
            p-8
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-red-500/50
          "
        >

          <div
            className="
              absolute
              -right-16
              -top-16
              h-48
              w-48
              rounded-full
              bg-red-500/10
              blur-3xl
            "
          />

          <div className="relative z-10 flex items-start justify-between">

            <div className="flex gap-5">

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-red-500
                  to-red-700
                "
              >

                <TriangleAlert
                  size={30}
                  className="text-white"
                />

              </div>

              <div>

                <div className="flex items-center gap-3">

                  <h3 className="text-2xl font-bold text-white">
                    Danger Zone
                  </h3>

                  <span
                    className="
                      rounded-full
                      border
                      border-red-500/30
                      bg-red-500/10
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-red-300
                    "
                  >
                    Protected
                  </span>

                </div>

                <p className="mt-4 max-w-2xl leading-7 text-slate-400">
                  Leave workspace, archive workspace or permanently delete the workspace.
                  These actions require confirmation before execution.
                </p>

                <div className="mt-6 flex items-center gap-6">

                  <span className="text-sm text-red-300">
                    3 Actions
                  </span>

                  <span className="text-sm text-slate-500">
                    Owner Only
                  </span>

                </div>

              </div>

            </div>

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-red-500/20
                bg-red-500/10
                transition-all
                duration-300
                group-hover:bg-red-500
              "
            >

              <ArrowRight
                size={22}
                className="text-white"
              />

            </div>

          </div>

        </Link>

      </section>

      {/* FOOTER */}


    </div>

  );
}