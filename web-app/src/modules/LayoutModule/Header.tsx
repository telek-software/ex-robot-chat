import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Flex, Title } from '~components'
import { DefaultProps } from '~utils/type.utils'

import style from './style'

/**
 * Header
 * @module LayoutModule
 * @description
 * The header of the layout
 */
function Header(props: DefaultProps) {
  const { children } = props
  const { t } = useTranslation()
  const ref = useRef(null)
  return (
    <Flex ref={ref} as="header" className="column">
      <Flex flexStyle={style.headerUtils}>{children}</Flex>
      <Flex className="color-secondary" flexStyle={{ placeContent: 'center' }}>
        <Title flexStyle={{ margin: 'auto' }}>
          {t('CREATE_PERSONALIZED_CHAT')}
        </Title>
      </Flex>
    </Flex>
  )
}

export default Header
