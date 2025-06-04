import { styled } from 'styled-components'

/**
 * StyledAlert
 * @styled-components
 */
const StyledAlert = styled.section`
  border-radius: var(--radius);
  box-shadow: 0px 0px 3px 0px var(--bg-text-color);
  color: var(--bg-text-color);
  display: grid;
  font-size: 1rem;
  font-weight: 600;
  grid-template-columns: auto 1.5rem;
  margin: 0em;
  padding: 0em;
  position: relative;
  transform: scale(1, 0);
  transform-origin: top;
  transition: all 0.3s ease-in-out;
  transition-delay: 0.1s;
  .content {
    display: flex;
    flex-flow: column;
    row-gap: 0.2rem;
    place-content: center;
    place-items: center;
    min-width: 20rem;
    max-width: 100%;
  }
  .close-alert {
    background-color: transparent;
    border-radius: var(--radius);
    border-width: 1px;
    box-shadow: 1px 1px 1px 1px currentcolor;
    color: var(--bg-text-color);
    cursor: pointer;
    display: none;
    float: right;
    height: 1.5rem;
  }
  .close-alert:hover {
    opacity: 0.5;
  }
  &.clos strong {
    display: block;
    font-size: 1.1rem;
    margin-bottom: 0.5em;
  }
  ul {
    margin: 0 0 0.1em;
  }
  &.open {
    margin: 0.5em 0 1em;
    padding: 0.9em;
    transform: scale(1, 1);
  }
  &.open .close-alert {
    display: block;
  }
`

export default StyledAlert
