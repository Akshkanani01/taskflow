import {
FileText,
Folder,
Search,
Plus,
Clock,
Star,
} from "lucide-react";

const documents = [
{
name: "Product Requirements.pdf",
owner: "Aksh",
updated: "2 hours ago",
size: "4.2 MB",
},
{
name: "Q3 Roadmap.docx",
owner: "Riya",
updated: "Yesterday",
size: "1.8 MB",
},
{
name: "Client Contract.pdf",
owner: "Admin",
updated: "3 days ago",
size: "980 KB",
},
{
name: "Team Handbook.docx",
owner: "Dev",
updated: "1 week ago",
size: "2.1 MB",
},
];

export default function DocumentsPage() {
return ( <div className="space-y-8">

  <div className="flex items-center justify-between">

    <div>
      <h1 className="text-4xl font-bold text-foreground">
        Documents
      </h1>

      <p className="mt-2 text-muted-foreground">
        Centralized knowledge and file management.
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
      Upload File
    </button>

  </div>

  <div className="grid gap-6 md:grid-cols-4">

    <div className="rounded-3xl border border-border bg-card p-6">
      <FileText className="mb-4 text-indigo-400" />
      <h2 className="text-3xl font-bold text-foreground">
        248
      </h2>
      <p className="text-muted-foreground">
        Documents
      </p>
    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <Folder className="mb-4 text-emerald-400" />
      <h2 className="text-3xl font-bold text-foreground">
        36
      </h2>
      <p className="text-muted-foreground">
        Folders
      </p>
    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <Clock className="mb-4 text-pink-400" />
      <h2 className="text-3xl font-bold text-foreground">
        18
      </h2>
      <p className="text-muted-foreground">
        Recent Updates
      </p>
    </div>

    <div className="rounded-3xl border border-border bg-card p-6">
      <Star className="mb-4 text-amber-400" />
      <h2 className="text-3xl font-bold text-foreground">
        42
      </h2>
      <p className="text-muted-foreground">
        Favorites
      </p>
    </div>

  </div>

  <div className="relative max-w-md">

    <Search
      size={18}
      className="absolute left-4 top-3.5 text-muted-foreground"
    />

    <input
      placeholder="Search documents..."
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

  <div
    className="
      rounded-3xl
      border border-border
      bg-card
      overflow-hidden
    "
  >

    <table className="w-full">

      <thead className="border-b border-border">

        <tr className="text-left text-muted-foreground">

          <th className="p-5">Document</th>
          <th className="p-5">Owner</th>
          <th className="p-5">Updated</th>
          <th className="p-5">Size</th>

        </tr>

      </thead>

      <tbody>

        {documents.map((doc) => (
          <tr
            key={doc.name}
            className="border-b border-border"
          >
            <td className="p-5 text-foreground">
              {doc.name}
            </td>

            <td className="p-5 text-muted-foreground">
              {doc.owner}
            </td>

            <td className="p-5 text-muted-foreground">
              {doc.updated}
            </td>

            <td className="p-5 text-muted-foreground">
              {doc.size}
            </td>
          </tr>
        ))}

      </tbody>

    </table>

  </div>

</div>


);
}
