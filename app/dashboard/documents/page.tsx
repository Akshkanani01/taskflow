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
      <h1 className="text-4xl font-bold text-white">
        Documents
      </h1>

      <p className="mt-2 text-slate-400">
        Centralized knowledge and file management.
      </p>
    </div>

    <button
      className="
        flex items-center gap-2
        rounded-xl
        bg-indigo-600
        px-5 py-3
        text-white
      "
    >
      <Plus size={18} />
      Upload File
    </button>

  </div>

  <div className="grid gap-6 md:grid-cols-4">

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <FileText className="mb-4 text-indigo-400" />
      <h2 className="text-3xl font-bold text-white">
        248
      </h2>
      <p className="text-slate-400">
        Documents
      </p>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Folder className="mb-4 text-emerald-400" />
      <h2 className="text-3xl font-bold text-white">
        36
      </h2>
      <p className="text-slate-400">
        Folders
      </p>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Clock className="mb-4 text-pink-400" />
      <h2 className="text-3xl font-bold text-white">
        18
      </h2>
      <p className="text-slate-400">
        Recent Updates
      </p>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
      <Star className="mb-4 text-amber-400" />
      <h2 className="text-3xl font-bold text-white">
        42
      </h2>
      <p className="text-slate-400">
        Favorites
      </p>
    </div>

  </div>

  <div className="relative max-w-md">

    <Search
      size={18}
      className="absolute left-4 top-3.5 text-slate-500"
    />

    <input
      placeholder="Search documents..."
      className="
        h-12 w-full
        rounded-xl
        border border-white/10
        bg-slate-900
        pl-11
        text-white
      "
    />

  </div>

  <div
    className="
      rounded-3xl
      border border-white/10
      bg-slate-900
      overflow-hidden
    "
  >

    <table className="w-full">

      <thead className="border-b border-white/10">

        <tr className="text-left text-slate-400">

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
            className="border-b border-white/5"
          >
            <td className="p-5 text-white">
              {doc.name}
            </td>

            <td className="p-5 text-slate-400">
              {doc.owner}
            </td>

            <td className="p-5 text-slate-400">
              {doc.updated}
            </td>

            <td className="p-5 text-slate-400">
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
