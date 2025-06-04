/**
 * popOrAdd
 * @description
 * Find an element in an array and remove it, add it if it is not found
 * @warn It does modified the array order
 */
export function popOrAdd<T>(items: T[], target: T) {
  const index = items.indexOf(target)
  const nextItems = [...items]
  if (index === -1) nextItems.push(target)
  else {
    nextItems[index] = nextItems[nextItems.length - 1]
    nextItems.pop()
  }
  return nextItems
}
