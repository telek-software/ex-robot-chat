import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, DragAndDrop, Flex, Icon, Input } from '~components'
import { ValueOf } from '~utils/type.utils'

import { SOURCE_TYPES } from './constants'
import style from './style'

type SourceDataType = {
  onSend: (input: unknown) => void
  sourceType: ValueOf<typeof SOURCE_TYPES>
}

/**
 * SourceData
 * @module ChatModule
 * @description
 * Upload the documents to be studied by the API
 *
 */
function SourceData(props: SourceDataType) {
  const { onSend, sourceType } = props
  const { t } = useTranslation()
  const [input, setInput] = useState<unknown>()
  const handleClick = () => {
    if (input) onSend(input)
  }

  useEffect(() => {
    setInput(undefined)
  }, [sourceType])

  return (
    <Flex flexStyle={style.upload}>
      {sourceType === SOURCE_TYPES.FILES && (
        <DragAndDrop
          clickable
          onDrop={(e) => e && setInput(e[0])}
          flexStyle={style.uploadArea}
          placeholder={input ? '' : t('DRAG_AND_DROP')}>
          {!!input && (
            <Flex style={{ height: '100%', fontSize: '1.3rem' }}>
              <Icon name="FilePresent" size="1em" /> {(input as File).name}
            </Flex>
          )}
        </DragAndDrop>
      )}
      {sourceType === SOURCE_TYPES.URL && (
        <Input
          onChange={(e) => setInput(e)}
          flexStyle={style.text}
          placeholder={t('URL')}
          onEnterPress={handleClick}
        />
      )}
      {sourceType === SOURCE_TYPES.TEXT && (
        <Input
          onChange={(e) => setInput(e)}
          flexStyle={style.text}
          placeholder={t('TEXT')}
          onEnterPress={handleClick}
        />
      )}
      {sourceType === SOURCE_TYPES.DATABASE && (
        <Input
          onChange={(e) => setInput(e)}
          flexStyle={style.text}
          placeholder={t('DATABASE')}
          onEnterPress={handleClick}
        />
      )}
      <br />
      <Button
        icon="Publish"
        flexStyle={{ margin: 'auto' }}
        onClick={handleClick}
        disabled={!input}
      />
    </Flex>
  )
}
export default SourceData
