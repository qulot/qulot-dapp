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

/**
 *
 * @param value Numerical input (required)
 * @param locale Language and country information, such as 'en' or 'en-US'
 * @param currencyCode 3-character cdde from ISO 4217
 * @param subunitsValue Value is denominated in subunits, such as cents
 * @param subunitsToUnit Overrides the minor unit value from ISO 4217. The "subunitsValue" option is redundant if you enter a value for this
 * @param hideSubunits Set this to true if you don't want to display the subunits
 * @param supplementalPrecision Allows you to display partial subunits
 * @returns
 */
export function formatFiatMoney(
  value: number,
  locale: string,
  currencyCode: string,
  subunitsValue: boolean,
  subunitsToUnit: number,
  hideSubunits: boolean,
  supplementalPrecision: number
) {
  let ret = '0'
  if (Number.isFinite(value)) {
    try {
      let numFormat = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
      })
      const options = numFormat.resolvedOptions()
      if (subunitsToUnit > 1) {
        value = value / subunitsToUnit
      } else if (subunitsValue) {
        value = value / 10 ** options.minimumFractionDigits
      }
      if (hideSubunits) {
        numFormat = new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currencyCode,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      } else if (supplementalPrecision > 0) {
        numFormat = new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currencyCode,
          minimumFractionDigits:
            options.minimumFractionDigits + supplementalPrecision,
          maximumFractionDigits:
            options.maximumFractionDigits + supplementalPrecision,
        })
      }
      ret = numFormat.format(value)
    } catch (err) {
      ret = (err as any).message
    }
  } else {
    ret = '#NaN!'
  }
  return ret
}
