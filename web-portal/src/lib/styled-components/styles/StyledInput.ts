import { styled } from "styled-components";

import { media } from "../mediaQueries";

import Styled from "./Styled";

/**
 * StyledInput
 * @styled-component
 */
const StyledInput = styled(Styled).attrs(() => ({ as: "input" }))`
  background-color: var(--bg-color);
  border-radius: var(--radius);
  border-style: solid;
  border-width: 0;
  box-shadow: 0 0 0px 0.5px var(--bg-text-color);
  cursor: text;
  outline: none;
  padding: 0.4em;
  position: relative;
  transition: all 0.18s ease-in-out;
  max-width: 97vw;
  &.border {
    border-width: 1px;
  }
  &.danger {
    border-width: 2px;
  }
  &:hover {
  }
  &:focus {
    box-shadow: 0 0 0.5px 0.5px var(--bg-text-color);
  }
  &[type="checkbox"]:focus {
    box-shadow: none;
  }
  &:disabled {
    box-shadow: none;
    cursor: text;
    opacity: 0.6;
  }
  &:disabled:after {
    background-color: transparent;
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: none;
    width: 100%;
  }
  &.xs {
    width: 3em;
  }
  &.sm {
    width: 8em;
  }
  &.md {
    width: 12em;
  }
  &.lg {
    width: 16em;
  }
  &.xl {
    width: 20em;
  }
  ${media.xl} {
    &.xs {
      width: 3em;
    }
    &.sm {
      width: 8em;
    }
    &.md {
      width: 12em;
    }
    &.lg {
      width: 20em;
    }
    &.xl {
      width: 32em;
    }
  }
`;

export default StyledInput;
