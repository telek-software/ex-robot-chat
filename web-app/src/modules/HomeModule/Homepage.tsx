import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Flex, Title } from '~components'

import { style } from './style'

/**
 * Homepage
 * @description
 * Homepage
 *
 */
function Homepage({ children }: { children: ReactNode }) {
  const { t } = useTranslation()
  return (
    <Flex as="section" flexStyle={style.home}>
      <Title as="h2" flexStyle={{ textAlign: 'center' }}>
        {t('long.WELCOME_ON_OUR_PLATFORM')}
      </Title>
      {children}
    </Flex>
  )
}
export default Homepage
