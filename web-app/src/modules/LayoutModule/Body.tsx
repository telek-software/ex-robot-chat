import { Flex } from '~components'
import { DefaultProps } from '~utils/type.utils'

import style from './style'

function Body(props: DefaultProps) {
  const { children } = props
  return <Flex flexStyle={style.body}>{children}</Flex>
}
export default Body
