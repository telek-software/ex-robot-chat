"use client";
import { createContext, useEffect, useMemo, useState } from "react";

import { DefaultProps } from "~utils/type.utils";

type UserType = {
  firstname: string;
  lastname: string;
};

type AuthContextType = { user?: UserType; setUser: (user: UserType) => void };
const AuthContext = createContext<AuthContextType | null>(null);

/**
 * AuthProvider
 * @context
 */
function AuthProvider(props: DefaultProps) {
  const { children } = props;
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    setUser({ firstname: "Madeleine", lastname: "Elster" });
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
