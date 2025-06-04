import { styled } from 'styled-components'

import { media } from '../mediaQueries'

import Styled from './Styled'

/* The dropdown container */
const BaseDropdown = styled(Styled)`
  background-color: var(--bg-color);
  border-radius: var(--radius);
  float: left;
  position: relative;
  .dropbtn,
  .dropSelect {
    color: var(--bg-text-color);
    margin: 0;
    outline: none; /* Important for vertical align on mobile phones */
    padding: 0.5rem;
    text-align: left;
    display: flex;
  }
  option:disabled {
    color: var(--color-disabled);
    opacity: 0.8;
  }
  label {
    color: var(--bg-text-color);
  }
  .dropdown-content {
    background-color: var(--bg-color);
    box-shadow: 0px 0px 2px 0px var(--bg-text-color);
    min-width: max-content;
    position: absolute;
    border-radius: var(--radius);
    right: 0;
    top: 102%;
    transform: scale(1, 0);
    transform-origin: top;
    transition: transform, 0.1s;
    transition-delay: 0.2s;
    z-index: 1;
    margin: 0;
    overflow-y: hidden;
  }
  /* Links inside the dropdown */
  .dropdown-content a {
    color: var(--bg-text-color);
    background-color: var(--bg-color);
    cursor: pointer;
    display: flex;
    flex-flow: column;
    float: none;
    min-width: max-content;
    padding: 0.4em 0.4em;
    text-align: left;
    text-decoration: none;
    margin: 0;
  }
  .dropdown-content a:not(:last-child) {
    box-shadow: 0px 1px 0px 0px var(--bg-text-color);
  }
  /* Add a grey background color to dropdown links on hover */
  .dropdown-content a:hover {
    opacity: 0.5;
  }
  /* Show the dropdown menu on hover */
  &:hover .dropdown-content {
    transform: scale(1, 1);
  }
  ${media.xs} {
    &.boxed {
      padding: 0.4em 1em;
    }
  }
`

export default BaseDropdown
