import { act, renderHook } from '~utils/test.utils'

import { ErrorInterface, useError } from '../ErrorProvider'

test('ErrorContext', () => {
  const { result } = renderHook<ErrorInterface>(useError)
  expect(result.current).toEqual(
    expect.objectContaining({ errorMessage: '', errorType: undefined }),
  )
  expect(result.current).toEqual(
    expect.objectContaining({ errorMessage: '', errorType: undefined }),
  )
  act(() => {
    result.current.setError('client', 'Test Error')
  })
  expect(result.current).toEqual(
    expect.objectContaining({
      errorMessage: 'Test Error',
      errorType: 'client',
    }),
  )
  act(() => {
    result.current.resetError()
  })
  expect(result.current).toEqual(
    expect.objectContaining({
      errorMessage: '',
      errorType: undefined,
      hasError: false,
    }),
  )
  act(() => {
    result.current.setError('server', 'Test server error')
  })
  expect(result.current).toEqual(
    expect.objectContaining({
      errorMessage: 'Test server error',
      errorType: 'server',
      hasError: true,
    }),
  )
})
