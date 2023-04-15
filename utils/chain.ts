import { Chain } from '@wagmi/core'

export function normalizeChainId(chainId: string | number) {
  if (typeof chainId === 'string') {
    const isHex = chainId.trim().substring(0, 2)

    return Number.parseInt(chainId, isHex === '0x' ? 16 : 10)
  }
  return chainId
}

export function getChainIcon(chain: Chain) {
  let icon: string | null = null
  if (chain.name.startsWith('Polygon')) {
    icon = '/chain/137.svg'
  } else if (chain.name.startsWith('Optimism')) {
    icon = '/chain/10.svg'
  } else if (chain.name.startsWith('Arbitrum')) {
    icon = '/chain/42161.svg'
  } else {
    icon = '/chain/1.svg'
  }
  return icon
}
