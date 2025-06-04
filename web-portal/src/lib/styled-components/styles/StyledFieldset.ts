import { styled } from "styled-components";

import Styled from "./Styled";

/**
 * StyledFieldset
 * @styled-components
 */
const StyledFieldset = styled(Styled).attrs(() => ({ as: "fieldset" }))`
  border-color: var(--bg-text-color);
  border-width: 0.5px;
  color: var(--bg-text-color);
  max-width: 50em;
  padding: 0.7em;
  width: 100%;
  legend {
    padding: 0 2px;
  }
  &.left .legend {
    text-align: left;
  }
  &.center .legend {
    text-align: center;
  }
  &.right .legend {
    text-align: right;
  }
  &.row .fieldset-content {
    display: flex;
    grid-column-gap: 0.7em;
  }
  &.column .fieldset-content {
    display: inline-grid;
    grid-row-gap: 0.7em;
    grid-template-rows: auto;
    text-align: right;
  }
`;

export default StyledFieldset;
