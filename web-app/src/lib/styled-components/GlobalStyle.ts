import { createGlobalStyle } from 'styled-components'

import { media, targetWidth } from './mediaQueries'

export default createGlobalStyle`

  body, body * {
    box-sizing: border-box;
  }
  a:visited {
    text-decoration: none;
  }

  /* ***************************************************** */
  /* ****************  Media query hidding *************** */
  /* ***************************************************** */

    @media(max-width: ${targetWidth.xs}px){
     .hide-xs { display: none !important; }
    }
    @media(max-width: ${targetWidth.sm}px){
     .hide-sm { display: none !important; }
    }
    @media(max-width: ${targetWidth.md}px){
     .hide-md { display: none !important; }
    }
    @media(max-width: ${targetWidth.lg}px){
     .hide-lg { display: none !important; }
    }
    @media(max-width: ${targetWidth.xl}px){
     .hide-xl { display: none !important; }
    }
    ${media.xs}{ 
      .show-xs { display: none !important; }
    }
    ${media.sm}{ 
      .show-sm { display: none !important; }
    }
    ${media.md}{
      .show-md { display: none !important; }
    }
    ${media.lg}{ 
      .show-lg { display: none !important; }
    }
    ${media.xl}{
      .show-xl { display: none !important; }
    }

  /* ******************************************************************* */
  /* ***********************  Vars declaration  ************************ */
  /*         NB: The bg-text-color are created to be adapted             */
  /*           to the bg color, it is meant to be overrided              */
  /* ******************************************************************* */

  :root {

    /* ***************************************************** */
    /* *******************  Static vars  ******************* */
    /* ***************************************************** */

    --color-primary: ${({ theme }) => theme.colors.primary};
    --color-secondary: ${({ theme }) => theme.colors.secondary};
    --color-tertiary: ${({ theme }) => theme.colors.tertiary};
    --color-quaternary: ${({ theme }) => theme.colors.quaternary};
    --color-bg: ${({ theme }) => theme.colors.bg};
    --color-fg: ${({ theme }) => theme.colors.fg};
    --color-disabled: ${({ theme }) => theme.colors.disabled};

    --color-info: ${({ theme }) => theme.colors.info};
    --color-success: ${({ theme }) => theme.colors.success};
    --color-warning: ${({ theme }) => theme.colors.warning};
    --color-danger: ${({ theme }) => theme.colors.danger};

    --color-bg-info: ${({ theme }) => theme.colors.bg_info};
    --color-bg-success: ${({ theme }) => theme.colors.bg_success};
    --color-bg-warning: ${({ theme }) => theme.colors.bg_warning};
    --color-bg-danger: ${({ theme }) => theme.colors.bg_danger};

    --box-shadow-low: ${({ theme }) => theme.boxShadow.low};
    --box-shadow-hight: ${({ theme }) => theme.boxShadow.hight};
    --radius: ${({ theme }) => theme.radius};

    /* ****************************************************** */
    /* *******************  Dynamic vars  ******************* */
    /* ****************************************************** */

    --bg-color: var(--color-fg);
    --bg-text-color: var(--color-bg);

    /* ****************************************************** */
    /* ******************* Usefull classes ************ ***** */
    /* ****************************************************** */

    .column {
      flex-direction: column;
    }

    .center {
      display: flex;
      flex-flow: column;
      place-items: center;
      place-content: center;
    }

    .radius {
      border-radius: var(--radius);
    }

    .text-shadow {
      text-shadow: 0.5px 0px 0px var(--color-fg);
    }

    .shadow {
      box-shadow: var(--box-shadow-low);
    }

    .shadow-hight{
      box-shadow: var(--box-shadow-hight);
    }

    .disabled {
      --bg-color:transparent;
      --bg-text-color: var(--color-disabled) !important;
    }

    /* ****************************************************** */
    /* ****************  Background color  ****************** */
    /* ****************************************************** */


    .bg {
      background-color: var(--color-bg);
      --bg-color: var(--color-bg);
      --bg-text-color: var(--color-fg);
    }
    .bg.hollow {
      background-color: transparent;
      --bg-color: transparent;
      --bg-text-color: var(--color-bg);
    }

    .bg-reverse {
      background-color: var(--color-fg);
      --bg-color: var(--color-fg);
      --bg-text-color: var(--color-bg);
    }
    .bg-reverse.hollow {
      background-color: transparent;
      --bg-text-color: var(--color-fg);
      --bg-color: var(--color-fg);
    }

    .bg-primary {
      background-color: var(--color-primary);
      --bg-color: var(--color-primary);
      --bg-text-color: var(--color-bg);
    }
    .bg-primary.hollow {
      background-color: transparent;
      --bg-color: transparent;
      --bg-text-color: var(--color-primary);
    }

    .bg-secondary {
      background-color: var(--color-secondary);
      --bg-color: var(--color-secondary);
      --bg-text-color: var(--color-fg);
    }
    .bg-secondary.hollow {
      background-color: transparent;
      --bg-color: transparent;
      --bg-text-color: var(--color-secondary);
    }

    .bg-tertiary {
      background-color: var(--color-tertiary);
      --bg-color: var(--color-tertiary);
      --bg-text-color: var(--color-bg);
    }
    .bg-tertiary.hollow {
      background-color:transparent;
      --bg-color: transparent;
      --bg-text-color: var(--color-tertiary);
    }

    .bg-quaternary {
      background-color: var(--color-quaternary);
      --bg-color: var(--color-quaternary);
      --bg-text-color: var(--color-fg);
    }
    .bg-quaternary.hollow {
      background-color: transparent;
      --bg-color: transparent;
      --bg-text-color: var(--color-quaternar);
    }

    .bg-info {
      background-color: var(--color-info);
      --bg-color: var(--color-info);
      --bg-text-color: var(--color-bg);
    }
    .bg-info.hollow {
      background-color: transparent;
      --bg-color: var(--color-info);
      --bg-text-color: var(--color-info);
    }
    .bg-success {
      background-color: var(--color-success);
      --bg-color: var(--color-success);
      --bg-text-color: var(--color-bg);
    }
    .bg-success.hollow {
      background-color: transparent;
      --bg-color: var(--color-success);
      --bg-text-color: var(--color-success);
    }
    .bg-warning {
      background-color: var(--color-warning);
      --bg-color: var(--color-warning);
      --bg-text-color: var(--color-bg);
    }
    .bg-warning.hollow {
      background-color: transparent;
      --bg-color: var(--color-warning);
      --bg-text-color: var(--color-warning);
    }

    .bg-danger {
      background-color: var(--color-danger);
      --bg-color: var(--color-danger);
      --bg-text-color: var(--color-bg);
    }
    .bg-danger.hollow {
      background-color:transparent;
      --bg-color: var(--color-danger);
      --bg-text-color: var(--color-dange);
    }

    .bg-light-info {
      background-color: var(--color-bg-info);
      --bg-color: var(--color-bg-info);
      --bg-text-color: var(--color-info);
    }
    .bg-light-success {
      background-color: var(--color-bg-success);
      --bg-color: var(--color-bg-success);
      --bg-text-color: var(--color-success);
    }
    .bg-light-warning {
      background-color: var(--color-bg-warning);
      --bg-color: var(--color-bg-warning);
      --bg-text-color: var(--color-warning);
    }
    .bg-light-danger {
      background-color: var(--color-bg-danger);
      --bg-color: var(--color-bg-danger);
      --bg-text-color: var(--color-danger);
    }

    ${({ theme }) =>
      Object.entries(theme.colors).map(
        (entity) =>
          `.color-${entity[0]} {
          --bg-text-color: ${entity[1]} ;
       }`,
      )}
    }
`
