import { FunctionComponent, ReactNode } from 'react'

import { StyledDropdown } from '~lib/styled-components'
import { DefaultProps } from '~utils/type.utils'

import Icon, { IconNameType } from './Icon'
import Link from './Link'

type DropdownType = Omit<DefaultProps, 'children'> & {
  label?: string
  icon?: IconNameType
  children: (
    v: FunctionComponent<
      DefaultProps & { href?: string; onClick?: () => void }
    >,
  ) => ReactNode
}

/**
 * Dropdown
 * @component
 * @description
 * This is a render function to display customable sub items
 */
function Dropdown(props: DropdownType) {
  const { children, icon, flexStyle, label, ...rest } = props
  return (
    <StyledDropdown {...rest} $responsive={flexStyle}>
      <Link className="dropbtn">
        <span>
          {!!icon && <Icon name={icon} size="2rem" />}
          {label}
        </span>
        <Icon name="ExpandMore" size="2rem" />
      </Link>
      <div className="dropdown-content">
        {children((p) => (
          <a className="options" {...p} />
        ))}
      </div>
    </StyledDropdown>
  )
}

export default Dropdown
