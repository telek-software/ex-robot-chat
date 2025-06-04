import { Reducer } from 'react'

import { checkEmail } from '~utils/string.utils'

type Action = { type: string; payload: string }
type LoginForm = Record<string, { isValid: boolean; value: string }>
export type LoginReducer = Reducer<LoginForm, Action>

export const loginForm: LoginForm = {
  email: {
    isValid: false,
    value: '',
  },
  password: {
    isValid: false,
    value: '',
  },
}
export const loginActions: Record<string, keyof LoginForm> = {
  EMAIL: 'email',
  PASSWORD: 'password',
} as const

export const checkLoginValid = (form: LoginForm) =>
  !Object.values(form).some((item) => !item.isValid)

export function loginReducer(state: LoginForm, action: Action) {
  if (action.type === loginActions.EMAIL) {
    const email = { isValid: false, value: action.payload }
    email.isValid = checkEmail(email.value || '')
    return { ...state, email }
  }
  if (action.type === loginActions.PASSWORD) {
    const password = { isValid: false, value: action.payload }
    password.isValid = (password.value?.length || 0) >= 8
    return { ...state, password }
  }
  throw Error('Unknown action.')
}
