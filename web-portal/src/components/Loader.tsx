"use client";

import { StyledLoader } from "~lib/styled-components";
import { DefaultProps } from "~utils/type.utils";

type LoaderType = DefaultProps;

/**
 * Loader
 * @component
 * @description
 * The main loading component
 *
 */
function Loader(props: LoaderType) {
  const { className, flexStyle, id, style } = props;
  return (
    <StyledLoader
      id={id}
      className={className}
      style={style}
      $responsive={flexStyle}
    >
      <div className="loader" />
    </StyledLoader>
  );
}
export default Loader;
