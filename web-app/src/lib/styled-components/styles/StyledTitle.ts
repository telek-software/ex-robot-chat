import { styled } from 'styled-components'

import Styled from './Styled'

/**
 * StyledTitle
 * @styled-components
 */
const StyledTitle = styled(Styled)<{ as?: string }>`
  color: var(--bg-text-color);
  margin: 0 0 0.5em;
  padding: 0.5em;
  &.no-space {
    margin: unset;
    padding: unset;
  }
`

export default StyledTitle
