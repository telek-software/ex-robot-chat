import { ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'

import { Button, Flex, Link, Title } from '~components'
import useAlert from '~hooks/useAlert'
import { PATHS } from '~utils/config.utils'

import {
  ALL_CHATS,
  AllChatsQuery,
  POST_CHAT,
  PostChatMutation,
} from './graphql'
import { formatChat } from './helpers'
import style from './style'
import { QueriedChat } from './type'
import useFeature from './useFeature'

/**
 * ChatbotProvider
 * @module ChatModule
 * @provider
 * @description
 * Manage former Chats
 *
 */
function ChatbotProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation()
  const { data: historyQuery, refetch } = useQuery<AllChatsQuery>(ALL_CHATS)
  const [postChat] = useMutation<PostChatMutation>(POST_CHAT)
  const [chats, setChats] = useState<QueriedChat[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const { HookAlert, setAlert, clearAlert } = useAlert()
  const navigate = useNavigate()
  const feature = useFeature()
  const { pathname: p } = useLocation()

  const createChat = () => {
    clearAlert()
    setIsCreating(true)
    void postChat({
      variables: { postChatInput: { ...formatChat(feature) } },
    })
      .then(({ data }) => {
        if (!data?.postChat) return undefined
        const next = data.postChat
        navigate(PATHS.CHATBOT.concat(`/${next.uuid}`))
        void refetch()
      })
      .catch((error) => setAlert({ message: error as string }))
      .finally(() => setIsCreating(false))
  }

  useEffect(() => {
    const allChats = historyQuery?.allChats || []
    if (allChats.length) setChats(allChats)
  }, [historyQuery])

  return (
    <Flex flexStyle={style.history}>
      <Flex className="bg-info" flexStyle={style.historyList}>
        <Title as="h3" flexStyle={{ margin: '1rem auto' }}>
          {t('MY_CHATBOTS')}
        </Title>
        <Button
          className="bg-secondary hollow"
          icon="LibraryAdd"
          label={t('CREATE')}
          disabled={isCreating}
          onClick={createChat}
        />
        <br />
        {[...chats]
          .sort(
            ({ created: a }, { created: b }) =>
              new Date(b).getTime() - new Date(a).getTime(),
          )
          .map((chat) => (
            <Link
              key={chat.uuid}
              href={chat.uuid}
              className={`bg-secondary border ${
                p.includes(chat.uuid) ? '' : 'hollow'
              }`}
              flexStyle={style.historyLink}>
              {new Date(chat.created).toLocaleString()}
            </Link>
          ))}
      </Flex>
      <Flex className="column" flexStyle={style.historyChat}>
        <HookAlert />
        {children}
      </Flex>
    </Flex>
  )
}
export default ChatbotProvider
