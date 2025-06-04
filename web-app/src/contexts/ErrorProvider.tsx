import { createContext, useContext, useMemo, useState } from 'react'

import { DefaultProps } from '~utils/type.utils'

export interface ErrorInterface {
  errorMessage?: string
  errorType?: 'client' | 'notFound' | 'server' | 'denied'
  hasError: boolean
  resetError: () => void
  setError: (
    errorType: Required<ErrorInterface['errorType']>,
    message: string,
  ) => void
}

const ErrorContext = createContext<ErrorInterface | null>(null)

/** @constructor */
export function createError(param: Partial<ErrorInterface>): ErrorInterface {
  const fn = () => {}
  return {
    errorMessage: param.errorMessage || '',
    errorType: param.errorType,
    hasError: param.hasError || false,
    resetError: param.resetError || fn,
    setError: param.setError || fn,
  }
}

/**
 * ErrorProvider
 * @context
 * @description
 * Manages the global errors in the App
 */
function ErrorProvider(props: DefaultProps) {
  const { children } = props
  const [errorType, setErrorType] = useState<ErrorInterface['errorType']>()
  const [errorMessage, setErrorMessage] = useState('')
  const value = useMemo(
    () =>
      createError({
        errorMessage,
        errorType,
        hasError: !!errorType,
        resetError() {
          setErrorType(undefined)
          setErrorMessage('')
        },
        setError(nextType: ErrorInterface['errorType'], nextMessage: string) {
          setErrorType(nextType)
          setErrorMessage(nextMessage)
        },
      }),
    [errorType, errorMessage],
  )

  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
}

export default ErrorProvider

/** @hook */
export const useError = () => {
  const context = useContext(ErrorContext)
  if (!context) throw new Error('useError must be called inside ErrorProvider')
  return context
}
