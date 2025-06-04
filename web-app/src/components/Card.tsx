import { Linkable, ResponsiveStyle, StyledCard } from '~lib/styled-components'
import { DefaultProps } from '~utils/type.utils'

type CardType = DefaultProps & {
  href?: string
  flexStyle?: ResponsiveStyle
  title?: string
  height?: string
  width?: string
}

/**
 * Card
 * @component
 */
function Card(props: CardType) {
  const { children, className, href, id, style, ...rest } = props
  const { height, width, flexStyle } = rest
  const styl = { ...style, height, width }
  return (
    <Linkable link={href}>
      <StyledCard
        id={id}
        $responsive={flexStyle}
        className={className}
        style={styl}>
        {children}
      </StyledCard>
    </Linkable>
  )
}

export default Card
