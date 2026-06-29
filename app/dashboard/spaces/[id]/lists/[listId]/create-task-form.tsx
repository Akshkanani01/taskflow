"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
Plus,
Calendar,
Flag,
Users,
Paperclip,
FileText,
} from "lucide-react";


type Member = {
  id: string;
  name: string | null;
  email: string;
};

export default function CreateTaskForm({
  projectId,
  members = [],
}: {
  projectId: string;
  members?: Member[];
}) {
const router = useRouter();

const [loading, setLoading] = useState(false);

const [title, setTitle] = useState("");
const [description, setDescription] =
useState("");

const [status, setStatus] =
useState("todo");

const [priority, setPriority] =
useState("normal");

const [dueDate, setDueDate] =
useState("");


const [assigneeIds, setAssigneeIds] =
useState<string[]>([]);

const [files, setFiles] =
useState<File[]>([]);

function toggleMember(
memberId: string
) {
setAssigneeIds((prev) =>
prev.includes(memberId)
? prev.filter(
(id) => id !== memberId
)
: [...prev, memberId]
);
}

async function handleSubmit(
e: React.FormEvent
) {
e.preventDefault();


if (!title.trim()) {
  alert("Task title required");
  return;
}

try {
  setLoading(true);

  const formData =
    new FormData();

  formData.append(
    "title",
    title
  );

  formData.append(
    "description",
    description
  );

  formData.append(
    "status",
    status
  );

  formData.append(
    "priority",
    priority
  );

  formData.append(
    "dueDate",
    dueDate
  );

  formData.append(
    "projectId",
    projectId
  );

  formData.append(
    "assigneeIds",
    JSON.stringify(
      assigneeIds
    )
  );

  files.forEach((file) => {
    formData.append(
      "files",
      file
    );
  });

  const res = await fetch(
    "/api/tasks/create",
    {
      method: "POST",
      body: formData,
    }
  );

  const data =
    await res.json();

  if (!res.ok) {
    alert(
      data.error ??
        "Failed to create task"
    );
    return;
  }

  router.push(
    "/dashboard/tasks"
  );

  router.refresh();
} catch (error) {
  console.error(error);

  alert(
    "Something went wrong"
  );
} finally {
  setLoading(false);
}


}

return ( <form
   onSubmit={handleSubmit}
   className="space-y-6"
 >
{/* Project */}

  

  {/* Title */}

  <div>
    <label
      className="
        mb-2
        flex
        items-center
        gap-2
        text-sm
        text-slate-400
      "
    >
      <FileText size={16} />
      Task Title
    </label>

    <input
      value={title}
      onChange={(e) =>
        setTitle(
          e.target.value
        )
      }
      placeholder="Design Dashboard UI"
      className="
        w-full
        rounded-2xl
        border
        border-white/10
        bg-slate-950
        px-4
        py-3
        text-white
      "
    />
  </div>

  {/* Description */}

  <div>
    <label className="mb-2 block text-sm text-slate-400">
      Description
    </label>

    <textarea
      rows={5}
      value={description}
      onChange={(e) =>
        setDescription(
          e.target.value
        )
      }
      placeholder="Describe task..."
      className="
        w-full
        rounded-2xl
        border
        border-white/10
        bg-slate-950
        p-4
        text-white
      "
    />
  </div>

  {/* Status Priority Date */}

  <div className="grid gap-4 md:grid-cols-3">

    <div>
      <label className="mb-2 block text-sm text-slate-400">
        Status
      </label>

      <select
        value={status}
        onChange={(e) =>
          setStatus(
            e.target.value
          )
        }
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-slate-950
          px-4
          py-3
          text-white
        "
      >
        <option value="todo">
          Todo
        </option>

        <option value="in_progress">
          In Progress
        </option>

        <option value="review">
          Review
        </option>

        <option value="done">
          Done
        </option>
      </select>
    </div>

    <div>
      <label
        className="
          mb-2
          flex
          items-center
          gap-2
          text-sm
          text-slate-400
        "
      >
        <Flag size={15} />
        Priority
      </label>

      <select
        value={priority}
        onChange={(e) =>
          setPriority(
            e.target.value
          )
        }
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-slate-950
          px-4
          py-3
          text-white
        "
      >
        <option value="low">
          Low
        </option>

        <option value="normal">
          Normal
        </option>

        <option value="high">
          High
        </option>

        <option value="urgent">
          Urgent
        </option>
      </select>
    </div>

    <div>
      <label
        className="
          mb-2
          flex
          items-center
          gap-2
          text-sm
          text-slate-400
        "
      >
        <Calendar size={15} />
        Due Date
      </label>

      <input
        type="date"
        value={dueDate}
        onChange={(e) =>
          setDueDate(
            e.target.value
          )
        }
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-slate-950
          px-4
          py-3
          text-white
        "
      />
    </div>

  </div>

  {/* Multiple Assignees */}

  <div>

    <label
      className="
        mb-3
        flex
        items-center
        gap-2
        text-sm
        text-slate-400
      "
    >
      <Users size={16} />
      Assign Members
    </label>

    <div className="flex flex-wrap gap-2">
  {members.length === 0 ? (
    <div className="text-slate-500">
      No members found
    </div>
  ) : (
    members.map((member) => (
      <button
        key={member.id}
        type="button"
        onClick={() => toggleMember(member.id)}
        className={
          assigneeIds.includes(member.id)
            ? "rounded-full bg-indigo-600 px-4 py-2 text-sm text-white"
            : "rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300"
        }
      >
        {member.name ?? member.email}
      </button>
    ))
  )}
</div>

  </div>

  {/* Attachments */}

  <div>

    <label
      className="
        mb-2
        flex
        items-center
        gap-2
        text-sm
        text-slate-400
      "
    >
      <Paperclip size={16} />
      Attach Files
    </label>

    <input
      type="file"
      multiple
      onChange={(e) =>
        setFiles(
          Array.from(
            e.target.files || []
          )
        )
      }
      className="
        w-full
        rounded-2xl
        border
        border-dashed
        border-white/10
        bg-slate-950
        p-4
        text-slate-300
      "
    />

    {files.length > 0 && (
      <div className="mt-3 space-y-2">

        {files.map(
          (file, index) => (
            <div
              key={index}
              className="
                rounded-xl
                bg-slate-800
                px-3
                py-2
                text-sm
                text-slate-300
              "
            >
              📎 {file.name}
            </div>
          )
        )}

      </div>
    )}

  </div>

  {/* Submit */}

  <button
    disabled={loading}
    className="
      flex
      w-full
      items-center
      justify-center
      gap-2
      rounded-2xl
      bg-indigo-600
      py-4
      font-semibold
      text-white
    "
  >
    <Plus size={18} />

    {loading
      ? "Creating..."
      : "Create Task"}
  </button>

</form>


);
}
