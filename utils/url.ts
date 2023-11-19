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

export function isExternalURL(url: string) {
  try {
    return new URL(url).origin !== location.origin
  } catch (error) {
    console.log(error)
  }

  return false
}
