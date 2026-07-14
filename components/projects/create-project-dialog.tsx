"use client";

import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ProjectForm from "@/app/dashboard/projects/create/project-form";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  spaceId: string;
};

export default function CreateProjectDialog({
  open,
  onOpenChange,
  spaceId,
}: Props) {
  const router = useRouter();

  function handleSuccess() {
    onOpenChange(false);

    router.refresh();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="
          max-w-2xl
          border
          border-white/10
          bg-slate-900
          p-0
          text-white
        "
      >
        <DialogHeader
          className="
            border-b
            border-white/10
            px-8
            py-6
          "
        >
          <DialogTitle
            className="
              text-2xl
              font-bold
            "
          >
            Create List
          </DialogTitle>
        </DialogHeader>

        <div className="p-8">
          <ProjectForm
            spaceId={spaceId}
            onSuccess={handleSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}