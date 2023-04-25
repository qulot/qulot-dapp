export function startsWith(str: string, value: string) {
  return String.prototype.startsWith.call(str || '', value)
}

export function isString(str: any) {
  return str != null && typeof str === 'string'
}

export function isEmpty(str?: string) {
  return typeof str === 'string' && str.trim().length === 0
}

/**
 * Check if String contains Special Characters
 *
 * @example
 * containsSpecialChars('hello!')
 * // returns true
 * containsSpecialChars('abc')
 * // returns false
 * @param {string} str
 * @returns
 */
export function containsSpecialChars(str: string) {
  // eslint-disable-next-line
  const specialChars = `\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`

  const result = specialChars.split('').some((specialChar) => {
    if (str.includes(specialChar)) {
      return true
    }

    return false
  })

  return result
}
