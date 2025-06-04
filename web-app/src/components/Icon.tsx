import { CSSProperties } from 'react'
import * as Heroicons from '@styled-icons/heroicons-outline'
import * as StyledIcons from '@styled-icons/material-rounded'

import { ResponsiveStyle, StyledSVG, toStyle } from '~lib/styled-components'
import { DefaultProps } from '~utils/type.utils'
import { checkIsKeyof } from '~utils/typeGuard.utils'

export type IconType = keyof (typeof StyledIcons & typeof Heroicons)
export type IconNameType = '' | IconType

type IconProps = Omit<DefaultProps, 'children'> & {
  name: IconNameType
  size?: string
  style?: Partial<CSSProperties>
}

type SVGProps = Omit<DefaultProps, 'children'> & {
  /** The background property modify the fill value of the SVG */
  background?: CSSProperties['background']
  flexStyle?: ResponsiveStyle
  src: string
}

function Icon(props: IconProps): JSX.Element
function Icon(props: SVGProps): JSX.Element

/**
 * Icon
 * @component
 * @styled-icons
 * @description
 * Calling Icon from "@styled-icons" library
 */
function Icon(props: IconProps | SVGProps) {
  const { id, className, flexStyle, style, testId } = props
  const commonProps = { id, className, testId }
  if ('name' in props) {
    const { name, size } = props
    if (name === '') return null
    const IconComponent = checkIsKeyof(StyledIcons, name)
      ? StyledIcons[name]
      : Heroicons[name]

    const width = document.body.clientWidth
    const cssResult = !flexStyle ? {} : flexStyle
    const { xs, sm, md, lg, xl, ...defaultCSS } = cssResult

    const customStyle = toStyle(cssResult, width)
    return (
      <IconComponent
        {...commonProps}
        style={{ margin: '0 4px', ...style, ...defaultCSS, ...customStyle }}
        size={size}
      />
    )
  }

  const { background, src, ...rest } = props
  return (
    <StyledSVG
      {...rest}
      data-testid={testId}
      src={src}
      background={background}
      $responsive={flexStyle}
    />
  )
}
export default Icon
