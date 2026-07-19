"use server";

import { headers } from "next/headers";

import { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  image: z
    .string()
    .url("Invalid image URL.")
    .max(2048),
});

export type UpdateAvatarState = {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
};

export async function updateAvatar(
  _: UpdateAvatarState,
  formData: FormData
): Promise<UpdateAvatarState> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  const parsed = schema.safeParse({
    image: formData.get("image"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Invalid image.",
    };
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: parsed.data.image,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    return {
      success: true,
      message: "Profile photo updated.",
      user,
    };
  } catch (error) {
    console.error("Update Avatar Error:", error);

    return {
      success: false,
      message: "Unable to update profile photo.",
    };
  }
}