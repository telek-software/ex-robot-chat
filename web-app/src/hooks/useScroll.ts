import { RefObject, useCallback, useEffect, useState } from 'react'

type ScrollType = {
  ref?: RefObject<HTMLElement> | null
  trigger?: number
}

/**
 * useScroll
 * @hook
 * @description
 * Event handler on scroll
 */
function useScroll(params: ScrollType) {
  const { ref, trigger = 50 } = params
  const [isScrolling, setScrollingState] = useState(false)

  const onScroll = useCallback(
    (e: Event) => {
      const target = e.currentTarget as HTMLElement
      if (!target) return
      const scrollValue = target.scrollTop
      setScrollingState(scrollValue > trigger)
    },
    [trigger],
  )

  useEffect(() => {
    let current: HTMLElement | null
    if (ref === null) return
    if (ref === undefined) current = document.body
    else current = ref.current
    if (!current) return
    current.addEventListener('scroll', onScroll)
    return () => {
      if (current) current.removeEventListener('scroll', onScroll)
    }
  }, [ref, onScroll])

  return { isScrolling }
}
export default useScroll
