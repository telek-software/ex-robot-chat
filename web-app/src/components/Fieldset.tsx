import { ResponsiveStyle, StyledFieldset } from '~lib/styled-components'
import { enClassname } from '~utils/dom.utils'
import { DefaultProps } from '~utils/type.utils'

type FieldsetProps = DefaultProps & {
  legend?: string
  flexStyle?: ResponsiveStyle
  position?: 'left' | 'right' | 'center'
  direction?: 'row' | 'column'
}

/**
 * Fieldset
 * @component
 */
function Fieldset(props: FieldsetProps) {
  const {
    children,
    className,
    flexStyle,
    id,
    legend,
    position = 'left',
    direction = 'column',
  } = props

  const propsClass = enClassname([position, direction], className)

  return (
    <StyledFieldset id={id} className={propsClass} $responsive={flexStyle}>
      {legend && <legend className="legend">{legend}</legend>}
      <div className="fieldset-content">{children}</div>
    </StyledFieldset>
  )
}

export default Fieldset
