/**
 * Format real number to USD currency string
 *
 * @example
 * formatUSD(137360420850)
 * // returns $137,360,420,850
 *
 * @param {number} number
 * @param {number} digits
 * @returns
 */
export function formatUSD(number: number | string, digits = 0) {
  if (typeof number === 'string') {
    number = parseInt(number)
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  })
  return formatter.format(number)
}
