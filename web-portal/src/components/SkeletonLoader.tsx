"use client";
import Skeleton from "react-loading-skeleton";

import { toStyle } from "~lib/styled-components";
import { DefaultProps } from "~utils/type.utils";

import "react-loading-skeleton/dist/skeleton.css";

type SkeletonType = DefaultProps & {
  count?: number;
};

/**
 * SkeletonLoader
 * @description
 * Default component inline loader
 *
 */
function SkeletonLoader(props: SkeletonType) {
  const { className, style, count, flexStyle } = props;
  const width = document.body.clientWidth;

  const cssResult = !flexStyle ? {} : flexStyle;
  const {
    xs = {},
    sm = {},
    md = {},
    lg = {},
    xl = {},
    ...defaultCSS
  } = cssResult;

  let customStyle = toStyle(cssResult, width);

  return (
    <Skeleton
      className={className}
      count={count}
      style={{ ...style, ...defaultCSS, ...customStyle }}
    />
  );
}
export default SkeletonLoader;
