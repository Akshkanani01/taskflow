"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  AccentColor,
  InterfaceDensity,
  ThemeMode,
} from "@prisma/client";

import { updateUserPreferences } from "@/app/actions/preferences/update-user-preferences";

type ResolvedTheme =
  | "light"
  | "dark";

type ThemeContextType = {
  theme: ThemeMode;
  resolvedTheme: ResolvedTheme;

  accentColor: AccentColor;
  interfaceDensity: InterfaceDensity;
  reducedMotion: boolean;

  isUpdating: boolean;

  setTheme: (
    theme: ThemeMode
  ) => Promise<void>;

  setAccentColor: (
    color: AccentColor
  ) => Promise<void>;

  setInterfaceDensity: (
    density: InterfaceDensity
  ) => Promise<void>;

  setReducedMotion: (
    enabled: boolean
  ) => Promise<void>;
};

const ThemeContext =
  createContext<ThemeContextType | null>(
    null
  );

function getSystemTheme(): ResolvedTheme {
  if (
    typeof window ===
    "undefined"
  ) {
    return "dark";
  }

  return window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches
    ? "dark"
    : "light";
}

function resolveTheme(
  theme: ThemeMode
): ResolvedTheme {
  if (theme === ThemeMode.SYSTEM) {
    return getSystemTheme();
  }

  return theme === ThemeMode.DARK
  ? "dark"
  : "light";
}

function applyTheme(
  theme: ResolvedTheme
) {
  const html =
    document.documentElement;

  html.classList.remove(
    "light",
    "dark"
  );

  html.classList.add(theme);

  html.dataset.theme = theme;

  html.style.colorScheme =
    theme;
}

type ThemeProviderProps = {
  children: ReactNode;

  initialTheme?: ThemeMode;

  initialAccentColor?: AccentColor;

  initialInterfaceDensity?: InterfaceDensity;

  initialReducedMotion?: boolean;
};

export function ThemeProvider({
  children,
  initialTheme = ThemeMode.SYSTEM,
  initialAccentColor = AccentColor.BLUE,
  initialInterfaceDensity = InterfaceDensity.COMFORTABLE,
  initialReducedMotion = false,
}: ThemeProviderProps) {
  const [
    theme,
    setThemeState,
  ] = useState(initialTheme);

  const [
    resolvedTheme,
    setResolvedTheme,
  ] = useState<ResolvedTheme>(
    resolveTheme(initialTheme)
  );

  const [
  accentColor,
  setAccentColorState,
] = useState<AccentColor>(
  initialAccentColor
);

  const [
  interfaceDensity,
  setInterfaceDensityState,
] =
  useState<InterfaceDensity>(
    initialInterfaceDensity
  );

  const [
  reducedMotion,
  setReducedMotionState,
] = useState<boolean>(
  initialReducedMotion
);

  const [
    isUpdating,
    setIsUpdating,
  ] = useState(false);

  const previousTheme =
    useRef(theme);

  const previousAccent =
    useRef(accentColor);

  const previousDensity =
    useRef(
      interfaceDensity
    );

  const previousMotion =
    useRef(
      reducedMotion
    );
      const syncTheme =
    useCallback(
      async (
        next: ThemeMode
      ) => {
        previousTheme.current =
          theme;

        setThemeState(next);

        const resolved =
          resolveTheme(next);

        setResolvedTheme(
          resolved
        );

        applyTheme(
          resolved
        );

        setIsUpdating(
          true
        );

        try {
          await updateUserPreferences(
            {
              theme: next,
            }
          );
        } catch {
          setThemeState(
            previousTheme.current
          );

          const rollback =
            resolveTheme(
              previousTheme.current
            );

          setResolvedTheme(
            rollback
          );

          applyTheme(
            rollback
          );
        } finally {
          setIsUpdating(
            false
          );
        }
      },
      [theme]
    );

  const syncAccentColor =
    useCallback(
      async (
        color: AccentColor
      ) => {
        previousAccent.current =
          accentColor;

        setAccentColorState(
          color
        );

        setIsUpdating(
          true
        );

        try {
          await updateUserPreferences(
            {
              accentColor:
                color,
            }
          );
        } catch {
          setAccentColorState(
            previousAccent.current
          );
        } finally {
          setIsUpdating(
            false
          );
        }
      },
      [accentColor]
    );

  const syncDensity =
    useCallback(
      async (
        density: InterfaceDensity
      ) => {
        previousDensity.current =
          interfaceDensity;

        setInterfaceDensityState(
          density
        );

        setIsUpdating(
          true
        );

        try {
          await updateUserPreferences(
            {
              interfaceDensity:
                density,
            }
          );
        } catch {
          setInterfaceDensityState(
            previousDensity.current
          );
        } finally {
          setIsUpdating(
            false
          );
        }
      },
      [interfaceDensity]
    );

  const syncReducedMotion =
    useCallback(
      async (
        enabled: boolean
      ) => {
        previousMotion.current =
          reducedMotion;

        setReducedMotionState(
          enabled
        );

        setIsUpdating(
          true
        );

        try {
          await updateUserPreferences(
            {
              reducedMotion:
                enabled,
            }
          );
        } catch {
          setReducedMotionState(
            previousMotion.current
          );
        } finally {
          setIsUpdating(
            false
          );
        }
      },
      [reducedMotion]
    );
      useEffect(() => {
    const resolved =
      resolveTheme(theme);

    setResolvedTheme(
      resolved
    );

    applyTheme(
      resolved
    );

    if (
      theme !==
      ThemeMode.SYSTEM
    ) {
      return;
    }

    const media =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

    const listener = () => {
      const system =
        getSystemTheme();

      setResolvedTheme(
        system
      );

      applyTheme(
        system
      );
    };

    media.addEventListener(
      "change",
      listener
    );

    return () =>
      media.removeEventListener(
        "change",
        listener
      );
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.accent =
      accentColor.toLowerCase();
  }, [accentColor]);

  useEffect(() => {
    document.documentElement.dataset.density =
      interfaceDensity.toLowerCase();
  }, [interfaceDensity]);

  useEffect(() => {
    document.documentElement.dataset.motion =
      reducedMotion
        ? "reduced"
        : "normal";
  }, [reducedMotion]);

  const value =
    useMemo(
      () => ({
        theme,
        resolvedTheme,

        accentColor,
        interfaceDensity,
        reducedMotion,

        isUpdating,

        setTheme:
          syncTheme,

        setAccentColor:
          syncAccentColor,

        setInterfaceDensity:
          syncDensity,

        setReducedMotion:
          syncReducedMotion,
      }),
      [
        theme,
        resolvedTheme,

        accentColor,
        interfaceDensity,
        reducedMotion,

        isUpdating,

        syncTheme,
        syncAccentColor,
        syncDensity,
        syncReducedMotion,
      ]
    );

  return (
    <ThemeContext.Provider
      value={value}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context =
    useContext(
      ThemeContext
    );

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider."
    );
  }

  return context;
}