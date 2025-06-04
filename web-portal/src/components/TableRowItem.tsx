import { StyledTableRowItem } from "~lib/styled-components";
import { enClassname } from "~utils/dom.utils";
import { Size } from "~utils/enum.utils";
import { keysToString } from "~utils/object.utils";
import { DefaultProps } from "~utils/type.utils";

type TableRowItemType = DefaultProps & {
  center?: boolean;
  head?: boolean;
  size?: Size;
};

/**
 * TableRowItem
 * @component
 * @description
 * A table case
 */
function TableRowItem(props: TableRowItemType) {
  const {
    center = false,
    children,
    className,
    flexStyle,
    id,
    head = false,
    size = Size.md,
  } = props;

  const classed = enClassname(
    [size, ...keysToString({ head, center }).split(" ")],
    className
  );

  return (
    <StyledTableRowItem id={id} className={classed} $responsive={flexStyle}>
      {children}
    </StyledTableRowItem>
  );
}

export default TableRowItem;
