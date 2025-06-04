import { AnyObject, DeepPartial } from './type.utils'
import checkIsObject, { checkIsKeyof } from './typeGuard.utils'

/* **************************************************************** */
/* ************************ Object Keys *************************** */
/* **************************************************************** */

type KeysToLitteral = {
  prefix?: string
  suffix?: string
  join?: string
}

/**
 * keysToString
 * @description
 * Transform Object keys to string
 * @Example
 *  const object = { header: true, blue: 3, warning: false };
 *  const result = keysToString(object);
 *  console.log(result); // "header blue"
 */
export function keysToString(obj: AnyObject, options?: KeysToLitteral) {
  return Object.keys(obj)
    .reduce(
      (acc, cur) =>
        obj[cur]
          ? acc + ` ${options?.prefix || ''}${cur}${options?.suffix || ''}`
          : acc,
      '',
    )
    .trim()
}

/* ************************************************************************** */

/**
 * displayValue
 * @description
 * Main display value function for table
 */
export function displayValue(item: object, key: string): string {
  if (checkIsKeyof(item, key)) {
    const value = item[key]
    if (['string', 'number'].includes(typeof value)) {
      return value
    }
    if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  }
  return ''
}

/**
 * mergeDeepLeft
 * Deep merge two objects.
 */

export function mergeDeep<T>(target: T, ...sources: T[]): T {
  if (!sources.length) return target
  const nextSources = [...sources]
  let nextTarget = { ...target }
  const source = nextSources.shift()

  if (checkIsObject(nextTarget) && checkIsObject(source)) {
    for (const key in source) {
      if (checkIsObject(source[key])) {
        if (!target[key]) nextTarget = { ...nextTarget, [key]: {} }
        mergeDeep(target[key], source[key])
      } else {
        nextTarget = { ...nextTarget, [key]: source[key] }
      }
    }
  }
  return mergeDeep(target, ...sources)
}

/**
 * mergeDeepPartial
 * Deep merge two objects, one could be partial
 */
export function mergeDeepPartial<T>(
  target: T,
  ...modifiers: DeepPartial<T>[]
): T {
  if (!modifiers.length) return target
  const sources = [...modifiers]
  const modifier = sources.shift()
  let nextTarget = { ...target }

  if (checkIsObject(nextTarget) && checkIsObject(modifier)) {
    for (const key in modifier) {
      const modifierVal = modifier[key]
      const targetVal = checkIsKeyof(nextTarget, key)
        ? nextTarget[key]
        : undefined
      if (checkIsObject(modifierVal) && checkIsObject(targetVal)) {
        nextTarget = {
          ...nextTarget,
          [key]: mergeDeepPartial(targetVal, modifierVal),
        }
      } else if (modifierVal !== undefined) {
        nextTarget = { ...target, [key]: modifierVal }
      } else {
        nextTarget = { ...target, [key]: targetVal }
      }
    }
  }

  return mergeDeepPartial<T>(nextTarget, ...sources)
}
