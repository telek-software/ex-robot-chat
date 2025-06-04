"use client";

import { useRef, useState } from "react";

import { StyledCollapse } from "~lib/styled-components";
import { DefaultProps } from "~utils/type.utils";

type CollapseType = DefaultProps & {
  label: string;
};

/**
 * Collapse
 * @components
 * @description
 * Collapse content to preserve space
 */
function Collapse(props: CollapseType) {
  const { className, children, flexStyle, label } = props;
  const [isCollapsed, setCollapseState] = useState(false);
  const toggleCollapse = () => setCollapseState(!isCollapsed);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <StyledCollapse className={className} $responsive={flexStyle}>
      <button
        className="btn-collapse"
        type="button"
        onClick={() => toggleCollapse()}
      >
        {label}
      </button>
      <div
        ref={ref}
        style={{
          maxHeight: isCollapsed ? `${ref?.current?.clientHeight || 100}px` : 0,
        }}
        className="content"
      >
        {children}
      </div>
    </StyledCollapse>
  );
}
export default Collapse;
