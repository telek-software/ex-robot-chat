import { styled } from 'styled-components'

import { media, targetWidth } from '../mediaQueries'

import Styled from './Styled'
import StyledButton from './StyledButton'

/**
 * StyledMenuBtn
 * @styled-components
 */
export const StyledMenuBtn = styled(StyledButton)`
  cursor: pointer;
`

/**
 * StyledMenu
 * @styled-components
 */
const StyledMenu = styled(Styled)`
  @media (max-width: ${targetWidth.lg}px) {
    pointer-events: none;
    position: relative;
    nav {
      background-color: var(--bg-text-color);
      border-radius: var(--radius);
      flex-direction: column-reverse;
      min-width: 30vw;
      padding: 2.5rem 1.5rem 2rem 1.5rem;
      place-items: center !important;
      pointer-events: auto;
      position: absolute;
      right: 0;
      row-gap: 1.2rem;
      top: 95%;
      transform-origin: top right;
      transform: scale(1, 0);
      transition-delay: 0.1s;
      transition: transform, pointer-event, 0.1s;
      width: min-content;
    }
    nav > * {
      display: flex;
      white-space: nowrap;
    }
    ${StyledMenuBtn} {
      pointer-events: auto;
    }
    &:focus-within {
      ${StyledMenuBtn} {
        pointer-events: none;
      }
    }
    &:hover {
      nav {
        transform: scale(1, 1);
        box-shadow: 0px 1px 4px -1px var(--color-bg);
      }
    }
  }

  ${media.lg} {
    ${StyledMenuBtn} {
      transform: scale(0, 0);
    }
  }
`

export default StyledMenu
