/**
 * Format number to desired number of digits
 *
 * @example
 * formatIntDigits(1, 2)
 * // returns 01
 *
 * @param {number} number
 * @param {number} degits
 * @returns
 */
export function formatIntDigits(number: number, digits = 2) {
  const formattedNumber = number.toLocaleString('en-US', {
    minimumIntegerDigits: digits,
    useGrouping: false,
  })

  return formattedNumber
}

/**
 * These formats can be achieved by using the num.toLocaleString() method.
 * @param {number} number
 * @returns
 */
export function formatNumber(number: number | string) {
  if (typeof number === 'string') {
    number = parseInt(number)
  }
  return number.toLocaleString('en-US')
}

/**
 *
 * @param {number|string} number
 * @param {number} fixed
 * @param {string} currency
 * @returns
 */
export function formatMoney(
  number: number | string,
  currency: string,
  fixed = 4
) {
  return formatFixed(number, fixed) + ' ' + currency
}

/**
 *
 * @param {number|string} number
 * @param {number} fixed
 * @returns
 */
export function formatFixed(number: number | string, fixed = 4) {
  if (typeof number === 'string') {
    number = parseInt(number)
  }

  if (number === 0) {
    fixed = 0
  }

  return number.toFixed(fixed)
}

/**
 *
 * @param {number|string} number
 * @param {number} fixed
 * @returns
 */
export function formatFloatFixed(number: number | string, fixed = 4) {
  if (typeof number === 'string') {
    number = parseFloat(number)
  }

  if (number === 0) {
    fixed = 0
  }

  return number.toFixed(fixed)
}

/**
 * Getting a random number between two values
 *
 * @example
 * getRandomRange(1, 5)
 * // returns 3
 * getRandomRange(1, 5)
 * // returns 5
 * @param {number} min
 * @param {number} max
 * @returns
 */
export function randomRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min
}

/**
 * Getting a random numbers between two values
 * @param {number} numbers
 * @param {number} min
 * @param {number} max
 * @returns
 */
export function bulkRandomRange(numbers: number, min: number, max: number) {
  const randomNumbers: number[] = []
  while (true) {
    const randomNumber = randomRange(min, max)
    if (randomNumbers.includes(randomNumber)) {
      continue
    } else {
      randomNumbers.push(randomNumber)
    }

    if (randomNumbers.length >= numbers) {
      break
    }
  }
  return randomNumbers
}

/**
 * Getting a unique integer id
 * @returns
 */
export function uniqueID() {
  return Math.floor(Math.random() * Date.now())
}

/**
 * Check if a string is a valid number
 * @example
 * console.log(isNumeric('abcd'));         // false
 * console.log(isNumeric('123a'));         // false
 * console.log(isNumeric('1'));            // true
 * console.log(isNumeric('1234567890'));   // true
 * console.log(isNumeric('-23'));          // true
 * console.log(isNumeric(1234));           // true
 * console.log(isNumeric(1234n));          // true
 * console.log(isNumeric('123.4'));        // false
 * console.log(isNumeric(''));             // false
 * console.log(isNumeric(undefined));      // false
 * console.log(isNumeric(null));           // false
 * @param value any
 * @returns
 */
export function isNumeric(value: any) {
  return /^-?\d+$/.test(value)
}

/**
 * Calculate the combination
 * @param n
 * @param k
 * @returns
 */
export function combination(n: number, k: number): number {
  // Check validity of n and k
  if (n < k) {
    throw new Error('n must be greater than or equal to k')
  }

  // Calculate combination
  let result = 1
  for (let i = 0; i < k; i++) {
    result *= n - i
    result /= i + 1
  }

  return result
}
