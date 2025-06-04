import { useError } from '~contexts/ErrorProvider'
import { FunctionType } from '~utils/type.utils'

/**
 * useEnsafe
 * @ensafe the use of an asynchronious function
 *
 */
function useEnsafe() {
  const { setError } = useError()

  const ensafe =
    (fn: FunctionType) =>
    (...params: unknown[]) => {
      try {
        fn(...params)
      } catch (error: unknown) {
        setError(
          'server',
          'An unexpected problem occured, please contact the developper',
        )
      }
    }

  return { ensafe }
}

export default useEnsafe
