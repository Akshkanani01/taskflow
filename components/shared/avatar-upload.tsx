"use client";

import { useState } from "react";

import {
  Camera,
  Loader2,
  Trash2,
} from "lucide-react";

import { toast } from "sonner";

import { UploadButton } from "@/lib/uploadthing";

interface Props {
  value: string;
  onChange: (url: string) => void;
}

export default function AvatarUpload({
  value,
  onChange,
}: Props) {

  const [uploading, setUploading] =
    useState(false);

  return (

    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">

      <div className="flex flex-col items-center">

        {/* Avatar */}

        {value ? (

          <img
            src={value}
            alt="Avatar"
            className="
              h-36
              w-36
              rounded-full
              border-4
              border-white/10
              object-cover
            "
          />

        ) : (

          <div
            className="
              flex
              h-36
              w-36
              items-center
              justify-center
              rounded-full
              bg-indigo-600
              text-white
            "
          >

            <Camera
              size={46}
            />

          </div>

        )}

        <p className="mt-5 text-sm text-slate-500">

          JPG, PNG, WEBP

        </p>

        <p className="text-xs text-slate-600">

          Maximum 4 MB

        </p>

        <div className="mt-6 w-full">
                      <UploadButton
            endpoint="avatarUploader"
            appearance={{
              button:
                "w-full rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-500 ut-ready:bg-indigo-600 ut-uploading:bg-indigo-700",
              container: "w-full",
              allowedContent: "hidden",
            }}
            content={{
              button({ ready }) {
                if (uploading) {
                  return (
                    <div className="flex items-center gap-2">

                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                      Uploading...

                    </div>
                  );
                }

                return ready
                  ? "Upload Avatar"
                  : "Loading...";
              },
            }}
            onUploadBegin={() => {

              setUploading(true);

            }}
            onClientUploadComplete={(res) => {

              setUploading(false);

              if (!res.length) {

                toast.error(
                  "Upload failed."
                );

                return;

              }

              onChange(
                res[0].ufsUrl
              );

              toast.success(
                "Avatar uploaded successfully."
              );

            }}
            onUploadError={(error) => {

              setUploading(false);

              toast.error(
                error.message
              );

            }}
          />

          {value && (

            <button

              type="button"

              onClick={() => {

                onChange("");

                toast.success(
                  "Avatar removed."
                );

              }}

              className="
                mt-4
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                px-4
                py-3
                text-red-300
                transition
                hover:bg-red-500/20
              "

            >

              <Trash2
                size={18}
              />

              Remove Avatar

            </button>

          )}

        </div>

      </div>

    </div>

  );

}