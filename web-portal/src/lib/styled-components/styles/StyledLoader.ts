import { keyframes, styled } from "styled-components";

import Styled from "./Styled";

const Spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledLoader = styled(Styled)`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;
  .loader {
    animation: ${Spin} 2s linear infinite;
    border: 16px solid var(--color-bg);
    border-radius: 50%;
    border-top: 16px solid var(--color-info);
    height: 50%;
    width: 50%;
  }
`;

export default StyledLoader;
