import { useMemo, useReducer } from 'react'
import { useTranslation } from 'react-i18next'

import { logger } from '~utils/config.utils'
import { ActionType } from '~utils/type.utils'

import { createMessage, createResponse } from './helpers'
import { Message } from './type'

const ACTIONS = <const>{
  ADD_ANSWER: 'addAnswer',
  ADD_MESSAGE: 'addMessage',
  CLEAR: 'clear',
  CONFIRM_MESSAGE: 'confirmMessage',
  DISQUALIFY_MESSAGE: 'disqualifyMessage',
  INIT_DIALOGUE: 'initDialogue',
}

export type DialogueType = {
  isChecking: boolean
  messages?: Message[]
  unsaved: Record<number, boolean>
  unsent: Record<number, string | undefined>
}

const initialDialogue: DialogueType = <const>{
  isChecking: false,
  unsaved: {},
  unsent: {},
}

type DialogAction = ActionType<{
  message?: string
  timestamp?: number
  id?: number
  dialogue?: DialogueType
}>

/**
 * dialogueReducer
 * @module ChatModule
 * @reducer
 * @description
 * Manage the state of a dialogue
 */
function dialogueReducer(
  state: DialogueType,
  action: DialogAction,
): DialogueType {
  switch (action.type) {
    case ACTIONS.INIT_DIALOGUE: {
      const { dialogue } = action.payload
      if (dialogue) return dialogue
      return initialDialogue
    }

    case ACTIONS.ADD_MESSAGE: {
      const added = createMessage({
        content: action.payload.message,
        id: action.payload.id,
        timestamp: Date.now(),
      })
      return {
        ...state,
        isChecking: true,
        messages: [...(state.messages || []), added],
        unsaved: { ...state.unsaved, [action.payload.id || -1]: true },
      }
    }

    case ACTIONS.CONFIRM_MESSAGE: {
      return {
        ...state,
        isChecking: false,
        unsaved: { ...state.unsaved, [action.payload.id || -1]: false },
        unsent: { ...state.unsent, [action.payload.id || -1]: undefined },
      }
    }

    case ACTIONS.DISQUALIFY_MESSAGE: {
      return {
        ...state,
        isChecking: false,
        unsent: {
          ...state.unsent,
          [action.payload.id || -1]: action.payload.message,
        },
      }
    }

    case ACTIONS.ADD_ANSWER: {
      const added = createResponse(
        action.payload.message || '',
        action.payload.timestamp || Date.now(),
        action.payload.timestamp || Date.now(),
      )
      return { ...state, messages: [...(state.messages || []), added] }
    }

    default:
      return state
  }
}

/**
 *
 * useDialogue
 * @hook
 * @module ChatModule
 * @description
 * Hook for handling dialogue behaviors
 *
 */
export default function useDialogue(init?: DialogueType) {
  const { t } = useTranslation()
  const welcome = createResponse(t('long.WELCOME_TO_OUR_CHAT'), 0, Date.now())
  const initDialogue = init?.messages?.length
    ? init
    : { ...initialDialogue, messages: [welcome] }
  logger.info(initialDialogue)
  const [state, dispatch] = useReducer(dialogueReducer, initDialogue)
  logger.info(`end init dialogue: ${JSON.stringify(state)}`)

  return useMemo(
    () => ({
      isChecking: state.isChecking,
      unsaved: state.unsaved,
      unsent: state.unsent,
      messages: state.messages,
      addAnswer(answer: { timestamp: number; message: string }) {
        dispatch({ type: ACTIONS.ADD_ANSWER, payload: answer })
      },
      addMessage({ message, id }: { message: string; id: number }) {
        dispatch({ type: ACTIONS.ADD_MESSAGE, payload: { id, message } })
      },
      confirmMessage(id: number) {
        dispatch({ type: ACTIONS.CONFIRM_MESSAGE, payload: { id } })
      },
      disqualifyMessage({ id, message }: { id: number; message: string }) {
        dispatch({ type: ACTIONS.DISQUALIFY_MESSAGE, payload: { id, message } })
      },
      restore(dialogue: DialogueType) {
        dispatch({ type: ACTIONS.INIT_DIALOGUE, payload: { dialogue } })
      },
    }),
    [state],
  )
}
