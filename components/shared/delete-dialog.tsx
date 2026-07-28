"use client";

import { Loader2, Trash2 } from "lucide-react";

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

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  description: string;

  loading?: boolean;

  onConfirm: () => void | Promise<void>;
}

export default function DeleteDialog({
  open,
  onOpenChange,
  title,
  description,
  loading = false,
  onConfirm,
}: DeleteDialogProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent className="border-border bg-card text-foreground">

        <AlertDialogHeader>

          <div className="flex justify-center">

            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-red-500/10
              "
            >
              <Trash2
                className="text-red-400"
                size={30}
              />
            </div>

          </div>

          <AlertDialogTitle className="mt-4 text-center text-2xl">

            {title}

          </AlertDialogTitle>

          <AlertDialogDescription
            asChild
          >

            <div className="mt-3 text-center text-muted-foreground">

              {description}

            </div>

          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter className="mt-8 flex-col gap-3 sm:flex-row">

          <AlertDialogCancel
            disabled={loading}
            className="
              h-11
              border-border
              bg-muted
              text-foreground
              transition
              hover:bg-accent
              hover:text-accent-foreground
            "
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={loading}
            className="
              h-11
              min-w-[140px]
              bg-red-600
              text-foreground
              transition
              hover:bg-red-500
              focus:ring-red-500
            "
          >
            {loading ? (
              <span className="flex items-center gap-2">

                <Loader2
                  size={18}
                  className="animate-spin"
                />

                Deleting...

              </span>
            ) : (
              <span className="flex items-center gap-2">

                <Trash2
                  size={18}
                />

                Delete

              </span>
            )}
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}