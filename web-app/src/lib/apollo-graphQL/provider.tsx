import { ReactNode } from 'react'
import { ApolloProvider } from '@apollo/client'

import { client } from './config'

/**
 * GraphQLProvider
 * @description
 * Provider for graphQL connection
 *
 */
function GraphQLProvider({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
export default GraphQLProvider
