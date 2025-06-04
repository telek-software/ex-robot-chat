import { styled } from 'styled-components'

import Styled from './Styled'

/**
 * StyledTable
 * @component
 */
const StyledTable = styled(Styled)`
  border: 1px solid var(--bg-color);
  border-radius: 4px;
  box-shadow: 0 0 2px -1px var(--bg-text-color) inset;
  display: inline-block;
  min-height: 6em;
  min-width: 2em;
  overflow: hidden auto;
  padding: 0em;
  position: relative;
`

export default StyledTable
