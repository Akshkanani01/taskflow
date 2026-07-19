"use server";

import { headers } from "next/headers";

import { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name cannot exceed 100 characters."),
});

export type UpdateProfileState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
  };
  user?: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
};

export async function updateProfile(
  _: UpdateProfileState,
  formData: FormData
): Promise<UpdateProfileState> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  const parsed = updateProfileSchema.safeParse({
    name: formData.get("name"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: parsed.data.name,
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
      message: "Profile updated successfully.",
      user,
    };
  } catch (error) {
    console.error("Update Profile Error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}