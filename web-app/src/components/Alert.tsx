import { useEffect, useState } from 'react'

import { StyledAlert, StyledButton } from '~lib/styled-components'
import { Status } from '~utils/enum.utils'
import { DefaultProps } from '~utils/type.utils'

type AlertType = DefaultProps & {
  message: string
  title?: string
  status?: Status
  onClose?: () => void
}

function Alert(props: AlertType) {
  const { className, message, onClose, title, ...restProps } = props
  const { status = Status.danger, ...rest } = restProps
  const isOpen = message.length !== 0
  const [isAlertOpen, toggleOpen] = useState(isOpen)
  const closeAlert = () => {
    toggleOpen(false)
    if (onClose) onClose()
  }
  useEffect(() => {
    toggleOpen(isOpen)
  }, [isOpen, message, status])
  return (
    <StyledAlert
      {...rest}
      className={`${className} column bg-${status} ${isAlertOpen && 'open'}`}>
      <div className="content">
        {title && <strong>{title}:&nbsp;</strong>}
        {Array.isArray(message) ? (
          <ul>
            {message.map((row) => (
              <li key={row}>{row}</li>
            ))}
          </ul>
        ) : (
          <span className="text-message">{message}</span>
        )}
      </div>
      <StyledButton
        style={{
          height: '1.5rem',
          borderRadius: 'var(--radius)',
          width: '1.5rem',
          opacity: '0.65',
          lineHeight: '50%',
        }}
        type="button"
        className=""
        onClick={closeAlert}>
        &times;
      </StyledButton>
    </StyledAlert>
  )
}

export default Alert
