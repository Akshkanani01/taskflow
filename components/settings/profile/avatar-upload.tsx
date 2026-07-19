"use client";

import { useTransition } from "react";

import { toast } from "sonner";

import { updateAvatar } from "@/app/actions/settings/update-avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UploadButton } from "@/lib/uploadthing";

type Props = {
  endpoint: "avatarUploader";
};

export default function AvatarUpload({
  endpoint,
}: Props) {
  const { updateUser } = useCurrentUser();

  const [pending, startTransition] = useTransition();

  return (
    <UploadButton
      endpoint={endpoint}
      appearance={{
        button:
          "h-11 rounded-xl bg-blue-600 px-5 text-sm font-medium text-white hover:bg-blue-500 ut-ready:bg-blue-600 ut-uploading:cursor-not-allowed",
        container: "w-fit",
        allowedContent: "hidden",
      }}
      onClientUploadComplete={(files) => {
        const file = files[0];

        if (!file?.ufsUrl) {
          toast.error("Upload failed.");
          return;
        }

        startTransition(async () => {
          const formData = new FormData();

          formData.append("image", file.ufsUrl);

          const result = await updateAvatar(
            {
              success: false,
              message: "",
            },
            formData
          );

          if (!result.success) {
            toast.error(result.message);
            return;
          }

          if (result.user) {
            updateUser(result.user);
          }

          toast.success(result.message);
        });
      }}
      onUploadError={(error: Error) => {
        toast.error(error.message);
      }}
      disabled={pending}
    />
  );
}