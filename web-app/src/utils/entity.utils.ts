import { gql } from '@apollo/client'

export type PrompType = {
  timestamp: number
  content: string
  isResponse?: boolean
  id: number
  isSaved?: boolean
}

export const createMessage = ({
  content = '',
  id = -1,
  isResponse = false,
  isSaved = false,
  timestamp = Date.now(),
}): PrompType => ({
  isResponse,
  content,
  timestamp: timestamp || Date.now(),
  id,
  isSaved,
})

export type AnswerListener = {
  subscribeAnswer: {
    inference: string
    chat_uuid: string
    error?: string
    timestamp: number
  }
}
export type MessageMutation = {
  postMessage: {
    isSent: boolean
    chat_uuid: string
  }
}

export const POST_MESSAGE = gql`
  mutation postMessage($postMessageInput: PostMessageInput!) {
    postMessage(postMessageInput: $postMessageInput) {
      isSent
      chat_uuid
    }
  }
`
export const LISTEN_ANSWERS = gql`
  subscription {
    subscribeAnswer {
      inference
      error
      chat_uuid
      timestamp
    }
  }
`

export const LISTEN_EMBEDDED_STATE = gql`
  subscription {
    subscribeEmbedded {
      statusCode
      chat_uuid
      error
    }
  }
`
export type EmbeddedListener = {
  subscribeEmbedded: {
    statusCode: number
    chat_uuid: string
    error: string
  }
}
export function createResponse(
  content: string,
  id: number,
  timestamp: number,
): PrompType {
  return {
    content,
    isResponse: true,
    isSaved: true,
    id,
    timestamp,
  }
}

export type ParsedChat = {
  api: string
  model: string
  maxTokens: number
  temperature: number
  chatUuid?: string
}
export type FormatedChat = {
  api: string
  model: string
  max_tokens: number
  temperature: number
  chat_uuid?: string
}

export function formatChat(chat: ParsedChat): FormatedChat {
  return {
    api: chat.api,
    model: chat.model,
    max_tokens: chat.maxTokens,
    temperature: chat.temperature,
    chat_uuid: chat.chatUuid,
  }
}
