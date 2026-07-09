"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CalendarDays,
  Flag,
  FolderKanban,
  Loader2,
  Save,
  User2,
} from "lucide-react";

import { createTask } from "@/app/actions/tasks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TaskSchema = z.object({
  title: z
    .string()
    .min(3, "Task title is required"),

  description: z.string().optional(),

  projectId: z.string().min(1),

  

  status: z.enum([
    "TODO",
    "IN_PROGRESS",
    "DONE",
  ]),

  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
  ]),

  dueDate: z.string().optional(),

  assigneeIds: z.array(z.string()),
});

type TaskFormValues = z.infer<
  typeof TaskSchema
>;

interface Member {

  id: string;

  name: string;

}

interface Project {

  id: string;

  name: string;

}

interface TaskFormProps {

  projects: Project[];

  members: Member[];

}

export default function TaskForm({

  projects,

  members,


}: TaskFormProps) {

  const router = useRouter();

  const [pending, startTransition] =
    useTransition();

  const {

    register,

    handleSubmit,

    setValue,

    watch,

    formState: {

      errors,

    },

    reset,

  } = useForm<TaskFormValues>({

    resolver: zodResolver(
      TaskSchema
    ),

    defaultValues: {

      title: "",

      description: "",

      projectId: "",

      status: "TODO",

      priority: "MEDIUM",

      dueDate: "",

      assigneeIds: [],

    },

  });

  const selectedAssignees =
    watch("assigneeIds");
      async function onSubmit(
    values: TaskFormValues
  ) {
    startTransition(async () => {
      const result = await createTask({
  title: values.title,

  description: values.description,

  projectId: values.projectId,

  priority: values.priority,

  status: values.status,

  dueDate: values.dueDate
    ? new Date(values.dueDate)
    : null,

  assigneeIds: values.assigneeIds,
});
      if (!result.success) {
        alert(result.message);
        return;
      }

      reset();

      router.refresh();
    });
  }

  return (

<form
onSubmit={handleSubmit(onSubmit)}
className="space-y-8"
>

<div className="grid gap-8 lg:grid-cols-2">

{/* ================================= */}

{/* LEFT */}

{/* ================================= */}

<div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

<div>

<h2 className="text-2xl font-bold text-white">

Task Information

</h2>

<p className="mt-2 text-slate-400">

Create a new task for your workspace.

</p>

</div>

{/* TITLE */}

<div>

<label className="mb-2 block text-sm font-semibold text-slate-300">

Task Title

</label>

<Input
placeholder="Design Dashboard..."
className="h-12 border-slate-700 bg-slate-950 text-white"
{...register("title")}
/>

{errors.title && (

<p className="mt-2 text-sm text-red-400">

{errors.title.message}

</p>

)}

</div>

{/* DESCRIPTION */}

<div>

<label className="mb-2 block text-sm font-semibold text-slate-300">

Description

</label>

<textarea

rows={8}

placeholder="Write task description..."

className="
w-full
rounded-2xl
border
border-slate-700
bg-slate-950
p-4
text-white
outline-none
transition
focus:border-blue-500
"

{...register("description")}

/>

</div>

{/* STATUS */}

<div>

<label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">

<Flag className="h-4 w-4"/>

Status

</label>

<select

className="
h-12
w-full
rounded-xl
border
border-slate-700
bg-slate-950
px-4
text-white
"

{...register("status")}

>

<option value="TODO">

Todo

</option>

<option value="IN_PROGRESS">

In Progress

</option>

<option value="DONE">

Done

</option>

</select>

</div>

{/* PRIORITY */}

<div>

<label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">

<Flag className="h-4 w-4"/>

Priority

</label>

<select

className="
h-12
w-full
rounded-xl
border
border-slate-700
bg-slate-950
px-4
text-white
"

{...register("priority")}

>

<option value="LOW">

Low

</option>

<option value="MEDIUM">

Medium

</option>

<option value="HIGH">

High

</option>

</select>

</div>

</div>

{/* ================================= */}

{/* RIGHT */}

<div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
    {/* =============================== */}

{/* PROJECT */}

{/* =============================== */}

<div>

  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">

    <FolderKanban className="h-4 w-4" />

    Project

  </label>

  <select
    className="
    h-12
    w-full
    rounded-xl
    border
    border-slate-700
    bg-slate-950
    px-4
    text-white
    "
    {...register("projectId")}
  >

    <option value="">
      Select Project
    </option>

    {projects.map((project) => (

      <option
        key={project.id}
        value={project.id}
      >
        {project.name}
      </option>

    ))}

  </select>

  {errors.projectId && (

    <p className="mt-2 text-sm text-red-400">

      {errors.projectId.message}

    </p>

  )}

</div>

{/* =============================== */}

{/* DUE DATE */}

{/* =============================== */}

<div>

  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">

    <CalendarDays className="h-4 w-4" />

    Due Date

  </label>

  <Input
    type="date"
    className="
    h-12
    border-slate-700
    bg-slate-950
    text-white
    "
    {...register("dueDate")}
  />

</div>

{/* =============================== */}

{/* ASSIGNEES */}

{/* =============================== */}

<div>

  <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">

    <User2 className="h-4 w-4" />

    Assign Members

  </label>

  <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950 p-4 max-h-72 overflow-y-auto">

    {members.map((member) => {

      const checked =
        selectedAssignees.includes(member.id);

      return (

        <label
          key={member.id}
          className="
          flex
          cursor-pointer
          items-center
          justify-between
          rounded-xl
          border
          border-transparent
          p-3
          transition-all
          hover:border-slate-700
          hover:bg-slate-900
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-blue-600
              to-indigo-600
              font-semibold
              text-white
              "
            >
              {member.name.charAt(0)}
            </div>

            <div>

              <p className="font-medium text-white">

                {member.name}

              </p>

            </div>

          </div>

          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => {

              if (e.target.checked) {

                setValue("assigneeIds", [

                  ...selectedAssignees,

                  member.id,

                ]);

              } else {

                setValue(

                  "assigneeIds",

                  selectedAssignees.filter(

                    (id) => id !== member.id

                  )

                );

              }

            }}
          />

        </label>

      );

    })}

  </div>

</div>

{/* =============================== */}

{/* SUMMARY */}

{/* =============================== */}

<div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">

  <h3 className="text-lg font-semibold text-white">

    Summary

  </h3>

  <div className="mt-5 space-y-4 text-sm">

    <div className="flex justify-between">

      <span className="text-slate-400">

        Selected Members

      </span>

      <span className="font-semibold text-white">

        {selectedAssignees.length}

      </span>

    </div>

    <div className="flex justify-between">

      <span className="text-slate-400">

        Projects

      </span>

      <span className="font-semibold text-white">

        {projects.length}

      </span>

    </div>

  </div>

</div>

{/* =============================== */}

{/* ACTIONS */}

{/* =============================== */}

<div className="flex justify-end gap-3 pt-2">

  <Button
    type="button"
    variant="outline"
    className="border-slate-700 bg-slate-900 text-white"
    onClick={() => reset()}
  >
    Reset
  </Button>

  <Button
    type="submit"
    disabled={pending}
    className="
    rounded-xl
    bg-gradient-to-r
    from-blue-600
    to-indigo-600
    px-8
    "
  >

    {pending ? (

      <Loader2 className="mr-2 h-4 w-4 animate-spin" />

    ) : (

      <Save className="mr-2 h-4 w-4" />

    )}

    Create Task

  </Button>

</div>

</div>

</div>

</form>

);
}