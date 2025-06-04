import Link from "next/link";
import { styled } from "styled-components";

import { DefaultProps } from "~utils/type.utils";

import { media, toStylesheet } from "../mediaQueries";
import { ResponsiveStyle } from "../type";

const config = { shouldForwardProp: (p: string) => p !== "locale" };

const BaseLink = styled(Link)`
  color: currentColor;
  text-decoration: none;
`;

const StyledLink = styled(Link).withConfig(config)<{
  $responsive?: ResponsiveStyle;
}>`
  color: var(--bg-text-color);
  cursor: pointer;
  display: inline-block;

  text-decoration: none;
  &:active {
    opacity: 0.5;
  }
  &:hover {
    opacity: 0.7;
  }
  &.boxed {
    align-content: center;
    align-items: center;
    border-radius: 4px;
    box-shadow: 0px 0px 0px 1px var(--bg-text-color);
    display: inline-flex;
    font-weight: 600;
    padding: 0.4em 0.4em;
    justify-content: center;
    transition: box-shadow 0.2s;
  }
  &.boxed:hover {
    opacity: 0.8;
    transform: translateZ(1em);
    transition: all 0.3s;
  }
  ${media.xs} {
    &.boxed {
      padding: 0.4em 1em;
    }
  }
  &&& {
    ${({ $responsive }) => toStylesheet($responsive) ?? ""}
  }
`;

export default StyledLink;

type LinkableType = DefaultProps & { link?: string };

/**
 * Linkable
 * @description
 * Allow to turn any component into link
 */
export function Linkable(props: LinkableType) {
  const { link, children } = props;
  if (!link) return <>{children}</>;
  return <BaseLink href={link}>{children}</BaseLink>;
}
