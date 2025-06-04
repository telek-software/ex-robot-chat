import { ReactNode, useMemo, useState } from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'

import GlobalStyle from './GlobalStyle'
import initTheme from './theme'
import { ThemeInterface } from './type'

export type ThemeContextInterface = ThemeInterface & {
  switchToDefault: () => void
}

type StyledProviderType = { children: ReactNode }

/**
 * StyledProvider
 * @context
 * @description
 * The Theme Manager
 */
function StyledProvider(props: StyledProviderType) {
  const { children } = props
  const initialTheme = initTheme()

  const [theme, setTheme] = useState<DefaultTheme>(initialTheme)

  const value: ThemeContextInterface = useMemo(
    () => ({
      colors: theme.colors,
      radius: theme.radius,
      boxShadow: theme.boxShadow,
      switchToDefault() {
        const nextTheme = initTheme()
        setTheme(nextTheme)
      },
    }),
    [theme],
  )
  return (
    <ThemeProvider theme={value}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}

export default StyledProvider
