import { useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { ApolloError } from '@apollo/client'

import {
  Button,
  Fieldset,
  Flex,
  Form,
  Image,
  Input,
  SkeletonLoader,
} from '~components'
import useAlert from '~hooks/useAlert'
import { Size } from '~utils/enum.utils'

import { formatError } from './functions'
import {
  checkLoginValid,
  loginActions,
  loginForm,
  LoginReducer,
  loginReducer,
} from './reducers'
import style from './style'
import { AuthErrorCB, AuthType } from './types'

type LoginProps = {
  authent: (form: AuthType, onError: AuthErrorCB) => void
  loading: boolean
}

/**
 * Login
 * @description
 * The Main login form
 *
 */
function Login(props: LoginProps) {
  const { authent, loading } = props
  const { t } = useTranslation()
  const [state, dispatch] = useReducer<LoginReducer>(loginReducer, loginForm)
  const { HookAlert, setAlert, clearAlert } = useAlert()
  const valid = checkLoginValid(state)
  const handleClick = () => {
    const { email, password } = state
    const input = { email: email.value, password: password.value }
    clearAlert()
    const onError = (error: ApolloError) => setAlert(formatError(error, t))
    authent(input, onError)
  }
  return (
    <Flex as="section" flexStyle={style.login}>
      <Flex href="/" flexStyle={style.loginTitle} className="color-secondary">
        <Image src="/nianexa2-light.png" width="100%" />
      </Flex>
      <Form
        flexStyle={style.loginForm}
        className="bg-primary color-secondary shadow-hight">
        <HookAlert />
        {Object.keys(loginActions).map((act) => (
          <Fieldset key={act} legend={t(act)}>
            {(loading && <SkeletonLoader className="bg-secondary" />) || (
              <Input
                value={state[loginActions[act]].value}
                type={loginActions[act]}
                size={Size.lg}
                onEnterPress={handleClick}
                onChange={(str) =>
                  dispatch({
                    payload: str as string,
                    type: loginActions[act],
                  })
                }
              />
            )}
          </Fieldset>
        ))}
        <Button
          icon="Login"
          label={t('LOGIN')}
          disabled={!valid}
          onClick={handleClick}
        />
        <br />
      </Form>
    </Flex>
  )
}
export default Login
