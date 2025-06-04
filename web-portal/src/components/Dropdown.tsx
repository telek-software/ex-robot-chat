import { StyledDropdown } from "~lib/styled-components";
import { DefaultProps, RenderProps } from "~utils/type.utils";

import Icon, { IconNameType } from "./Icon";
import Link from "./Link";

type DropdownContentType = DefaultProps & {
  href?: string;
  onClick?: () => void;
};

type DropdownType = RenderProps<DropdownContentType> & {
  label?: string;
  icon?: IconNameType;
};

/**
 * Dropdown
 * @component
 * @description
 * This is a render function to display customable sub items
 */
function Dropdown(props: DropdownType) {
  const { children, icon, label, ...rest } = props;
  return (
    <StyledDropdown {...rest}>
      <Link className="dropbtn">
        <span>
          {!!icon && <Icon name={icon} size="1.2em" />}
          {label}
        </span>
        <Icon name="ExpandMore" size="1rem" />
      </Link>
      <div className="dropdown-content">
        {children((p) => (
          <a className="options" {...p} />
        ))}
      </div>
    </StyledDropdown>
  );
}

export default Dropdown;
