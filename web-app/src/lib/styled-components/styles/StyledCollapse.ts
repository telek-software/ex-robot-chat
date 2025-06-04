import { styled } from 'styled-components'

import Styled from './Styled'

const StyledCollapse = styled(Styled)`
  background-color: var(--bg-color);
  border-radius: var(--radius);
  box-shadow: 0 1px 0 0 var(--bg-text-color);
  color: var(--bg-text-color);

  &:hover {
    box-shadow: 0 2px 0 0 var(--color-disabled);
  }
  transition: box-shadow, 0.2s;

  .btn-collapse {
    background-color: transparent;
    border: none;
    color: var(--bg-text-color);
    cursor: pointer;
    display: flex;
    outline: none;
    padding: 18px;
    place-items: center;
    text-align: left;
    width: 100%;
  }
  .btn-collapse:hover {
    color: var(--color-secondary);
  }

  .content {
    overflow: hidden;
    transition:
      height,
      padding,
      0.3s ease-out;
  }
`

export default StyledCollapse
