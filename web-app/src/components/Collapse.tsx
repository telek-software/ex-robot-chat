import { useRef, useState } from 'react'

import { ResponsiveStyle, StyledCollapse } from '~lib/styled-components'
import { DefaultProps } from '~utils/type.utils'

import Icon from './Icon'

type CollapseType = DefaultProps & {
  label: string
  flexStyle?: ResponsiveStyle
}

/**
 * Collapse
 * @components
 * @description
 * Collapse content to preserve space
 */
function Collapse(props: CollapseType) {
  const { className, children, flexStyle, label } = props
  const [isCollapsed, setCollapseState] = useState(false)
  const toggleCollapse = () => setCollapseState(!isCollapsed)
  const ref = useRef<HTMLDivElement>(null)
  return (
    <StyledCollapse className={className} $responsive={flexStyle}>
      <button
        className="btn-collapse"
        type="button"
        onClick={() => toggleCollapse()}>
        {isCollapsed ? (
          <Icon name="ArrowCircleUp" size="1.3rem" />
        ) : (
          <Icon name="ArrowCircleDown" size="1.3rem" />
        )}
        {label}
      </button>
      <div
        ref={ref}
        style={{
          height: isCollapsed ? `${ref?.current?.clientHeight || 100}px` : 0,
          padding: isCollapsed ? '1px 8px' : '0px 0px',
        }}
        className="content">
        {children}
      </div>
    </StyledCollapse>
  )
}
export default Collapse
