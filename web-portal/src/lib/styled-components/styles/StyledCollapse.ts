import { styled } from "styled-components";

import Styled from "./Styled";

const StyledCollapse = styled(Styled)`
  box-shadow: 0 1px 0 0 var(--color-disabled);
  &:hover {
    box-shadow: 0 2px 0 0 var(--color-disabled);
  }
  transition: box-shadow, 0.2s;
  .btn-collapse {
    border: none;
    cursor: pointer;
    outline: none;
    padding: 18px;
    text-align: left;
    width: 100%;
    background-color: transparent;
  }

  .content {
    overflow: hidden;
    padding: 0 16px;
    transition: max-height 0.3s ease-out;
  }
`;

export default StyledCollapse;
