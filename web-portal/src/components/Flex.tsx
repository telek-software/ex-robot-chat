import { ForwardedRef, forwardRef } from "react";

import { ResponsiveStyle, Styled, StyledElement } from "~lib/styled-components";
import { DefaultProps } from "~utils/type.utils";

type FlexType = DefaultProps & {
  as?: StyledElement;
  flexStyle?: ResponsiveStyle;
  href?: string;
};

/**
 * Flex
 * @component
 * @description
 * Simple and fast implementation of a Flexible component
 * (NB: "flexStyle" is a mobile first improved styling)
 * @example
 *   <Flex
 *      as="section"
 *      flexStyle={{
 *        fontSize: "2em",
 *        md: { width: "50px" }, // for medium screens (and plus)
 *      }
 *   />
 */
function Flex(props: FlexType, ref?: ForwardedRef<HTMLDivElement>) {
  const { as, children, className, flexStyle, id, href, style, testId } = props;

  return (
    <Styled
      as={as}
      $responsive={flexStyle}
      className={className}
      data-testid={testId}
      href={href}
      id={id}
      ref={ref}
      style={style}
    >
      {!href ? (
        children
      ) : (
        <Styled as="a" href={href}>
          {children}
        </Styled>
      )}
    </Styled>
  );
}

export default forwardRef(Flex);
