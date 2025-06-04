import { useState } from 'react'

import { ValueOf } from '~utils/type.utils'

/**
 * useSelection
 * @hook
 * @description
 * Hooks to keep a state for list item selection
 */
export default function useSelection<T>(items: T[], uniqKey: keyof T) {
  const [selected, setSelected] = useState(new Set<ValueOf<T>>())
  const update = (elements: ValueOf<T>[]) => {
    setSelected(new Set(elements))
  }

  const toggle = (item: T) => {
    const nextSelected = new Set(selected)
    const target = item[uniqKey]
    if (nextSelected.has(target)) nextSelected.delete(target)
    else nextSelected.add(target)
    setSelected(nextSelected)
  }

  const toggleAll = () => {
    if (selected.size === items.length) update([])
    else update(items.map((i) => i[uniqKey]))
  }

  const checkSelected = (item: T) => selected.has(item[uniqKey])

  return {
    isFull: selected.size === items.length,
    getCheck: checkSelected,
    selected: Array.from(selected),
    toggle,
    toggleAll,
  }
}
