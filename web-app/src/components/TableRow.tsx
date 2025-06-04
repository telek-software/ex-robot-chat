import { ResponsiveStyle, StyledTableRow } from '~lib/styled-components'
import { enClassname } from '~utils/dom.utils'
import { Size } from '~utils/enum.utils'
import { keysToString } from '~utils/object.utils'
import { DefaultProps } from '~utils/type.utils'

type TableRowtype = DefaultProps & {
  head?: boolean
  flexStyle?: ResponsiveStyle
  isScrolling?: boolean
  size?: Size
}

/**
 * TableRow
 * @component
 * @description
 * A row in a Table
 */
function TableRow(props: TableRowtype) {
  const {
    children,
    className,
    flexStyle,
    head = false,
    id,
    isScrolling = false,
    size = Size.md,
  } = props

  const keys = keysToString({ head, scrolling: isScrolling }).split(' ')
  const classed = enClassname([...keys, size], className)

  return (
    <StyledTableRow id={id} className={classed} $responsive={flexStyle}>
      {children}
    </StyledTableRow>
  )
}

export default TableRow
