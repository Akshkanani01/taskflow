import "./globals.css";

import type { Metadata } from "next";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import {
  AccentColor,
  InterfaceDensity,
  ThemeMode,
} from "@prisma/client";

import { ThemeProvider } from "@/components/providers/theme-provider";

export const metadata: Metadata = {
  title: "TaskFlow",
  description:
    "Enterprise Project Management",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let initialTheme: ThemeMode =
  ThemeMode.SYSTEM;

  let initialAccentColor: AccentColor =
  AccentColor.BLUE;

let initialInterfaceDensity: InterfaceDensity =
  InterfaceDensity.COMFORTABLE;

  let initialReducedMotion =
    false;

  const session =
    await auth.api.getSession({
      headers: await headers(),
    });

  if (session?.user) {
    const preferences =
      await prisma.userPreference.findUnique(
        {
          where: {
            userId:
              session.user.id,
          },
          select: {
            theme: true,
            accentColor: true,
            interfaceDensity: true,
            reducedMotion: true,
          },
        }
      );

    if (preferences) {
      initialTheme =
        preferences.theme ??
        initialTheme;

      initialAccentColor =
        preferences.accentColor ??
        initialAccentColor;

      initialInterfaceDensity =
        preferences.interfaceDensity ??
        initialInterfaceDensity;

      initialReducedMotion =
        preferences.reducedMotion ??
        initialReducedMotion;
    }
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          initialTheme={
            initialTheme
          }
          initialAccentColor={
            initialAccentColor
          }
          initialInterfaceDensity={
            initialInterfaceDensity
          }
          initialReducedMotion={
            initialReducedMotion
          }
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}