/**
 *
 * @param link
 * @returns
 */
export function isURL(link?: string) {
  return (
    link && (link.indexOf('http://') === 0 || link.indexOf('https://') === 0)
  )
}
