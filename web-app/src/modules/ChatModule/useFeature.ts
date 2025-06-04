import { useMemo, useReducer } from 'react'

import { ActionType } from '~utils/type.utils'

const ACTIONS = <const>{
  CLEAR: 'clear',
  SET_FEATURE: 'seatF',
}

export type Feature = {
  api: string
  maxTokens: number
  temperature: number
  model: string
}

const createFeature = (nextFeature?: Partial<Feature>): Feature => {
  return {
    api: nextFeature?.api || 'OpenAI',
    maxTokens: nextFeature?.maxTokens || 400,
    temperature: nextFeature?.temperature || 0,
    model: nextFeature?.model || 'text-davinci-003',
  }
}

const featureReducer = (
  state: Feature,
  action: ActionType<Partial<Feature>>,
) => {
  switch (action.type) {
    case ACTIONS.CLEAR:
      return createFeature()
    case ACTIONS.SET_FEATURE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

/**
 * useFeature
 * @module ChatModule
 * @description
 * Set the Feature for the current chat
 *
 */
export default function useFeature() {
  const [state, dispatch] = useReducer(featureReducer, createFeature())
  return useMemo(
    () => ({
      api: state.api,
      maxTokens: state.maxTokens,
      temperature: state.temperature,
      model: state.model,
      setFeature(feature: Partial<Feature>) {
        dispatch({ type: ACTIONS.SET_FEATURE, payload: createFeature(feature) })
      },
    }),
    [state],
  )
}
