import { CSSProperties } from "react";
import { Interpolation } from "styled-components/dist/types";

export enum ThemeKeys {
  defaultTheme = "defaultTheme",
}

export type ScreenTarget = "xs" | "sm" | "md" | "lg" | "xl";

export type ScreenTargetCSS = Partial<Record<ScreenTarget, CSSProperties>>;

export type ResponsiveStyle = CSSProperties & ScreenTargetCSS;

export type InterpoledCSS = Partial<Interpolation<CSSProperties>>;

export interface ThemeInterface {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
    bg: string;
    fg: string;
    disabled: string;
    info: string;
    success: string;
    warning: string;
    danger: string;
    bg_info: string;
    bg_warning: string;
    bg_success: string;
    bg_danger: string;
  };
  radius: string;
  boxShadow: {
    low: string;
    hight: string;
  };
}
