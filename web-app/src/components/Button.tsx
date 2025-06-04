import { ButtonHTMLAttributes } from 'react'

import useEnsafe from '~hooks/useEnsafe'
import { ResponsiveStyle, StyledButton } from '~lib/styled-components'
import { enClassname } from '~utils/dom.utils'
import { Size, Status } from '~utils/enum.utils'
import { DefaultProps } from '~utils/type.utils'

import Icon, { IconNameType } from './Icon'

type ButtonAttributes = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'>
type ButtonProps = ButtonAttributes &
  DefaultProps & {
    flexStyle?: ResponsiveStyle
    href?: string
    icon?: IconNameType
    label?: string
    onClick?: () => void
    size?: Size
    status?: Status
  }

/**
 * Button
 * @component
 */
function Button(props: ButtonProps) {
  const { className, flexStyle, href, icon, id, label = '', ...rest } = props
  const { onClick = () => {}, size = Size.md, ...more } = rest
  const { status, testId, style, ...btnProps } = more
  const { ensafe } = useEnsafe()

  const handleClick = () => {
    const safeClick = ensafe(onClick)
    safeClick()
  }

  let classed = enClassname([size], className)
  if (status) classed = classed.concat(` bg-light-${status}`)

  return (
    <StyledButton
      {...btnProps}
      id={id}
      $responsive={flexStyle}
      as={href ? 'a' : undefined}
      className={classed}
      data-testid={testId}
      href={href}
      onClick={href ? undefined : handleClick}
      role="button"
      style={style}
      type="button">
      {icon && <Icon name={icon} size="1.2em" />}
      {label && <span>{label}</span>}
      {props.children && props.children}
    </StyledButton>
  )
}

export default Button
