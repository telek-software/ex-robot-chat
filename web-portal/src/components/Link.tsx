import { MouseEvent } from "react";

import { Lang } from "~lib/i18n";
import { StyledLink } from "~lib/styled-components";
import { DefaultProps } from "~utils/type.utils";

type LinkType = DefaultProps & {
  onClick?: () => void;
  href?: string;
  locale?: Lang;
};

/**
 *Link
 @component
 * @description
 * Uses the native next link
 */
function Link(props: LinkType) {
  const { className, flexStyle, href, locale, children, onClick } = props;
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!!onClick) onClick();
  };
  return (
    <StyledLink
      lang={locale}
      href={href || ""}
      onClick={!!onClick ? handleClick : undefined}
      className={className}
      locale={locale}
      $responsive={flexStyle}
    >
      {children}
    </StyledLink>
  );
}
export default Link;
