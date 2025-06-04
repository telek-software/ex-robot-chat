import {} from "styled-components/cssprop";

import "styled-components";

import { ThemeInterface } from "./type";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeInterface {}
}

declare module "react" {
  interface DomAttributes<T> {
    css?: CSSProp;
  }
}
