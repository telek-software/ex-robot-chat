import { createContext, useContext, useMemo, useState } from 'react'

import { LoginType } from '~modules/AuthModule/types'
import { SESSION_KEY } from '~utils/config.utils'
import { DefaultProps } from '~utils/type.utils'

type AuthType = {
  username: string
  email: string
  accessToken: string
}
type AuthContextType = {
  auth?: AuthType
  clearSession: () => void
  isAuthenticated: boolean
  sessionToken: string | null
  setAuth: (user: AuthType) => void
}
const AuthContext = createContext<AuthContextType | null>(null)

/**
 * AuthProvider
 * @context
 */
function AuthProvider(props: DefaultProps) {
  const { children } = props
  const [auth, setAuth] = useState<AuthType>()
  const sessionToken = localStorage.getItem(SESSION_KEY)

  const value = useMemo(
    () => ({
      auth,
      isAuthenticated: !!auth?.accessToken,
      setAuth(authInfo: LoginType) {
        localStorage.setItem(SESSION_KEY, authInfo.accessToken)
        setAuth(authInfo)
      },
      sessionToken,
      clearSession() {
        localStorage.removeItem(SESSION_KEY)
        setAuth(undefined)
      },
    }),
    [auth, sessionToken],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context)
    throw new Error('The component calling useAuth must be inside AuthProvider')
  return context
}
