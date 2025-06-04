import { styled } from 'styled-components'

import Styled from './Styled'

/**
 * StyledButton
 * @styled-components
 *
 */
const StyledButton = styled(Styled).attrs(() => ({ as: 'button' }))`
  border: none;
  border-radius: var(--radius);
  box-shadow: var(--box-shadow-low) var(--bg-text-color);
  background-color: var(--bg-color);
  color: var(--bg-text-color);
  cursor: pointer;
  display: inline-flex;
  font-size: 1rem;
  justify-content: center;
  margin: 0.2em 0.5em;
  outline: none;
  padding: 0.5em;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: all 0.05s ease-in-out;
  &:active {
    opacity: 0.8;
    transform: scale(0.96);
    transform-origin: bottom center;
  }
  &:disabled {
    box-shadow: none;
    cursor: text;
    opacity: 0.6;
  }
  &:after {
    background-color: var(--bg-text-color);
    border-radius: var(--radius);
    content: '';
    display: flex;
    height: 100%;
    left: 0;
    margin: 0;
    opacity: 0.1;
    padding: 0;
    position: absolute;
    top: 0;
    transform: scale(0, 1);
    transform-origin: left;
    transition: none;
    width: 100%;
  }
  &:hover:after {
    transform: scale(1, 1);
    transition: all 0.3s ease-in-out;
  }

  &:disabled:after {
    transform: none;
  }
  &.rounded {
    border-radius: 100%;
  }
  &.semi-rounded {
    border-radius: 2em;
  }
  &.unboxed {
    border: none;
    box-shadow: none;
  }
  &.xs {
    width: 2em;
    padding: 0.4rem;
  }
  &.sm {
    width: 6em;
  }
  &.md {
    width: 10em;
  }
  &.lg {
    width: 16em;
  }
  &.xl {
    width: 24em;
  }
`

export default StyledButton
