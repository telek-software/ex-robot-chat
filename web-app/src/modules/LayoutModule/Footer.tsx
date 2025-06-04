import { Flex } from '~components'
import { DefaultProps } from '~utils/type.utils'

import style from './style'

/**
 * Footer
 * @module LayoutModule
 * @description
 * The footer of the App
 */
function Footer(props: DefaultProps) {
  const { children } = props
  return (
    <Flex as="footer" flexStyle={style.footer}>
      {children}
    </Flex>
  )
}

export default Footer
