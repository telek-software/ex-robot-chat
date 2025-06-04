import {
  forwardRef,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  KeyboardEvent,
  Ref,
} from 'react'

import useEnsafe from '~hooks/useEnsafe'
import {
  ResponsiveStyle,
  StyledInput,
  StyledTextarea,
} from '~lib/styled-components'
import { enClassname } from '~utils/dom.utils'
import { Size, Status } from '~utils/enum.utils'
import { Primitive } from '~utils/type.utils'
import { checkIsBoolean } from '~utils/typeGuard.utils'

type InputAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>
type InputProps = InputAttributes & {
  className?: string
  flexStyle?: ResponsiveStyle
  isAsync?: boolean
  onChange: (value?: Primitive) => void
  size?: Size
  status?: Status
  onEnterPress?: () => void
  type?: HTMLInputTypeAttribute
  testId?: string
  textareaMode?: boolean
}

/**
 * Input
 * @component
 * @description
 * We can set isAsync at true to improve performance when we want to
 * execute an heavy task on each value update
 */
function Input(props: InputProps, ref: Ref<HTMLInputElement>) {
  const {
    className,
    defaultValue,
    flexStyle,
    isAsync,
    onChange,
    placeholder,
    onEnterPress,
    id,
    size = Size.md,
    status,
    type = 'text',
    value,
    testId,
    textareaMode,
    ...rest
  } = props

  const { ensafe } = useEnsafe()
  const safeChange = ensafe((input) => onChange(input as Primitive))

  const eventAdapter = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.type === 'checkbox') return event.target.checked
    return event.target.value
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAsync) safeChange(eventAdapter(event))
  }

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isAsync) safeChange(eventAdapter(event))
  }

  const style = status ? {} : {}
  const classed = enClassname([size], className)

  const inputProps = {
    ...rest,
    id,
    onKeyUp(e: KeyboardEvent<HTMLInputElement>) {
      if (e.key === 'Enter' && onEnterPress) onEnterPress()
    },
    $responsive: flexStyle,
    checked: checkIsBoolean(value) ? value : undefined,
    className: classed,
    'data-testId': testId,
    defaultValue: checkIsBoolean(value) ? undefined : defaultValue,
    onBlur: handleBlur,
    onChange: handleChange,
    placeholder,
    style,
    type,
    value: checkIsBoolean(value) ? undefined : value,
  }
  if (textareaMode) return <StyledTextarea ref={ref} {...inputProps} />
  return <StyledInput ref={ref} {...inputProps} />
}

export default forwardRef(Input)
