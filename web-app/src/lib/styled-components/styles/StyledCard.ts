import { styled } from 'styled-components'

import Styled from './Styled'

/**
 * StyledCard
 * @styled-component
 */
const StyledCard = styled(Styled)`
  align-items: center;
  border-radius: 2em;
  color: var(--bg-text-color);
  display: flex;
  flex-direction: column;
  height: 250px;
  justify-content: center;
  padding: 1rem;
  row-gap: 1rem;
  width: 260px;
  &.clickable {
    cursor: pointer;
  }
  &.clickable:hover {
    transform: scale(0.96);
    transition: all 0.2s;
  }
  &.clickable:active {
    opacity: 0.7;
  }
`
export default StyledCard
