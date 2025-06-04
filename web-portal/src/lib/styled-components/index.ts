"use client";
import { styled } from "styled-components";

export type StyledElement = keyof typeof styled;

export { default as GlobalStyle } from "./GlobalStyle";
export { default as StyledRegistry } from "./StyledRegistry";

/* ********************** */
/* styled components part */
/* ********************** */
export { default as Styled } from "./styles/Styled";
export {
  default as StyledBreadcrumb,
  StyledBreadItem,
} from "./styles/StyledBreadcrumb";
export { default as StyledButton } from "./styles/StyledButton";
export { default as StyledCard } from "./styles/StyledCard";
export { default as StyledCollapse } from "./styles/StyledCollapse";
export { default as StyledDragAndDrop } from "./styles/StyledDragAndDrop";
export { default as StyledDropdown } from "./styles/StyledDropdown";
export { default as StyledFieldset } from "./styles/StyledFieldset";
export { default as StyledForm } from "./styles/StyledForm";
export { default as StyledInput } from "./styles/StyledInput";
export { Linkable, default as StyledLink } from "./styles/StyledLink";
export { default as StyledLoader } from "./styles/StyledLoader";
export { default as StyledMenu, StyledMenuBtn } from "./styles/StyledMenu";
export {
  default as StyledSlide,
  StyledSlideContent,
} from "./styles/StyledSlide";
export { default as StyledSVG } from "./styles/StyledSVG";
export { default as StyledTable } from "./styles/StyledTable";
export { default as StyledTableRow } from "./styles/StyledTableRow";
export { default as StyledTableRowItem } from "./styles/StyledTableRowItem";
export { default as StyledTitle } from "./styles/StyledTitle";

/* ********************** */
/* ********************** */
export { media, targetWidth, toStyle, toStylesheet } from "./mediaQueries";
export { default as StyledProvider, useTheme } from "./StyledProvider";
export { getDefaultTheme, default as initTheme } from "./theme";
export type { ResponsiveStyle, ThemeInterface, ThemeKeys } from "./type";
