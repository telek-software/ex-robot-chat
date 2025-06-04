import { styled } from 'styled-components'

import Styled from './Styled'

export const StyledBreadItem = styled(Styled).attrs(() => ({ as: 'li' }))`
  display: inline;
  font-weight: bold;
  &:not(:nth-child(1)):before {
    content: '\\02c3';
    padding: 0 8px;
  }
  a {
    color: var(--color-disabled);
    cursor: pointer;
    text-decoration: none;
  }
  a:hover {
    color: var(--color-info);
    text-decoration: underline;
  }
  & .current {
    color: var(--color-fg);
  }
`

/**
 * StyledBreadcrumb
 * @styled-components
 */
const StyledBreadcrumb = styled(Styled).attrs(() => ({ as: 'ul' }))`
  display: flex;
  font-size: 0.9em;
  list-style: none;
  padding: 10px 16px;
`
export default StyledBreadcrumb
