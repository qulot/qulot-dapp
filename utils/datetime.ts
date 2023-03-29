import moment from 'moment'

/**
 * @readonly
 * @enum {string}
 */
export const FORMATS = {
  ddmmyyyy: 'DD/MM/yyyy',
}

/**
 * Convert datetime string to target format. Return null if input is not valid
 *
 * @example
 * formatDateTime("2022-06-26T13:33:23Z", FORMATS.ddmmyyyy)
 * // returns 26/06/2022
 *
 * @param {string} datetime
 * @param {FORMATS} format
 * @returns {string|null}
 */
export function formatDateTime(datetime: string, format: keyof typeof FORMATS) {
  const m = moment(datetime)

  if (!m.isValid()) {
    return null
  }

  return m.format(format)
}

/**
 * Convert datetime string to date object. Return null if input is not valid
 *
 * @example
 * toDateTime("2022-06-26T13:33:23Z")
 *
 * @param {string} datetime
 * @returns {Date|null}
 */
export function toDateTime(datetime: string) {
  const m = moment(datetime)

  if (!m.isValid()) {
    return null
  }

  return m.toDate()
}
