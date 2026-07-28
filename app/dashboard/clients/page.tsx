import {
Plus,
Search,
Building2,
DollarSign,
FolderKanban,
Mail,
} from "lucide-react";

const clients = [
{
name: "Acme Corporation",
contact: "[john@acme.com](mailto:john@acme.com)",
lists: 4,
revenue: "$24,000",
status: "Active",
},
{
name: "TechNova",
contact: "[hello@technova.com](mailto:hello@technova.com)",
lists: 2,
revenue: "$12,500",
status: "Active",
},
{
name: "GrowthLabs",
contact: "[team@growthlabs.com](mailto:team@growthlabs.com)",
lists: 1,
revenue: "$7,800",
status: "Pending",
},
];

export default function ClientsPage() {
return ( <div className="space-y-8">

  <div className="flex items-center justify-between">

    <div>

      <h1 className="text-4xl font-bold text-foreground">
        Clients
      </h1>

      <p className="mt-2 text-muted-foreground">
        Manage clients, contracts and revenue.
      </p>

    </div>

    <button
      className="
        flex items-center gap-2
        rounded-xl
        bg-indigo-600
        px-5 py-3
        text-foreground
      "
    >
      <Plus size={18} />
      Add Client
    </button>

  </div>

  <div className="grid gap-6 md:grid-cols-4">

    <div className="rounded-3xl border border-border bg-card p-6">
      <Building2 className="mb-4 text-indigo-400" />
      <h2 className="text-3xl font-bold text-foreground">
        42
      </h2>
      <p className="text-muted-foreground">
        Total Clients
      </p>
    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <DollarSign className="mb-4 text-emerald-400" />
      <h2 className="text-3xl font-bold text-foreground">
        $148K
      </h2>
      <p className="text-muted-foreground">
        Revenue
      </p>
    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <FolderKanban className="mb-4 text-pink-400" />
      <h2 className="text-3xl font-bold text-foreground">
        29
      </h2>
      <p className="text-muted-foreground">
        Active lists
      </p>
    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <Mail className="mb-4 text-amber-400" />
      <h2 className="text-3xl font-bold text-foreground">
        96%
      </h2>
      <p className="text-muted-foreground">
        Retention Rate
      </p>
    </div>

  </div>

  <div className="relative max-w-md">

    <Search
      size={18}
      className="absolute left-4 top-3.5 text-muted-foreground"
    />

    <input
      placeholder="Search clients..."
      className="
        h-12 w-full
        rounded-xl
        border border-border
        bg-card
        pl-11
        text-foreground
      "
    />

  </div>

  <div className="grid gap-6">

    {clients.map((client) => (
      <div
        key={client.name}
        className="
          rounded-3xl
          border border-border
          bg-card
          p-6
        "
      >

        <div className="flex items-center justify-between">

          <div>

            <h3 className="text-xl font-semibold text-foreground">
              {client.name}
            </h3>

            <p className="mt-2 text-muted-foreground">
              {client.contact}
            </p>

          </div>

          <span
            className="
              rounded-full
              bg-emerald-500/20
              px-3 py-1
              text-xs
              text-emerald-300
            "
          >
            {client.status}
          </span>

        </div>

        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">

          <div>
            <p className="text-sm text-muted-foreground">
              lists
            </p>

            <h4 className="mt-1 text-lg font-semibold text-foreground">
              {client.lists}
            </h4>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Revenue
            </p>

            <h4 className="mt-1 text-lg font-semibold text-foreground">
              {client.revenue}
            </h4>
          </div>

        </div>

      </div>
    ))}

  </div>

</div>

);
}
