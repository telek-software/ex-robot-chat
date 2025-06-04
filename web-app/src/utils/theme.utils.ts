import { checkIsKeyof } from './typeGuard.utils'

export interface ThemeInterface {
  colors: {
    primary: string
    secondary: string
    tertiary: string
    quaternary: string
    bg: string
    fg: string
    disabled: string
    info: string
    success: string
    warning: string
    danger: string
    bg_info: string
    bg_warning: string
    bg_success: string
    bg_danger: string
  }
  radius: string
  boxShadow: {
    low: string
    hight: string
  }
}
export type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'info'
  | 'warning'
  | 'success'
  | 'danger'
  | 'disabled'
  | 'light-info'
  | 'light-warning'
  | 'light-success'
  | 'light-danger'

/**
 * getDefaultTheme
 * @description
 * The default style theme, implement DefaultTheme
 * @see src/styled.d.ts for the interface definition
 */
export function getDefaultTheme(): ThemeInterface {
  return {
    colors: {
      primary: '#042c7e', // old #042c7e
      secondary: '#33d9f1', // old #b9dbd9
      tertiary: '#6196fc',
      quaternary: '#fefefe',
      bg: '#ffffff',
      fg: '#030718',
      disabled: '#96989f',
      info: '#035397',
      success: '#1C7947',
      warning: '#DD9A35',
      danger: '#A9333A',
      bg_info: '#cce5fa',
      bg_warning: '#fedec8',
      bg_success: '#d7e8df',
      bg_danger: '#fbc2c5',
    },
    radius: '8px',
    boxShadow: {
      low: '0px 0px 0px 1px',
      hight: '1px 1px 2px -1px',
    },
  }
}

export enum ThemeKeys {
  defaultTheme = 'defaultTheme',
}

/**
 * initThene()
 * @description
 * Init the theme
 */
export function initTheme(nextKey?: ThemeKeys): ThemeInterface {
  const themeStorageID = 'themeStorageID'
  const themes = {
    [ThemeKeys.defaultTheme]: getDefaultTheme,
    // Add new theme here
  }
  if (nextKey) {
    const ChoosenTheme = themes[nextKey]

    if (typeof window !== 'undefined')
      localStorage.setItem(themeStorageID, nextKey)
    return ChoosenTheme()
  }

  const loadedThemeKey =
    typeof window !== 'undefined' ? localStorage.getItem(themeStorageID) : null
  if (!loadedThemeKey || !checkIsKeyof(themes, loadedThemeKey))
    return getDefaultTheme()

  const ChoosenTheme = themes[loadedThemeKey]
  return ChoosenTheme()
}

export default initTheme()
