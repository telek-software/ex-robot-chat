import { styled } from 'styled-components'

import { render, screen } from '~utils/test.utils'

import * as themeUtils from '../theme'

test('StyledProvider', () => {
  const defaultTheme = themeUtils.getDefaultTheme()
  jest.mock('../theme.ts', () => ({
    initTheme: () => defaultTheme,
  }))

  const StyledDiv = styled.div.attrs(({ theme }) => ({
    style: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.bg,
    },
  }))`
    height: 10em;
    width: 10em;
  `

  render(<StyledDiv data-testid="style">Theme</StyledDiv>)
  const styledDiv = screen.getByTestId('style')

  expect(styledDiv).toHaveStyle(
    `background-color: ${defaultTheme.colors.primary}`,
  )
  expect(styledDiv).not.toHaveStyle(
    `background-color: ${defaultTheme.colors.secondary}`,
  )
})
