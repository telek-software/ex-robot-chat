import { styled } from 'styled-components'

import { media } from '../mediaQueries'

import Styled from './Styled'

/**
 * StyledTableRowItem
 * @component
 */
const StyledTableRowItem = styled(Styled)`
  align-items: center;
  box-shadow: -1px 0 4px -2px var(--color-primary);
  display: flex;
  height: 100%;
  justify-content: flex-start;
  min-width: 3em;
  overflow-x: auto;
  padding: 4px;
  text-overflow: ellipsis;
  &:first-child {
    border-left: none;
  }
  &.head {
    cursor: text;
    font-weight: bold;
    justify-content: center;
    column-gap: 4px;
  }
  &.center {
    justify-content: center;
  }
  &.clickable {
    cursor: pointer;
  }
  &.xs {
    width: 4em;
  }
  &.sm {
    width: 6em;
  }
  &.md {
    width: 8em;
  }
  &.lg {
    width: 10em;
  }
  &.xl {
    width: 12em;
  }
  ${media.xl} {
    &.xs {
      width: 6em;
    }
    &.sm {
      width: 9em;
    }
    &.md {
      width: 13em;
    }
    &.lg {
      width: 18em;
    }
    &.xl {
      width: 24em;
    }
  }
`

export default StyledTableRowItem
