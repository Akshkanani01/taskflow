import { z } from "zod";

export const languageOptions = [
  "en",
  "gu",
] as const;

export const dateFormatOptions = [
  "DD/MM/YYYY",
  "MM/DD/YYYY",
  "YYYY-MM-DD",
] as const;

export const timeFormatOptions = [
  "12",
  "24",
] as const;

export const weekStartsOnOptions = [
  "MONDAY",
  "SUNDAY",
] as const;

export const generalSettingsSchema = z.object({
  language: z.enum(languageOptions, {
    error: "Invalid language.",
  }),

  timeZone: z
    .string()
    .trim()
    .min(1, "Time zone is required.")
    .max(100, "Invalid time zone."),

  dateFormat: z.enum(dateFormatOptions, {
    error: "Invalid date format.",
  }),

  timeFormat: z.enum(timeFormatOptions, {
    error: "Invalid time format.",
  }),

  weekStartsOn: z.enum(weekStartsOnOptions, {
    error: "Invalid week start value.",
  }),

  compactMode: z.coerce.boolean(),

  autoSave: z.coerce.boolean(),
});

export type GeneralSettingsInput = z.infer<
  typeof generalSettingsSchema
>;