import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'

import { Flex } from '~components'
import { useApp } from '~contexts/AppProvider'
import { logger } from '~utils/config.utils'

import { GET_LAST_CHAT, GetLastChatQuery } from './graphql'
import { checkIsDialogue } from './helpers'
import { DialogueType } from './useDialogue'
import useFeature, { Feature } from './useFeature'

export type ChatReturnType = {
  chatUuid: string
  feature: Feature
  initialDialogue: DialogueType | undefined
  sessionSave?: ({ dialogue }: { dialogue: DialogueType }) => void
  setChatUUid?: (id: string) => void
}

type ChatProviderType = {
  children: ({
    chatUuid,
    feature,
    initialDialogue,
    sessionSave,
    setChatUUid,
  }: ChatReturnType) => ReactNode
}
const DIALOGUE_SESSION_KEY = 'main_dialogue'
const CHAT_SESSION_KEY = 'main_chat'
/**
 * ChatProvider
 * @provider
 * @module ChatModule
 * @description
 * Provider for chat infos to the containers
 *
 */
function ChatProvider(props: ChatProviderType) {
  const { children } = props
  const { save, getSession } = useApp()
  const feature = useFeature()
  const [chatUuid, setChatUUid] = useState<string>(
    (getSession(CHAT_SESSION_KEY) as string) || '',
  )
  const { data: chatQuery } = useQuery<GetLastChatQuery>(GET_LAST_CHAT)

  const initialDialogue = useMemo(() => {
    const data = getSession(DIALOGUE_SESSION_KEY)
    if (checkIsDialogue(data)) return data
    return undefined
  }, [getSession])

  const sessionSave = useCallback(
    ({ dialogue }: { dialogue: DialogueType }) => {
      save(DIALOGUE_SESSION_KEY, dialogue)
    },
    [save],
  )

  useEffect(() => {
    const lastChat = chatQuery?.getLastChat
    if (!chatUuid && lastChat) {
      logger.info(`[chat-provider] last chat`)
      feature.setFeature({ ...lastChat })
    }
  }, [chatUuid, chatQuery]) // eslint-disable-line

  return (
    <Flex className="column">
      {children({
        chatUuid,
        feature,
        initialDialogue,
        sessionSave,
        setChatUUid(id: string) {
          save(CHAT_SESSION_KEY, id)
          setChatUUid(id)
        },
      })}
    </Flex>
  )
}
export default ChatProvider
