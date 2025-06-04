import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GraphQLError } from 'graphql'

import { Flex, SkeletonLoader } from '~components'
import useAlert from '~hooks/useAlert'
import { logger } from '~utils/config.utils'

import DialogueContainer from './DialogueContainer'
import {
  ALL_MESSAGES,
  AllMessagesQuery,
  GET_CHAT,
  GetChatQuery,
} from './graphql'
import { createMessage, createResponse } from './helpers'
import SourceDataContainer from './SourceDataContainer'
import style from './style'
import { QueriedChat } from './type'
import { DialogueType } from './useDialogue'
import useFeature from './useFeature'

/**
 * ChatbotContainer
 * @module ChatModule
 * @description
 * Manage former Chats
 *
 */
function ChatbotContainer() {
  const params = useParams()
  const { t } = useTranslation()
  const loadChat = useQuery<GetChatQuery>(GET_CHAT, {
    fetchPolicy: 'no-cache',
    variables: { uuid: params.uuid },
  })
  const { data: getChat, error, loading } = loadChat
  const [getMessages] = useLazyQuery<AllMessagesQuery>(ALL_MESSAGES)
  const [chat, setChat] = useState<QueriedChat>()
  const [dialogue, setDialogue] = useState<DialogueType>()
  const [msgLoad, setMsgLoad] = useState(false)
  const { HookAlert, setAlert, clearAlert } = useAlert()
  const feature = useFeature()

  const queryMessage = useCallback(() => {
    setMsgLoad(true)
    clearAlert()
    void getMessages({
      fetchPolicy: 'no-cache',
      variables: { chat_uuid: params.uuid },
    })
      .then(({ data }) => {
        const result = data?.allMessages
        if (result) {
          const initDialogue: DialogueType = {
            isChecking: false,
            unsaved: {},
            unsent: {},
            messages: result.map((msg, id) => {
              const { answer, question } = msg
              if (question) {
                return createMessage({
                  content: question.prompt,
                  id,
                  isSaved: true,
                  timestamp: new Date(question.created).getTime(),
                })
              }
              return createResponse(answer.inference, id, answer.timestamp)
            }),
          }
          setDialogue(initDialogue)
        }
      })
      .catch((err: GraphQLError) => setAlert({ message: err.message }))
      .finally(() => setMsgLoad(false))
  }, [params.uuid, getMessages]) // eslint-disable-line

  useEffect(() => {
    setDialogue(undefined)
    const existent = getChat?.getChat || null
    if (existent) {
      logger.info(`existent ${JSON.stringify(existent)}`)
      setChat(existent)
      queryMessage()
    }
  }, [getChat, queryMessage])

  useEffect(() => {
    if (error) setAlert({ message: error.message })
  }, [error]) // eslint-disable-line

  if (loading || msgLoad)
    return (
      <Flex className="column">
        <Flex flexStyle={{ placeContent: 'center' }}>{t('LOADING_DATA')}</Flex>
        <br />
        <SkeletonLoader
          className="bg-secondary"
          flexStyle={{ height: '2rem', width: '40rem', maxWidth: '98%' }}
        />
      </Flex>
    )

  if (error)
    return (
      <Flex>
        <HookAlert />
      </Flex>
    )
  if (!chat || !dialogue) return null
  return (
    <Flex flexStyle={style.historyChatContent}>
      <SourceDataContainer
        initialDialogue={dialogue}
        chatUuid={params.uuid || ''}
        feature={feature}
      />
      <DialogueContainer
        initialDialogue={dialogue}
        chatUuid={params.uuid || ''}
        feature={feature}
      />
    </Flex>
  )
}
export default ChatbotContainer
