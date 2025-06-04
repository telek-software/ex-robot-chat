import { Button } from '~components'
import { useAuth } from '~contexts/AuthProvider'
import { Size } from '~utils/enum.utils'

import style from './style'

/**
 * LogoutBtn
 * @description
 * LogoutBtn Component
 *
 */
function LogoutBtn() {
  const { clearSession } = useAuth()
  return (
    <Button
      size={Size.xs}
      flexStyle={style.authSmallBtn}
      className="bg boxed"
      onClick={clearSession}
      icon="Logout"
    />
  )
}
export default LogoutBtn
