import { FunctionComponent, useState } from 'react'

import { DefaultProps } from '~utils/type.utils'

type CollapseType = Omit<DefaultProps, 'children'> & {
  label: string
  children: ({
    isCollapsed,
    toggleCollapse,
  }: {
    isCollapsed: boolean
    toggleCollapse: () => void
  }) => FunctionComponent
}

/**
 * CollapseContainer
 * @components
 * @description
 * Collapse content to preserve space
 */
function CollapseContainer(props: CollapseType) {
  const { children } = props
  const [isCollapsed, setCollapseState] = useState(false)
  const toggleCollapse = () => setCollapseState(!isCollapsed)
  return children({ isCollapsed, toggleCollapse })
}
export default CollapseContainer
