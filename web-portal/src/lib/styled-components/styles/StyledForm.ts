import { styled } from "styled-components";

import { media } from "../mediaQueries";

import Styled from "./Styled";

/**
 * StyledForm
 * @styled-component
 */
const StyledForm = styled(Styled).attrs(() => ({ as: "form" }))`
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  margin: auto;
  min-height: 3em;
  padding: 1rem;
  transition: height 1s;
  row-gap: 0.6rem;
  &.xs {
    width: 90vw;
  }
  &.sm {
    width: 95vw;
  }
  &.md {
    width: 97vw;
  }
  &.lg {
    width: 100vw;
  }
  &.xl {
    width: 100vw;
  }
  ${media.md} {
    &.xs {
      width: 12em;
    }
    &.sm {
      width: 24em;
    }
    &.md {
      width: 36em;
    }
    &.lg {
      width: 48em;
    }
    &.xl {
      width: 60em;
    }
  }
`;

export default StyledForm;
