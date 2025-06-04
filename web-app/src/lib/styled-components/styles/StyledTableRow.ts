import { styled } from 'styled-components'

import Styled from './Styled'

/**
 * BaseTableRow
 * @styled-component
 */
const StyledTableRow = styled(Styled)`
  align-items: center;
  border-bottom: 1px solid var(--color-secondary);
  display: flex;
  justify-content: center;
  transition:
    opacity,
    top,
    background-color 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
  &:nth-child(odd) {
    background-color: var(--color-tertiary);
  }
  &.head {
    background-color: transparent;
    border-bottom: 2px solid var(--color-primary);
    z-index: 1;
    max-height: 3.5em;
  }
  &.head.scrolling {
    background-color: var(--color-bg);
    box-shadow: var(--box-shadow-hight) var(--color-dark);
    cursor: default;
    opacity: 0.95;
    position: sticky;
    top: 0;
  }
  &.xs {
    height: 2em;
  }
  &.sm {
    height: 3em;
  }
  &.md {
    height: 4em;
  }
  &.lg {
    height: 7em;
  }
  &.xl {
    height: 10em;
  }
`

export default StyledTableRow
