import { useEffect, useState } from 'react'

import Alert from '~components/Alert'
import { Status } from '~utils/enum.utils'
import { DefaultProps } from '~utils/type.utils'

type AlertType = {
  message: string
  title?: string
  status?: Status
}

/**
 * useAlert
 * @hook
 * @description {Object}
 *         {Function} Object.createAlert | An alert builder
 *                  {String} Object.setAlert.message | Alert content
 *                  {String ?} Object.setAlert.title | Alert title
 *                  {String} Object.setAlert.status | define the color of the alert
 *         {Function} clearAlert | An alert cleaner
 *         {Component} HookAlert | it display the Alert (it does not need any argument)
 *
 */
function useAlert() {
  const defaultAlert = { message: '' }
  const [currentAlert, setAlert] = useState<AlertType>(defaultAlert)

  const closeAlert = () => setAlert(defaultAlert)

  useEffect(() => {
    return () => closeAlert()
  }, []) // eslint-disable-line

  return {
    setAlert,
    clearAlert: closeAlert,
    HookAlert: (alertProps: DefaultProps) => (
      <Alert {...alertProps} onClose={closeAlert} {...currentAlert} />
    ),
  }
}

export default useAlert
