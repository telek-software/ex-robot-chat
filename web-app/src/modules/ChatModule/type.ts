import { ValueOf } from '~utils/type.utils'

import { SOURCE_TYPES } from './constants'

/**
 * @deprecated
 */
export type ParsedFeature = {
  api: string
  model: string
  maxTokens: number
  temperature: number
  chatUuid?: string
}
export type FormatedFeature = {
  api: string
  model: string
  max_tokens: number
  temperature: number
  chat_uuid?: string
}
export type ParsedChat = ParsedFeature & {
  chatUuid?: string
}
export type FormatedChat = FormatedFeature & {
  chat_uuid?: string
}
export type QueriedChat = FormatedFeature & {
  uuid: string
  created: string
}

export type Message = {
  timestamp: number
  content: string
  isResponse?: boolean
  id: number
  isSaved?: boolean
}

export type MessageType = {
  prompt: string
} & FormatedChat

export type SourceType = ValueOf<typeof SOURCE_TYPES>
