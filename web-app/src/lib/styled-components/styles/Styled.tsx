import { styled } from 'styled-components'

import { toStylesheet } from '../mediaQueries'
import { ResponsiveStyle } from '../type'

type Responsive = { $responsive?: ResponsiveStyle }

/**
 * Styled
 * @styled-components
 *  $responsive = {
 *    fontSize: "2em",
 *    width: "40px",
 *    md: {
 *      // for medium screens (and more)
 *      width: "50px"
 *    },
 *    lg: {
 *      // for large screens (and more)
 *      width: "60px"
 *    }
 *  }
 */
const Styled = styled.div<Responsive>`
  color: var(--bg-text-color);
  display: flex;
  text-decoration: none;
  &:visited {
    color: var(--bg-text-color);
  }
  &&& {
    ${({ $responsive }) => toStylesheet($responsive) ?? ''}
  }
`

export default Styled
