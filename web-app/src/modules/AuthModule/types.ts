import { ApolloError } from '@apollo/client'

import { UserType } from '~utils/type.utils'

export type LoginType = UserType & {
  accessToken: string
}

export type LoginMutation = { basicAuth: LoginType }

export type CheckMutation = { checkAuth: UserType }

export type AuthType = {
  email: string
  password: string
}

export type AuthErrorCB = (error: ApolloError) => void
