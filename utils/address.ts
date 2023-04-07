// Captures 0x + 4 characters, then the last 4 characters.
const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/

// Captures 0x, then the last 4 characters.
const truncateShortRegex = /^(0x)[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/

/**
 * Truncates an ethereum address to the format 0x0000…0000
 * @param address Full address to truncate
 * @returns Truncated address
 */
export function truncateEthAddress(address: string) {
  const match = address.match(truncateRegex)
  if (!match) return address
  return `${match[1]}…${match[2]}`
}

/**
 * Truncates an ethereum address to the format 0x…0000
 * @param address Full address to truncate
 * @returns Truncated address
 */
export function shortEthAddress(address: string) {
  const match = address.match(truncateShortRegex)
  if (!match) return address
  return `${match[1]}…${match[2]}`
}
