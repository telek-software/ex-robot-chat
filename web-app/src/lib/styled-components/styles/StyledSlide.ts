import { keyframes, styled } from 'styled-components'

import Styled from './Styled'

type AnimProps = { $range: number; $width?: string; $duration?: number }

const translateinfinite = (p: AnimProps) => keyframes`
  100% { 
    transform:translateX(calc(-${p.$range} * ${p.$width} * 2));
  }
`

export const StyledSlideContent = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  transition:
    right,
    left,
    0.4s ease-in-out;
`

const StyledSlide = styled(Styled)<AnimProps>`
  display: inline;
  overflow-x: hidden;
  position: relative;
  .prev,
  .next {
    -webkit-user-select: none;
    background-color: transparent;
    border: none;
    border-radius: 0 3px 3px 0;
    box-shadow: none;
    color: var(--color-disabled);
    cursor: pointer;
    font-size: 3rem;
    position: absolute;
    top: 25%;
    user-select: none;
    width: auto;
  }
  .prev {
    border-radius: 0 3px 3px 0;
    left: 0;
  }
  .next {
    border-radius: 3px 0 0 3px;
    right: 0;
  }

  .prev:hover,
  .next:hover {
    color: var(--color-fg);
  }
  .prev:disabled,
  .next:disabled {
    color: transparent;
    cursor: initial;
  }
  &:after,
  &:before {
    content: '';
    position: absolute;
    width: 1rem;
    height: 100%;
  }
  &:after {
    background: linear-gradient(to left, var(--color-bg) 0%, transparent 100%);
    top: 0;
    right: 0;
  }
  &:before {
    background: linear-gradient(to right, var(--color-bg) 0%, transparent 100%);
    top: 0;
    left: 0;
  }
  &.infinite {
    ${StyledSlideContent} {
      animation: ${(p) => translateinfinite(p)} ${(p) => p.$duration || '8'}s
        linear infinite;
    }
    .prev,
    .next {
      display: none;
    }
  }
`

export default StyledSlide
