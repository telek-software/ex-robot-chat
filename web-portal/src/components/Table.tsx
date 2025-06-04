import React, { CSSProperties, ForwardedRef, forwardRef } from "react";

import { StyledTable } from "~lib/styled-components";
import { DefaultProps } from "~utils/type.utils";

type TableProps = DefaultProps & {
  maxHeight?: CSSProperties["maxHeight"];
};

/**
 * Table
 * @component
 * @description
 * Used for Tables, must be used with TableRow and TableRowItem
 * @see See src/components/TableRow
 * @see See src/components/TableRowItem
 */
function Table(props: TableProps, ref?: ForwardedRef<HTMLDivElement>) {
  const {
    children,
    testId,
    className,
    flexStyle,
    id,
    maxHeight = "30em",
  } = props;

  return (
    <StyledTable
      id={id}
      data-testid={testId}
      className={className}
      ref={ref}
      style={{ maxHeight }}
      $responsive={flexStyle}
    >
      {children}
    </StyledTable>
  );
}

export default forwardRef(Table);
