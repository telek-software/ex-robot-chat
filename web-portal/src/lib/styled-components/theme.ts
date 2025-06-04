"use client";

import { mergeDeepPartial } from "~utils/object.utils";
import { checkIsKeyof } from "~utils/typeGuard.utils";

import { ThemeInterface, ThemeKeys } from "./type";

/**
 * getDefaultTheme
 * @description
 * The default style theme, implement DefaultTheme
 * @see ./styled.d.ts for the interface definition
 */
export function getDefaultTheme(): ThemeInterface {
  return {
    colors: {
      primary: "#042c7e", // old #042c7e
      secondary: "#33d9f1", // old #b9dbd9
      tertiary: "#661A76",
      quaternary: "#fefefe",
      bg: "#eff0f4",
      fg: "#082537",
      disabled: "#96989f",
      info: "#035397",
      success: "#1C7947",
      warning: "#DD9A35",
      danger: "#A9333A",
      bg_info: "#cce5fa",
      bg_warning: "#fedec8",
      bg_success: "#d7e8df",
      bg_danger: "#fbc2c5",
    },
    radius: "8px",
    boxShadow: {
      low: "0px 0px 2px 0px",
      hight: "0px 0px 6px -1px",
    },
  };
}

/**
 * initThene()
 * @description
 * Launch the theme, search for a saved theme first.
 */
export default function initTheme(nextKey?: ThemeKeys): ThemeInterface {
  const themeStorageID = "themeStorageID";
  const themes = {
    [ThemeKeys.defaultTheme]: getDefaultTheme,
    // Add new theme here
  };
  if (nextKey) {
    const ChoosenTheme = themes[nextKey];

    if (typeof window !== "undefined")
      localStorage.setItem(themeStorageID, nextKey);
    return ChoosenTheme();
  }

  const loadedThemeKey =
    typeof window !== "undefined" ? localStorage.getItem(themeStorageID) : null;
  if (!loadedThemeKey || !checkIsKeyof(themes, loadedThemeKey))
    return getDefaultTheme();

  const ChoosenTheme = themes[loadedThemeKey];
  return ChoosenTheme();
}

/**
 * createTheme
 * @description
 * Theme Factory
 */
export function createTheme(
  themeData: Partial<ThemeInterface>
): ThemeInterface {
  const baseTheme = getDefaultTheme();
  const nextTheme = mergeDeepPartial<ThemeInterface>(baseTheme, themeData);
  return nextTheme;
}
