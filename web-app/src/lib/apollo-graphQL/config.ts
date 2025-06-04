import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { Kind } from 'graphql'
import { createClient } from 'graphql-ws'

import { getSessionToken } from '~utils/config.utils'

const GQLEndpoints = {
  httpLink: createHttpLink({
    uri:
      `${import.meta.env.VITE_MAIN_API_URL}${import.meta.env.VITE_GRAPHQL}` ||
      'localhost:3000',
  }),
  wsLink: new GraphQLWsLink(
    createClient({
      url:
        `${import.meta.env.VITE_MAIN_WS_URL}${import.meta.env.VITE_GRAPHQL}` ||
        'localhost:3000',
      connectionParams: () => {
        const token = getSessionToken()
        if (!token) return {}
        return {
          Authorization: `Bearer ${token}`,
        }
      },
    }),
  ),
}

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === Kind.OPERATION_DEFINITION &&
      definition.operation.toString() === 'subscription'
    )
  },
  GQLEndpoints.wsLink,
  GQLEndpoints.httpLink,
)

const authLink = setContext((_, { headers }) => {
  const token = getSessionToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
})
