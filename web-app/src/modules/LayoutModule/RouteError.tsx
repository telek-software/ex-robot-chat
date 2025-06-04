import { useTranslation } from 'react-i18next'

import { Flex } from '~components'

export default function ErrorPage() {
  const { t } = useTranslation()
  return (
    <Flex
      className="center column"
      flexStyle={{ placeContent: 'center', height: '100%' }}>
      <h1>{t('ERROR_404')}</h1>
      <p>
        <i>{t('ERROR_404_MESSAGE')}</i>
      </p>
    </Flex>
  )
}
