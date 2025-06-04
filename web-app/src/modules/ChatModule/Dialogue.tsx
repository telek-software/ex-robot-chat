import { CSSProperties, useEffect, useRef } from 'react'

import { Flex, Icon } from '~components'

import style from './style'
import { Message } from './type'

type DiscussionType = {
  messages: Message[]
  unsaved: Record<number, boolean>
}

/**
 * Dialogue
 * @module ChatModule
 * @description
 * Single Dialogue Discussion
 *
 */
function Dialogue(props: DiscussionType) {
  const { messages, unsaved } = props
  const chatRef = useRef<HTMLDivElement>(null)
  const checkSameSender = (index: number, isResponse: boolean) => {
    return !(index === 0) && !!messages[index - 1].isResponse === !!isResponse
  }
  const getRadius = (isResponse: boolean) =>
    isResponse ? { borderTopLeftRadius: '0' } : { borderTopRightRadius: '0' }

  const getPos = (isResponse: boolean): CSSProperties | undefined =>
    isResponse ? undefined : { alignSelf: 'flex-end' }

  useEffect(() => {
    if (chatRef) {
      chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight })
    }
  }, [messages])
  return (
    <Flex
      className="bg-reverse radius"
      flexStyle={style.discussion}
      ref={chatRef}>
      {messages.map(({ content, isResponse = false, timestamp, id }, index) => (
        <Flex
          style={getPos(isResponse)}
          key={`${timestamp}-${index}`}
          flexStyle={style.message}>
          {!checkSameSender(index, isResponse) && (
            <>
              <Flex
                style={{
                  placeSelf: isResponse ? '' : 'flex-end',
                }}
                flexStyle={style.contentSender}>
                <Icon
                  name={isResponse ? 'SmartToy' : 'Person'}
                  style={{
                    backgroundColor: isResponse
                      ? 'var(--color-tertiary)'
                      : 'var(--color-primary)',
                    borderRadius: '100%',
                    padding: '0.3rem',
                  }}
                  size="2rem"
                  flexStyle={style.contentSenderIcon}
                />
                <Flex flexStyle={{ color: 'var(--color-disabled)' }}>
                  {isResponse && 'ChatBot'}
                </Flex>
              </Flex>
            </>
          )}
          <Flex
            flexStyle={{
              placeItems: 'center',
              margin: isResponse ? '0rem 2rem' : '0 0 0 2rem',
            }}>
            <Flex
              style={getRadius(isResponse)}
              className="shadow"
              flexStyle={style.content}>
              {content}
            </Flex>
            {!isResponse && unsaved[id] && (
              <Icon name="HistoryToggleOff" size="1.4rem" />
            )}
            {!isResponse && !unsaved[id] && <Icon name="Check" size="1.4rem" />}
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}
export default Dialogue
