import {
Plug,
CheckCircle,
Globe,
Boxes,
Sigma,
Shield,
Cloud,
Database,
} from "lucide-react";

const integrations = [
{
name: "GitHub",
description: "Sync repositories, issues and pull requests.",
icon: Boxes,
connected: true,
},
{
name: "Figma",
description: "Attach designs and collaborate with your team.",
icon: Sigma,
connected: true,
},
{
name: "Slack",
description: "Receive project updates and notifications.",
icon: Globe,
connected: false,
},
{
name: "Google Drive",
description: "Store and manage project files.",
icon: Cloud,
connected: true,
},
{
name: "Notion",
description: "Sync documentation and knowledge base.",
icon: Database,
connected: false,
},
{
name: "Zoom",
description: "Schedule and join meetings.",
icon: Globe,
connected: false,
},
{
name: "Microsoft Teams",
description: "Enterprise team collaboration.",
icon: Shield,
connected: true,
},
{
name: "OpenAI",
description: "Power AI assistant and automations.",
icon: Plug,
connected: true,
},
];

export default function IntegrationsPage() {
return ( <div className="space-y-8">

  <div className="flex items-center justify-between">

    <div>

      <h1 className="text-4xl font-bold text-white">
        Integrations
      </h1>

      <p className="mt-2 text-slate-400">
        Connect your favorite apps and services.
      </p>

    </div>

    <button
      className="
        rounded-xl
        bg-indigo-600
        px-5 py-3
        text-white
      "
    >
      Browse Marketplace
    </button>

  </div>

  <div className="grid gap-6 md:grid-cols-4">

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Plug className="mb-4 text-indigo-400" />

      <h2 className="text-3xl font-bold text-white">
        28
      </h2>

      <p className="text-slate-400">
        Available Apps
      </p>

    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <CheckCircle className="mb-4 text-emerald-400" />

      <h2 className="text-3xl font-bold text-white">
        12
      </h2>

      <p className="text-slate-400">
        Connected
      </p>

    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Cloud className="mb-4 text-sky-400" />

      <h2 className="text-3xl font-bold text-white">
        1.2TB
      </h2>

      <p className="text-slate-400">
        Synced Files
      </p>

    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Shield className="mb-4 text-pink-400" />

      <h2 className="text-3xl font-bold text-white">
        Enterprise
      </h2>

      <p className="text-slate-400">
        Security Enabled
      </p>

    </div>

  </div>

  <div className="grid gap-6 xl:grid-cols-2">

    {integrations.map((integration) => {
      const Icon = integration.icon;

      return (
        <div
          key={integration.name}
          className="
            rounded-3xl
            border border-white/10
            bg-slate-900
            p-6
          "
        >

          <div className="flex items-start justify-between">

            <div className="flex gap-4">

              <div
                className="
                  flex h-14 w-14
                  items-center justify-center
                  rounded-2xl
                  bg-slate-800
                "
              >
                <Icon
                  size={24}
                  className="text-indigo-400"
                />
              </div>

              <div>

                <h3 className="text-xl font-semibold text-white">
                  {integration.name}
                </h3>

                <p className="mt-2 text-slate-400">
                  {integration.description}
                </p>

              </div>

            </div>

            <span
              className={`
                rounded-full px-3 py-1 text-xs
                ${
                  integration.connected
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-slate-800 text-slate-400"
                }
              `}
            >
              {integration.connected
                ? "Connected"
                : "Available"}
            </span>

          </div>

          <div className="mt-6">

            <button
              className={
                integration.connected
                  ? "rounded-xl border border-white/10 px-4 py-2 text-white"
                  : "rounded-xl bg-indigo-600 px-4 py-2 text-white"
              }
            >
              {integration.connected
                ? "Manage"
                : "Connect"}
            </button>

          </div>

        </div>
      );
    })}

  </div>

</div>

);
}
