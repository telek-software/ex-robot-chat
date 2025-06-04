import { styled } from 'styled-components'

import { media } from '../mediaQueries'

import Styled from './Styled'

/**
 * StyledDragAndDrop
 * @styled-components
 */
const StyledDragAndDrop = styled(Styled)`
  background-color: var(--bg-color);
  border-radius: var(--radius);
  cursor: move;
  padding: 0.5rem 1rem;
  width: auto;
  .placeholder {
    font-style: italic;
  }
  .upload {
    padding: 0;
    visibility: hidden;
  }
  ${media.xs} {
    padding: 1em 2em;
  }
`

export default StyledDragAndDrop
