"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CurrentUser = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
};

type CurrentUserContextValue = {
  user: CurrentUser;
  setUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
  updateUser: (user: Partial<CurrentUser>) => void;
};

const CurrentUserContext =
  createContext<CurrentUserContextValue | null>(null);

type Props = {
  initialUser: CurrentUser;
  children: ReactNode;
};

export function CurrentUserProvider({
  initialUser,
  children,
}: Props) {
  const [user, setUser] = useState<CurrentUser>(initialUser);

  const updateUser = useCallback(
    (data: Partial<CurrentUser>) => {
      setUser((previous) => ({
        ...previous,
        ...data,
      }));
    },
    []
  );

  const value = useMemo(
    () => ({
      user,
      setUser,
      updateUser,
    }),
    [user, updateUser]
  );

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  const context = useContext(CurrentUserContext);

  if (!context) {
    throw new Error(
      "useCurrentUser must be used within CurrentUserProvider."
    );
  }

  return context;
}