import { StyledMenu, StyledMenuBtn } from '~lib/styled-components'
import { DefaultProps, RenderProps } from '~utils/type.utils'

type MenuType = RenderProps<DefaultProps>
/**
 * Menu
 * @description
 * Menu on the navigaiton
 *
 */
function Menu(props: MenuType) {
  const { children, flexStyle, ...rest } = props
  return (
    <StyledMenu $responsive={flexStyle} {...rest}>
      {children((p) => (
        <StyledMenuBtn {...p} />
      ))}
    </StyledMenu>
  )
}
export default Menu
