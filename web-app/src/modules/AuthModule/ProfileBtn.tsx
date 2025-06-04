import { Button } from '~components'
import { Size } from '~utils/enum.utils'

import style from './style'

/**
 * Profile
 * @description
 * Profile Component
 *
 */
function Profile() {
  return (
    <Button
      flexStyle={style.authSmallBtn}
      size={Size.xs}
      className="bg boxed"
      icon="Person"
    />
  )
}
export default Profile
