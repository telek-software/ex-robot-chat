import { CSSProperties } from 'react'
import { styled } from 'styled-components'

import Styled from './Styled'

type SVGDiv = {
  background: CSSProperties['background']
  src: string
}

/**
 * StyledSVG
 * @description
  Modifier for the svg, it does apply a new color based on the background property
 *
 */
const StyledSVG = styled(Styled).attrs<SVGDiv>(
  ({ background, src, style }) => ({
    style: {
      WebkitMask: `url("${src}") no-repeat center / contain`,
      mask: `url("${src}") no-repeat center / contain`,
      background,
      ...style,
    },
  }),
)``
export default StyledSVG
