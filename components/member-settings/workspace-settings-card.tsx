import {
  Building2,
  Shield,
  Calendar,
  MailCheck,
  BadgeCheck,
  Users,
} from "lucide-react";

interface Props {
  member: any;
}

export default function WorkspaceSettingsCard({
  member,
}: Props) {

  return (

    <section className="rounded-3xl border border-white/10 bg-[#111827] p-7">

      <div className="mb-8 flex items-center gap-3">

        <Building2 className="h-6 w-6 text-indigo-400" />

        <h2 className="text-xl font-semibold text-white">

          Workspace Information

        </h2>

      </div>

      <div className="grid gap-5 lg:grid-cols-2">

        {/* Workspace */}

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">

          <p className="text-xs uppercase tracking-widest text-slate-500">

            Workspace

          </p>

          <h3 className="mt-3 text-xl font-semibold text-white">

            {member.space.workspace.name}

          </h3>

        </div>

        {/* Space */}

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">

          <p className="text-xs uppercase tracking-widest text-slate-500">

            Space

          </p>

          <h3 className="mt-3 text-xl font-semibold text-white">

            {member.space.name}

          </h3>

        </div>

        {/* Role */}

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">

          <div className="flex items-center gap-2">

            <Shield className="h-5 w-5 text-indigo-400" />

            <span className="text-xs uppercase tracking-widest text-slate-500">

              Current Role

            </span>

          </div>

          <h3 className="mt-3 text-lg font-semibold text-white">

            {member.role}

          </h3>

        </div>

        {/* Joined */}

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">

          <div className="flex items-center gap-2">

            <Calendar className="h-5 w-5 text-indigo-400" />

            <span className="text-xs uppercase tracking-widest text-slate-500">

              Joined

            </span>

          </div>

          <h3 className="mt-3 text-lg font-semibold text-white">

            {new Date(
              member.joinedAt
            ).toLocaleDateString("en-GB")}

          </h3>

        </div>

        {/* Email */}

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">

          <div className="flex items-center gap-2">

            <MailCheck className="h-5 w-5 text-emerald-400" />

            <span className="text-xs uppercase tracking-widest text-slate-500">

              Email Status

            </span>

          </div>

          <h3 className="mt-3 text-lg font-semibold text-emerald-400">

            {member.user.emailVerified
              ? "Verified"
              : "Not Verified"}

          </h3>

        </div>

        {/* Account */}

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">

          <div className="flex items-center gap-2">

            <BadgeCheck className="h-5 w-5 text-cyan-400" />

            <span className="text-xs uppercase tracking-widest text-slate-500">

              Member Status

            </span>

          </div>

          <h3 className="mt-3 text-lg font-semibold text-cyan-400">

            Active

          </h3>

        </div>

      </div>

      {/* Statistics */}

      <div className="mt-8 grid gap-5 md:grid-cols-3">

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 text-center">

          <Users className="mx-auto mb-3 h-8 w-8 text-indigo-400" />

          <p className="text-sm text-slate-500">

            Workspace Role

          </p>

          <h3 className="mt-2 text-2xl font-bold text-white">

            {member.role}

          </h3>

        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 text-center">

          <Calendar className="mx-auto mb-3 h-8 w-8 text-cyan-400" />

          <p className="text-sm text-slate-500">

            Member Since

          </p>

          <h3 className="mt-2 text-lg font-bold text-white">

            {new Date(
              member.joinedAt
            ).getFullYear()}

          </h3>

        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 text-center">

          <Shield className="mx-auto mb-3 h-8 w-8 text-emerald-400" />

          <p className="text-sm text-slate-500">

            Access

          </p>

          <h3 className="mt-2 text-lg font-bold text-white">

            {member.role}

          </h3>

        </div>

      </div>

    </section>

  );

}