import { ResponsiveStyle } from '~lib/styled-components'

const style: Record<string, ResponsiveStyle> = <const>{
  login: {
    flexFlow: 'column',
    width: '100vw',
    padding: '1rem',
    backgroundImage: 'url(/plan.svg)',
    backgroundSize: '100%',
    backgroundPosition: '0rem -15rem',
  },
  loginForm: {
    placeContent: 'flex-start',
    margin: '0rem auto',
  },
  loginTitle: {
    placeItems: 'center',
    placeContent: 'center',
    width: '24rem',
    maxWidth: '100%',
    margin: '0rem 3% 10%',
  },
  authSmallBtn: {
    padding: '0.3rem 0.3rem',
    fontSize: '1.1rem',
    borderRadius: '2em',
  },
  sideBrand: {
    margin: 'auto',
    width: '5rem',
    height: '4rem',
    position: 'relative',
  },
  sideTitle: {
    placeItems: 'center',
    placeContent: 'center',
  },
}
export default style
