/**
 * checkIsObject
 */
export default function checkIsObject(arg: unknown): arg is object {
  return Object.prototype.toString.call(arg) === '[object Object]'
}

/**
 * checkIsKeyof
 * @typeGard
 * @description
 * Verify if a key is in an object so that typescript associates the keyof attribute
 * @example
 * checkIsKeyof({key: 1}, 'key') // true
 * checkIsKeyof({key: 1}, 'other') // false
 */
export function checkIsKeyof<T = object>(
  obj: T,
  key: PropertyKey,
): key is keyof T {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

/**
 * checkIsBoolean
 * @typeGuard
 */
export function checkIsBoolean(arg: unknown): arg is boolean {
  return typeof arg === 'boolean'
}

/**
 * checkIsFunction
 * @typeGuard
 */
export function checkIsFunction(
  item: unknown,
): item is ([...arg]?: unknown[]) => unknown {
  return Object.prototype.toString.call(item) === '[Object Function]'
}

/**
 * checkIsNumber
 * @typeGuard
 */
export function checkIsNumber(arg: unknown): arg is number {
  return Object.prototype.toString.call(arg) === '[object Number]'
}

/**
 * checkIsString
 */
export function checkIsString(arg: unknown): arg is string {
  return typeof arg === 'string'
}

/**
 * checkIsArray
 */
export function checkIsArray(arg: unknown): arg is unknown[] {
  return Object.prototype.toString.call(arg) === '[object Array]'
}
