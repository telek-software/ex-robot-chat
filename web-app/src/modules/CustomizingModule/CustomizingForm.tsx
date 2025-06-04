import { useTranslation } from 'react-i18next'

import { DragAndDrop, Fieldset, Flex, Form, Input } from '~components'
import { Size } from '~utils/enum.utils'

import { style } from './style'

/**
 * CustomizingForm
 * @description
 * The form for customizing the ChatBot
 *
 */
function CustomizingForm() {
  const { t } = useTranslation()
  return (
    <Form flexStyle={style.form}>
      <Fieldset legend={t('INITIAL_MESSAGE')}>
        <Input size={Size.xl} value="" onChange={() => {}} />
      </Fieldset>
      <Fieldset legend={t('SUGGESTED_MESSAGE')}>
        <Input size={Size.xl} value="" onChange={() => {}} />
      </Fieldset>
      <Flex flexStyle={style.iframeSettings}>
        <Flex as="label" className="column">
          <Flex>{t('CHATBOT_IFRAME_COLOR')}</Flex>
          <Input
            size={Size.xs}
            flexStyle={style.formColor}
            type="color"
            value=""
            onChange={() => {}}
          />
        </Flex>
        <Flex className="column" flexStyle={style.formRangeArea}>
          <Flex as="label" className="column">
            <Flex>{t('CHATBOT_IFRAME_WIDTH')}</Flex>
            <Input size={Size.md} type="range" value="" onChange={() => {}} />
          </Flex>
          <Flex as="label" className="column">
            <Flex>{t('CHATBOT_IFRAME_HEIGHT')}</Flex>
            <Input size={Size.md} type="range" value="" onChange={() => {}} />
          </Flex>
          <Flex as="label" className="column">
            <Flex>{t('CHATBOT_IFRAME_RADIUS')}</Flex>
            <Input size={Size.md} type="range" value="" onChange={() => {}} />
          </Flex>
        </Flex>
      </Flex>
      <Fieldset legend={t('UPLOAD_CHATBOT_PICTURE')}>
        <DragAndDrop placeholder={t('DRAG_AND_DROP')} />
      </Fieldset>
      <Fieldset legend={t('DISPLAY_NAME')}>
        <Input size={Size.lg} value="" onChange={() => {}} />
      </Fieldset>
      <Flex flexStyle={style.iframeSettings}>
        <Flex as="label" className="column center">
          <Flex>{t('USER_MESSAGE_COLOR')}</Flex>
          <Input
            size={Size.xs}
            flexStyle={style.formColor}
            type="color"
            value=""
            onChange={() => {}}
          />
        </Flex>
        <Flex as="label" className="column center">
          <Flex>{t('CHATBOT_MESSAGE_COLOR')}</Flex>
          <Input
            size={Size.xs}
            type="color"
            flexStyle={style.formColor}
            value=""
            onChange={() => {}}
          />
        </Flex>
      </Flex>
      <Flex flexStyle={style.iframeSettings}>
        <Flex as="label" className="column center">
          <Flex>{t('POLICE_FONT')}</Flex>
          <Input size={Size.md} value="" onChange={() => {}} />
        </Flex>
        <Flex as="label" className="column center">
          <Flex>{t('POLICE_SIZE')}</Flex>
          <Input
            size={Size.sm}
            type="number"
            min={8}
            max="40"
            value=""
            onChange={() => {}}
          />
        </Flex>
        <Flex as="label" className="column center">
          <Flex>{t('POLICE_STYLE')}</Flex>
          <Input size={Size.md} value="" onChange={() => {}} />
        </Flex>
      </Flex>
    </Form>
  )
}
export default CustomizingForm
