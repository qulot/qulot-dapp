import { parseExpression } from 'cron-parser'
import moment from 'moment'
import { isString } from './string'

/**
 * @readonly
 * @enum {string}
 */
export const FORMATS = {
  ddmmyyyy: 'DD/MM/yyyy',
  mmddyyyy: 'MM/DD/yyyy',
  mmddyyyyhhss: 'MM/DD/yyyy HH:mm',
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

  return m.format(FORMATS[format])
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
  return m.format(FORMATS[format])
}

/**
 * Get next tick of period days
 * @param periodDays
 * @param periodHourOfDays
 * @returns
 */
export function nextTickOf(periodDays: number[], periodHourOfDays: number) {
  const interval = parseExpression(
    `0 ${periodHourOfDays} * * ${periodDays.join(',')}`,
    {
      utc: true,
    }
  )
  return interval.next().toDate()
}

export function hourUtcToLocal(hour: number) {
  return moment.utc().set('hour', hour).local().hour()
}

/**
 * Check period days is every day
 * @param periodDays
 * @returns
 */
export function isEveryDay(periodDays: number[] | undefined) {
  return (
    periodDays?.length &&
    periodDays.includes(0) &&
    periodDays.includes(1) &&
    periodDays.includes(2) &&
    periodDays.includes(3) &&
    periodDays.includes(4) &&
    periodDays.includes(5) &&
    periodDays.includes(6)
  )
}

/**
 * Return current timezone of datetime
 * @returns
 */
export function timezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}
