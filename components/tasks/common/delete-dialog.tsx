"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Loader2, Trash2 } from "lucide-react";

type Props = {
  open: boolean;
  loading?: boolean;

  title: string;

  description: string;

  onClose: () => void;

  onConfirm: () => void;
};

export default function DeleteDialog({
  open,
  loading,
  title,
  description,
  onClose,
  onConfirm,
}: Props) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={onClose}
    >
      <AlertDialogContent className="border-white/10 bg-[#0F172A]">

        <AlertDialogHeader>

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">

            <Trash2 className="h-8 w-8 text-red-500" />

          </div>

          <AlertDialogTitle className="text-center text-2xl text-white">
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription className="pt-2 text-center text-slate-400">
            {description}
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6">

          <AlertDialogCancel
            disabled={loading}
            className="border-white/10 bg-slate-900 text-white hover:bg-slate-800"
          >
            Cancel
          </AlertDialogCancel>

          <button
  type="button"
  disabled={loading}
  onClick={onConfirm}
  className="
    inline-flex
    items-center
    justify-center
    rounded-md
    bg-red-600
    px-4
    py-2
    text-sm
    font-medium
    text-white
    transition
    hover:bg-red-500
    disabled:cursor-not-allowed
    disabled:opacity-50
  "
>
  {loading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Deleting...
    </>
  ) : (
    <>
      <Trash2 className="mr-2 h-4 w-4" />
      Delete
    </>
  )}
</button>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}