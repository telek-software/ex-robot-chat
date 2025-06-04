"use client";

import { ReactNode, useContext, useMemo, useState } from "react";
import { DefaultTheme, ThemeContext, ThemeProvider } from "styled-components";

import initTheme from "./theme";
import { ThemeInterface } from "./type";

export type ThemeContextInterface = ThemeInterface & {
  switchToDefault: () => void;
};

/**
 * StyledProvider
 * @context
 * @description
 * The Theme Manager
 */
function StyledProvider(props: { children: ReactNode }) {
  const { children } = props;
  const initialTheme = initTheme();

  const [theme, setTheme] = useState<DefaultTheme>(initialTheme);

  const value: ThemeContextInterface = useMemo(
    () => ({
      colors: theme.colors,
      radius: theme.radius,
      boxShadow: theme.boxShadow,
      switchToDefault() {
        const nextTheme = initTheme();
        setTheme(nextTheme);
      },
    }),
    [theme]
  );
  return <ThemeProvider theme={value}>{children}</ThemeProvider>;
}

export default StyledProvider;

/** @hook */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useTheme must be called inside StyledProvider");
  return context;
};
