"use server";

import { revalidatePath } from "next/cache";

import {
  AccentColor,
  InterfaceDensity,
  ThemeMode,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

type UpdateUserPreferencesInput = {
  theme?: ThemeMode;
  accentColor?: AccentColor;
  interfaceDensity?: InterfaceDensity;
  reducedMotion?: boolean;

  language?: string;
  timeZone?: string;
  dateFormat?: string;
  timeFormat?: string;
  weekStartsOn?: string;
  compactMode?: boolean;
  autoSave?: boolean;
};

export async function updateUserPreferences(
  data: UpdateUserPreferencesInput
) {
  const user = await getCurrentUser();

  await prisma.userPreference.upsert({
    where: {
      userId: user.id,
    },
    update: data,
    create: {
      userId: user.id,
      ...data,
    },
  });

  revalidatePath("/");
}