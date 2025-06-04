import { ResponsiveStyle } from '~lib/styled-components'

/**
 * style
 * @module LayoutModule
 * @description
 * Style with mediasQueries (xs, sm, md, lg, xl)
 */
const style: Record<string, ResponsiveStyle> = <const>{
  body: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    width: '100%',
  },
  footer: {
    width: '100%',
    placeContent: 'center space-around',
    minHeight: '5rem',
  },
  header: {
    alignItems: 'center',
    display: 'grid',
    flexDirection: 'column',
    gridTemplateColumns: 'auto 10rem',
    margin: '0 auto',
    padding: '1em 0',
    width: '100%',
    maxWidth: '80em',
  },
  headerNav: {
    placeContent: 'center center',
  },
  headerUtils: {
    columnGap: '0.5em',
    placeContent: 'flex-end',
    placeItems: 'center',
    margin: '1rem 2rem 0',
  },
  main: {
    maxWidth: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    paddingBottom: '5rem',
  },
  side: {
    flexFlow: 'column',
    borderRadius: '0 0 var(--radius) 0',
    height: '100vh',
    rowGap: '3rem',
    position: 'sticky',
    top: 0,
  },
  sideTitle: {
    margin: '0.5rem auto',
    maxWidth: '18rem',
  },
  sideBrand: {
    margin: 'auto',
    width: '5rem',
    height: '4rem',
    position: 'relative',
  },
  sideDropdown: {
    width: '100%',
  },
  sideList: {
    padding: '0 3%',
    width: '100%',
    maxWidth: '18rem',
    flexFlow: 'column',
  },
  sideIcon: {},
  sideItem: {
    width: '100%',
    placeContent: 'center',
    md: {
      placeContent: 'flex-start',
    },
  },
  sideText: {},
  sideLink: {
    width: '100%',
    placeItems: 'center',
    md: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
    },
    lg: {
      fontSize: '1.3rem',
    },
  },
}

export default style
