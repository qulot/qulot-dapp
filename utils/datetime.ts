import { parseExpression } from 'cron-parser'
import moment from 'moment'
import { isString } from './string'

/**
 * @readonly
 * @enum {string}
 */
export const FORMATS = {
  ddmmyyyy: 'DD/MM/yyyy',
}

export type DateTimeFormats = keyof typeof FORMATS

export type Timestamp = number | string

/**
 * Convert datetime string to target format. Return null if input is not valid
 *
 * @example
 * formatDateTime("2022-06-26T13:33:23Z", "ddmmyyyy")
 * // returns 26/06/2022
 *
 * @param datetime
 * @param format
 * @returns
 */
export function formatDateTime(datetime: string, format: DateTimeFormats) {
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
 * @param datetime
 * @returns
 */
export function toDateTime(datetime: string) {
  const m = moment(datetime)

  if (!m.isValid()) {
    return null
  }

  return m.toDate()
}

/**
 * Convert timestamp string to date object. Return null if input is not valid
 *
 * @example
 * toDateTime("2022-06-26T13:33:23Z")
 * @param timestamp
 * @returns
 */
export function timestampToDateTime(timestamp: Timestamp) {
  if (isString(timestamp)) {
    timestamp = parseInt(timestamp as string)
  }
  const m = moment.unix(timestamp as number)
  if (!m.isValid()) {
    return null
  }
  return m.toDate()
}

/**
 * Convert timestamp string to target format. Return null if input is not valid
 *
 * @example
 * formatTimestamp("1680167644", "ddmmyyyy")
 * // returns 26/06/2022
 *
 * @param timestamp
 * @param format
 * @returns
 */
export function formatTimestamp(timestamp: Timestamp, format: DateTimeFormats) {
  if (isString(timestamp)) {
    timestamp = parseInt(timestamp as string)
  }
  const m = moment.unix(timestamp as number)
  if (!m.isValid()) {
    return null
  }
  return m.format(format)
}

/**
 * Get next tick of period days
 * @param periodDays
 * @param periodHourOfDays
 * @returns
 */
export function nextTickOf(periodDays: number[], periodHourOfDays: number) {
  const interval = parseExpression(
    `* ${periodHourOfDays} * * ${periodDays.join(',')}`
  )
  return interval.next().toDate()
}
