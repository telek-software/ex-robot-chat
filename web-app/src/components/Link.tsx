import { Link as Ln } from 'react-router-dom'

import { ResponsiveStyle, StyledLink } from '~lib/styled-components'
import { DefaultProps } from '~utils/type.utils'

type LinkType = DefaultProps & {
  flexStyle?: ResponsiveStyle
  href?: string
}

/**
 *Link
 @component
 * @description
 */
function Link(props: LinkType) {
  const { className, flexStyle, href, children } = props

  return (
    <StyledLink
      as={Ln}
      href={href || '#'}
      to={href || '#'}
      className={className}
      $responsive={flexStyle}>
      {children}
    </StyledLink>
  )
}
export default Link
