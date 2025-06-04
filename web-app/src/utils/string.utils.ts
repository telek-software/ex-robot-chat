/**
 * capitalize
 * @description
 * Capitalize the first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * strUcFirst
 * @function
 *
 */
export function strUcFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
/**
 * checkEmail
 * @param {String} text
 */
export function checkEmail(text: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(text)
}

/**
 * checkPAssword
 * @param {String} text
 */
export function checkPassword(text: string) {
  const strongRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
  return strongRegex.test(text)
}

/**
 * stripTag
 */
export function stripTags(text: string) {
  return text.replace(/(<([^>]+)>)/gi, '')
}
