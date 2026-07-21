"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import {
  generalSettingsSchema,
} from "@/lib/validations/general-settings";

export type UpdateGeneralSettingsState = {
  success: boolean;
  title: string;
  message: string;

  errors?: {
    language?: string[];
    timeZone?: string[];
    dateFormat?: string[];
    timeFormat?: string[];
    weekStartsOn?: string[];
    compactMode?: string[];
    autoSave?: string[];
  };

  preferences?: {
    language: string;
    timeZone: string;
    dateFormat: string;
    timeFormat: string;
    weekStartsOn: string;
    compactMode: boolean;
    autoSave: boolean;
  };
};

export const initialGeneralSettingsState: UpdateGeneralSettingsState = {
  success: false,
  title: "",
  message: "",
};

export async function updateGeneralSettings(
  _: UpdateGeneralSettingsState,
  formData: FormData
): Promise<UpdateGeneralSettingsState> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return {
      success: false,
      title: "Unauthorized",
      message: "Please sign in again.",
    };
  }

  const parsed = generalSettingsSchema.safeParse({
    language: formData.get("language"),
    timeZone: formData.get("timeZone"),
    dateFormat: formData.get("dateFormat"),
    timeFormat: formData.get("timeFormat"),
    weekStartsOn: formData.get("weekStartsOn"),

    compactMode:
      formData.get("compactMode") === "on",

    autoSave:
      formData.get("autoSave") === "on",
  });

  if (!parsed.success) {
    return {
      success: false,
      title: "Validation Failed",
      message: "Please correct the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const {
    language,
    timeZone,
    dateFormat,
    timeFormat,
    weekStartsOn,
    compactMode,
    autoSave,
  } = parsed.data;

  try {
    const preferences =
  await prisma.userPreference.upsert({
    where: {
      userId: session.user.id,
    },
    create: {
      userId: session.user.id,
      language,
      timeZone,
      dateFormat,
      timeFormat,
      weekStartsOn,
      compactMode,
      autoSave,
    },
    update: {
      language,
      timeZone,
      dateFormat,
      timeFormat,
      weekStartsOn,
      compactMode,
      autoSave,
    },
    select: {
      language: true,
      timeZone: true,
      dateFormat: true,
      timeFormat: true,
      weekStartsOn: true,
      compactMode: true,
      autoSave: true,
    },
  });
    return {
      success: true,

      title: "Settings Updated",

      message:
        "Your general preferences have been updated successfully.",

      preferences,
    };
  } catch (error) {
    console.error(
      "Update General Settings Error:",
      error
    );

    return {
      success: false,

      title: "Update Failed",

      message:
        "Something went wrong while saving your settings.",
    };
  }
}