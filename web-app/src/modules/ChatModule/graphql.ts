import { gql } from '@apollo/client'

import { QueriedChat } from './type'

const CHAT_FRAGMENT = gql`
  fragment ChatFragment on ChatOutput {
    uuid
    api
    model
    temperature
    max_tokens
    name
    created
  }
`

const ANSWER_FRAGMENT = gql`
  fragment AnswerFragment on AnswerOutput {
    inference
    chat_uuid
    timestamp
  }
`

/**
 * PostQuestion
 */
export const POST_QUESTION = gql`
  mutation postQuestion($postQuestionInput: PostQuestionInput!) {
    postQuestion(postQuestionInput: $postQuestionInput) {
      isSent
      chat_uuid
    }
  }
`
export type QuestionMutation = {
  postQuestion: {
    isSent: boolean
    chat_uuid: string
  }
}

/**
 * PostChat
 */
export const POST_CHAT = gql`
  ${CHAT_FRAGMENT}
  mutation postChat($postChatInput: PostChatInput!) {
    postChat(postChatInput: $postChatInput) {
      ...ChatFragment
    }
  }
`
export type PostChatMutation = {
  postChat: QueriedChat
}

/**
 * ObserveAnswer
 */
export const LISTEN_ANSWERS = gql`
  ${ANSWER_FRAGMENT}
  subscription {
    subscribeAnswer {
      ...AnswerFragment
    }
  }
`
export type AnswerListener = {
  subscribeAnswer: {
    inference: string
    chat_uuid: string
    timestamp: number
  }
}

/**
 * ObserveEmbedded
 */
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

/**
 * GetChat
 */
export const GET_CHAT = gql`
  ${CHAT_FRAGMENT}
  query getChat($uuid: String!) {
    getChat(uuid: $uuid) {
      ...ChatFragment
    }
  }
`
export type GetChatQuery = {
  getChat: QueriedChat
}

/**
 * LastChat
 */
export const GET_LAST_CHAT = gql`
  ${CHAT_FRAGMENT}
  query getLastChat {
    getLastChat {
      ...ChatFragment
    }
  }
`
export type GetLastChatQuery = {
  getLastChat: QueriedChat
}

/**
 * AllChats
 */
export const ALL_CHATS = gql`
  ${CHAT_FRAGMENT}
  query allChats {
    allChats {
      ...ChatFragment
    }
  }
`
export type AllChatsQuery = {
  allChats: QueriedChat[]
}

/**
 * AllMessages
 *
 * @description
 * Get Answer XOR Question
 */
export const ALL_MESSAGES = gql`
  query allMessages($chat_uuid: String!) {
    allMessages(chat_uuid: $chat_uuid) {
      answer {
        inference
        timestamp
      }
      question {
        prompt
        created
      }
    }
  }
`
export type AllMessagesQuery = {
  allMessages: {
    answer: AnswerListener['subscribeAnswer']
    question: {
      prompt: string
      created: string
    }
  }[]
}

/**
 * PostDocument
 */
export const POST_EMBEDDING = gql`
  mutation postEmbedding($postEmbeddingInput: PostEmbeddingInput!) {
    postEmbedding(postEmbeddingInput: $postEmbeddingInput) {
      isSent
      chat_uuid
      doc
    }
  }
`
export type EmbeddingMutation = {
  postEmbedding: {
    isSent: boolean
    chat_uuid: string
    doc: string
  }
}
