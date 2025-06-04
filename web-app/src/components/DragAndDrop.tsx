import {
  ChangeEvent,
  CSSProperties,
  type DragEvent,
  useRef,
  useState,
} from 'react'

import { ResponsiveStyle, StyledDragAndDrop } from '~lib/styled-components'
import { DefaultProps } from '~utils/type.utils'

import Icon from './Icon'

type DragAndDropProps = DefaultProps & {
  clickable?: boolean
  flexStyle?: ResponsiveStyle
  onDragEnd?: () => void
  onDragOver?: () => void
  onDragStart?: () => void
  onDrop?: (e?: FileList) => void
  placeholder?: string
}

/**
 * DragAndDrop
 * @component
 */
function DragAndDrop(props: DragAndDropProps) {
  const {
    testId,
    id,
    children,
    clickable,
    flexStyle,
    onDragEnd = () => null,
    onDragOver = () => null,
    onDragStart = () => null,
    onDrop = () => null,
    placeholder,
    className,
    style,
  } = props
  const uploadRef = useRef<HTMLInputElement>(null)
  const [isDragging, toggleIsDragging] = useState(false)
  const syncClick = () => {
    if (clickable && uploadRef.current) uploadRef.current.click()
  }

  const handleAction = (
    e: DragEvent<HTMLDivElement> | ChangeEvent<HTMLInputElement>,
    callback: (f?: FileList) => void,
    onGoing: boolean,
  ) => {
    e.preventDefault()
    e.stopPropagation()
    if (!onGoing || onGoing !== isDragging) {
      toggleIsDragging(onGoing)
      const data = 'dataTransfer' in e ? e.dataTransfer : e.target
      const { files } = data
      callback(files || undefined)
    }
  }

  const outline: CSSProperties['outline'] = isDragging
    ? '2px solid var(--color-primary)'
    : 'unset'

  return (
    <StyledDragAndDrop
      id={id}
      $responsive={flexStyle}
      className={className}
      data-testId={testId}
      draggable="true"
      onClick={syncClick}
      style={{ ...style, outline }}
      onDragEnd={(e: DragEvent<HTMLDivElement>) =>
        handleAction(e, onDragEnd, false)
      }
      onDragOver={(e: DragEvent<HTMLDivElement>) =>
        handleAction(e, onDragOver, true)
      }
      onDragStart={onDragStart}
      onDrop={(e: DragEvent<HTMLDivElement>) => handleAction(e, onDrop, false)}>
      <span className="placeholder">
        <Icon name="DragIndicator" size="1.3rem" />
        {placeholder}
      </span>
      {children}
      <input
        className="upload"
        ref={uploadRef}
        type="file"
        onChange={(e) => handleAction(e, onDrop, false)}
      />
    </StyledDragAndDrop>
  )
}

export default DragAndDrop
