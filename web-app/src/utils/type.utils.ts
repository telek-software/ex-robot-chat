import { CSSProperties, FunctionComponent, ReactNode } from 'react'

import { ResponsiveStyle } from '~lib/styled-components'

export type Primitive = string | number | boolean
export type AnyObject<T = unknown> = { [key: string]: T }
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type ValueOf<T> = T[keyof T]
export type FunctionType<T = unknown, P = unknown> = (...argv: T[]) => P
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}
export type DefaultProps = {
  flexStyle?: ResponsiveStyle
  children?: ReactNode
  className?: string
  id?: string
  style?: CSSProperties
  testId?: string
}

export type RenderProps<T = object> = Omit<DefaultProps, 'children'> & {
  children: (v: FunctionComponent<T>) => ReactNode
}

export type ActionType<T = Record<string, unknown>> = {
  type: string
  payload: T
}

export type UserType = {
  email: string
  username: string
}
