import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useSubscription } from '@apollo/client'

import { Button, Flex } from '~components'
import useAlert from '~hooks/useAlert'
import { axiosPost } from '~lib/axios'
import { ACTIONS, logger } from '~utils/config.utils'
import { Size, Status } from '~utils/enum.utils'
import { randomNum } from '~utils/number.utils'

import { ChatReturnType } from './ChatProvider'
import { SOURCE_TYPES } from './constants'
import {
  EmbeddedListener,
  EmbeddingMutation,
  LISTEN_EMBEDDED_STATE,
  POST_EMBEDDING,
} from './graphql'
import { getDocFormData, getDocInput } from './helpers'
import SourceData from './SourceData'
import style from './style'
import { SourceType } from './type'
import useEmbbed from './useEmbbed'

type ResponseData = EmbeddingMutation['postEmbedding'] | undefined

/**
 * SourceDataContainer
 * @module ChatModule
 * @container
 * @description
 * Import the data for being studied by the NLP API before the chat starts
 *
 */
function SourceDataContainer(props: ChatReturnType) {
  const { chatUuid, setChatUUid = () => null, feature } = props
  const { t } = useTranslation()
  const embbededList = useEmbbed()
  const { clearAlert, HookAlert, setAlert } = useAlert()
  const [sourceType, setSourceType] = useState<SourceType>(SOURCE_TYPES.FILES)
  const [postEmbedding] = useMutation<EmbeddingMutation>(POST_EMBEDDING)
  const embeddedListener = useSubscription<EmbeddedListener>(
    LISTEN_EMBEDDED_STATE,
  )

  const switchType = (nextType: SourceType) => setSourceType(nextType)

  const onError = (error: Error) => setAlert({ message: error.message })

  const onAfterPost = (response: ResponseData, type: string) => {
    if (response) {
      setChatUUid(response.chat_uuid)
      embbededList.addEmbbed({ media: response.doc, id: randomNum(), type })
      setAlert({
        message: t('EMBEDDED_DOCUMENT_CHECKING'),
        status: Status.info,
      })
      setTimeout(clearAlert, 5000)
    }
  }

  const onSend = (input: unknown) => {
    clearAlert()
    const chat = { ...feature, chatUuid }
    if (sourceType === SOURCE_TYPES.FILES) {
      const upload = input as File
      const formData = getDocFormData({ chat, upload, sourceType })
      axiosPost(ACTIONS.POST_HTTP_DOCUMENT, formData)
        .then(({ data }: { data: ResponseData }) =>
          onAfterPost(data, upload.type),
        )
        .catch(onError)
    } else {
      const value = input as string
      const postEmbeddingInput = getDocInput({ value, sourceType, chat })
      postEmbedding({ variables: { postEmbeddingInput } })
        .then((r) => onAfterPost(r.data?.postEmbedding, sourceType))
        .catch(onError)
    }
  }

  const onEmbedded = ({ subscribeEmbedded }: EmbeddedListener) => {
    const { error, statusCode } = subscribeEmbedded
    if (statusCode === 200)
      setAlert({
        status: Status.success,
        message: t('EMBEDDED_DOCUMENT_AVAILABLE'),
      })
    setTimeout(clearAlert, 5000)
    if (error) setAlert({ message: error })
  }

  useEffect(() => {
    const { data, error, loading } = embeddedListener
    logger.info(`[src-container] embedded ${JSON.stringify(embeddedListener)}`)
    if (!error && !loading && !!data) onEmbedded(data)
    else if (error) setAlert({ message: error.message })
  }, [embeddedListener]) // eslint-disable-line

  return (
    <Flex flexStyle={style.sourceData}>
      <Flex flexStyle={style.sourceTypes}>
        {Object.values(SOURCE_TYPES).map((src) => (
          <Button
            key={src}
            size={Size.sm}
            label={t(src)}
            disabled={src === sourceType}
            onClick={() => switchType(src)}
          />
        ))}
      </Flex>
      <HookAlert />
      <Flex flexStyle={style.upload}>
        <SourceData sourceType={sourceType} onSend={onSend} />
      </Flex>
    </Flex>
  )
}
export default SourceDataContainer
