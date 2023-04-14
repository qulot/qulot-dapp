export function normalizeChainId(chainId: string | number) {
  if (typeof chainId === 'string') {
    const isHex = chainId.trim().substring(0, 2)

    return Number.parseInt(chainId, isHex === '0x' ? 16 : 10)
  }
  return chainId
}
