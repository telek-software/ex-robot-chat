import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useSubscription } from '@apollo/client'
import { GraphQLError } from 'graphql'

import { Button, Collapse, Fieldset, Flex, Input } from '~components'
import useAlert from '~hooks/useAlert'
import { logger } from '~utils/config.utils'
import { formatChat } from '~utils/entity.utils'
import { Size } from '~utils/enum.utils'
import { randomNum } from '~utils/number.utils'

import { ChatReturnType } from './ChatProvider'
import { DEFAULT_CONTEXT } from './constants'
import Dialogue from './Dialogue'
import {
  AnswerListener,
  LISTEN_ANSWERS,
  POST_QUESTION,
  QuestionMutation,
} from './graphql'
import style from './style'
import useDialogue from './useDialogue'

/**
 * DialogueContainer
 * @module ChatModule
 * @description
 * Main container for chat
 *
 */
function DialogueContainer(props: ChatReturnType) {
  const { chatUuid, feature, initialDialogue, ...rest } = props
  const { t } = useTranslation()
  const { sessionSave = () => null, setChatUUid = () => null } = rest
  const { clearAlert, HookAlert, setAlert } = useAlert()
  const dialogue = useDialogue(initialDialogue)
  const inputRef = useRef<HTMLInputElement>(null)

  const answersListener = useSubscription<AnswerListener>(LISTEN_ANSWERS)

  const [input, setInput] = useState<string>('')
  const [context, setContext] = useState<string>(DEFAULT_CONTEXT)
  const [postQuestion] = useMutation<QuestionMutation>(POST_QUESTION)
  const handleChange = (e: unknown) => {
    setInput(e as string)
  }
  const handlePost = () => {
    if (dialogue.isChecking) return
    clearAlert()
    const message = input.trim()
    if (!message) return
    setInput('')
    const messageId = randomNum()
    dialogue.addMessage({ message, id: messageId })
    const variables = {
      postQuestionInput: {
        ...formatChat({ ...feature, chatUuid }),
        prompt: input,
        context,
      },
    }
    postQuestion({ variables })
      .then(({ data }) => {
        logger.info(`[dial-container] handlePost data: ${JSON.stringify(data)}`)
        if (data?.postQuestion.isSent) {
          const { chat_uuid: nextID } = data.postQuestion
          dialogue.confirmMessage(messageId)
          logger.info(`[dial-container] saving ${JSON.stringify(dialogue)}`)
          if (!chatUuid) setChatUUid(nextID)
        }
      })
      .catch((error: GraphQLError) => {
        logger.error(`[dial-container] handlePost Error: ${error.message}`)
        setAlert({ message: error.message })
        dialogue.disqualifyMessage({ id: messageId, message })
      })
      .finally(() => inputRef.current?.focus())
  }

  const onAnswered = ({ subscribeAnswer }: AnswerListener) => {
    const { inference, timestamp } = subscribeAnswer
    logger.info('___onAnswered')
    logger.info(subscribeAnswer)
    logger.info(chatUuid)
    if (subscribeAnswer.chat_uuid === chatUuid) {
      logger.info(`[dial-container] Answer: ${JSON.stringify(answersListener)}`)
      dialogue.addAnswer({
        message: inference,
        timestamp,
      })
    }
  }

  useEffect(() => {
    sessionSave({ dialogue })
  }, [dialogue]) // eslint-disable-line

  useEffect(() => {
    const { data, error, loading } = answersListener
    if (!error && !loading && !!data) onAnswered(data)
    else if (error) setAlert({ message: error.message })
  }, [answersListener]) // eslint-disable-line

  return (
    <Flex flexStyle={style.chat}>
      <Flex flexStyle={style.context}>
        <Collapse
          label={t('CHATBOT_CONTEXT')}
          className="fg hollow"
          flexStyle={style.contextCollapse}>
          <Input
            textareaMode
            flexStyle={style.contextText}
            value={context}
            onChange={(e) => setContext(e as string)}
          />
        </Collapse>
      </Flex>
      <HookAlert />
      <Dialogue messages={dialogue.messages || []} unsaved={dialogue.unsaved} />
      <Flex flexStyle={style.chatInput}>
        <Input
          ref={inputRef}
          onEnterPress={handlePost}
          flexStyle={{ flexGrow: '1' }}
          value={input}
          onChange={handleChange}
        />
        <Button
          icon="Send"
          size={Size.xs}
          onClick={handlePost}
          flexStyle={{ margin: 0 }}
          disabled={dialogue.isChecking || !input.trim().length}
        />
      </Flex>
    </Flex>
  )
}
export default DialogueContainer
