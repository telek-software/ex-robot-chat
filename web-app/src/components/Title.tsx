import { ResponsiveStyle, StyledTitle } from '~lib/styled-components'
import { DefaultProps } from '~utils/type.utils'

type TitleType = DefaultProps & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'b' | 'strong'
  flexStyle?: ResponsiveStyle
}

/**
 * Title
 * @component
 * @description
 * Main Component for titles
 */
function Title(props: TitleType) {
  const { as = 'h1', children, className, flexStyle } = props
  return (
    <StyledTitle as={as} className={className} $responsive={flexStyle}>
      {children}
    </StyledTitle>
  )
}
export default Title
