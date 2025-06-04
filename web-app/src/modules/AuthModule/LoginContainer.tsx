import { ReactNode, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { useAuth } from '~contexts/AuthProvider'

import { CHECK_AUTH, SIGN_IN } from './graphql'
import Login from './Login'
import { AuthErrorCB, AuthType, CheckMutation, LoginMutation } from './types'

/**
 * LoginContainer
 * @description
 * Return a form if not authenticated
 *
 */
function LoginContainer({ children }: { children: ReactNode }) {
  const { isAuthenticated, sessionToken, setAuth, clearSession } = useAuth()
  const [checkAuth, { loading: checkLoad }] =
    useMutation<CheckMutation>(CHECK_AUTH)
  const [basicAuth, { loading }] = useMutation<LoginMutation>(SIGN_IN)

  const authent = (form: AuthType, onError: AuthErrorCB) => {
    basicAuth({ variables: { basicAuthInput: form } })
      .then((response) => response.data && setAuth(response.data.basicAuth))
      .catch(onError)
  }
  useEffect(() => {
    if (sessionToken) {
      void checkAuth()
        .then((response) => {
          if (!response.data?.checkAuth) clearSession()
          else
            setAuth({ ...response.data.checkAuth, accessToken: sessionToken })
        })
        .catch(() => {
          clearSession()
        })
    }
  }, []) // eslint-disable-line

  if (isAuthenticated) return <>{children}</>

  return <Login authent={authent} loading={loading || checkLoad} />
}
export default LoginContainer
