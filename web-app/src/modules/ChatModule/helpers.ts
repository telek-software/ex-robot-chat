import checkIsObject, { checkIsArray } from '~utils/typeGuard.utils'

import { FormatedChat, Message, ParsedChat } from './type'
import { DialogueType } from './useDialogue'

export function formatChat(chat: ParsedChat): FormatedChat {
  return {
    api: chat.api,
    model: chat.model,
    max_tokens: chat.maxTokens,
    temperature: chat.temperature,
    chat_uuid: chat.chatUuid,
  }
}

export function getDocFormData(infos: {
  chat: ParsedChat
  upload: File
  sourceType: string
}) {
  const formData = new FormData()
  formData.append('upload', infos.upload, infos.upload.name)
  formData.append('source', infos.sourceType)
  formData.append('api', infos.chat.api)
  formData.append('model', infos.chat.model)
  formData.append('max_tokens', infos.chat.maxTokens.toString())
  formData.append('temperature', infos.chat.temperature.toString())
  formData.append('chat_uuid', infos.chat.chatUuid || '')
  return formData
}

export function getDocInput(infos: {
  chat: ParsedChat
  value: string
  sourceType: string
}) {
  return {
    ...formatChat(infos.chat),
    value: infos.value,
    source: infos.sourceType,
  }
}

export const createMessage = ({
  content = '',
  id = 0,
  isSaved = false,
  timestamp = Date.now(),
}): Message => ({
  isResponse: false,
  content,
  timestamp: timestamp || Date.now(),
  id,
  isSaved,
})

export function createResponse(
  content: string,
  id: number,
  timestamp: number,
): Message {
  return {
    content,
    isResponse: true,
    isSaved: true,
    id,
    timestamp,
  }
}

export function checkIsDialogue(data: unknown): data is DialogueType {
  if (!checkIsObject(data)) return false
  if (!('unsaved' in data)) return false
  if (!('unsent' in data)) return false
  if (!('isChecking' in data)) return false
  if (!('messages' in data)) return false
  if (!checkIsArray(data.messages)) return false
  if (checkIsObject(data.messages[0])) {
    if ('content' in data.messages[0]) {
      return true
    }
  }
  return false
}
