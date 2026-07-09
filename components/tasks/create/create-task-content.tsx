"use client";

type Props = {
  title: string;

  description: string;

  onTitleChange: (
    value: string
  ) => void;

  onDescriptionChange: (
    value: string
  ) => void;
};

export default function CreateTaskContent({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: Props) {
  return (
    <div className="space-y-8">

      {/* TITLE */}

      <div>

        <label
          className="
          mb-3
          block
          text-xs
          font-semibold
          uppercase
          tracking-[0.2em]
          text-slate-500
          "
        >
          Task Title
        </label>

        <input
          value={title}
          onChange={(e) =>
            onTitleChange(
              e.target.value
            )
          }
          placeholder="What needs to be done?"
          className="
          h-14
          w-full
          rounded-2xl
          border
          border-white/10
          bg-slate-950
          px-5
          text-lg
          text-white
          outline-none
          transition
          focus:border-indigo-500
          "
        />

      </div>

      {/* DESCRIPTION */}

      <div>

        <label
          className="
          mb-3
          block
          text-xs
          font-semibold
          uppercase
          tracking-[0.2em]
          text-slate-500
          "
        >
          Description
        </label>

        <textarea
          rows={12}
          value={description}
          onChange={(e) =>
            onDescriptionChange(
              e.target.value
            )
          }
          placeholder="Describe this task..."
          className="
          w-full
          resize-none
          rounded-2xl
          border
          border-white/10
          bg-slate-950
          p-5
          leading-7
          text-white
          outline-none
          transition
          focus:border-indigo-500
          "
        />

      </div>

      {/* LIVE PREVIEW */}

      <div
        className="
        rounded-3xl
        border
        border-dashed
        border-white/10
        bg-slate-950
        p-6
        "
      >

        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500">
          Preview
        </p>

        <h3 className="text-2xl font-bold text-white">

          {title || "Untitled Task"}

        </h3>

        <p className="mt-4 whitespace-pre-wrap leading-7 text-slate-400">

          {description ||
            "Task description will appear here."}

        </p>

      </div>

    </div>
  );
}