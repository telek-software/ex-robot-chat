import { ReactNode, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { AppProvider, AuthProvider, ErrorProvider } from '~contexts'
import { GraphQLProvider } from '~lib/apollo-graphQL'
import { StyledProvider } from '~lib/styled-components'

import '~lib/i18n/init'

import App from './App'

import 'normalize.css'
import './index.css'

export const ContextsProviders = ({ children }: { children: ReactNode }) => (
  <ErrorProvider>
    <GraphQLProvider>
      <AuthProvider>
        <AppProvider>
          <StyledProvider>{children}</StyledProvider>
        </AppProvider>
      </AuthProvider>
    </GraphQLProvider>
  </ErrorProvider>
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextsProviders>
      <App />
    </ContextsProviders>
  </StrictMode>,
)
