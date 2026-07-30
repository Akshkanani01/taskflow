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
  "h-11 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary/30 ut-ready:bg-primary ut-uploading:cursor-not-allowed ut-uploading:opacity-70",
        container: "flex w-full sm:w-fit",
        allowedContent: "hidden",
      }}
      onClientUploadComplete={(files) => {
        const file = files[0];

        if (!file?.ufsUrl) {
          toast.error(
  "Unable to upload your profile photo."
);
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

          toast.success(
  "Profile photo updated successfully."
);
        });
      }}
      onUploadError={(error: Error) => {
        toast.error(
  error.message ||
    "Something went wrong while uploading."
);
      }}
      disabled={pending}
    />
  );
}