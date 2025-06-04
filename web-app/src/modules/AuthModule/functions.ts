import { ApolloError } from '@apollo/client'

export const formatError = (
  error: ApolloError,
  translate: (str: string) => string,
) => {
  if (error.message === 'Not Found')
    return { message: translate('AUTH_FAILED') }

  if (error.graphQLErrors[0]?.extensions.code === 'INTERNAL_SERVER_ERROR')
    return {
      title: translate('LOGIN_ERROR'),
      message: translate('AUTH_ERROR'),
    }
  return { message: error.message }
}
