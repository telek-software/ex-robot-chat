import { useTranslation } from 'react-i18next'

import { Button, Flex, Title } from '~components'

import CustomizingForm from './CustomizingForm'
import CustomizingPreview from './CustomizingPreview'
import { style } from './style'

/**
 * CustomizingContainer
 * @description
 * Manage the customization of the ChatBot
 *
 */
function CustomizingContainer() {
  const { t } = useTranslation()
  return (
    <Flex className="column">
      <Flex className="center">
        <Title>{t('WIDGET_CHATBOT_SETTINGS')}</Title>
      </Flex>
      <Flex flexStyle={style.content}>
        <CustomizingForm />
        <CustomizingPreview />
      </Flex>
      <Flex className="center">
        <Button label={t('SAVE')} />
      </Flex>
    </Flex>
  )
}
export default CustomizingContainer
