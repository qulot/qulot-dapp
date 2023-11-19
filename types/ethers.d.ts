export type Address = `0x${string}`
export interface Token {
  address: Address
  decimals: number
  name: string
  symbol: string
  totalSupply: {
    formatted: string
    value: BigNumber
  }
}

export type Unit =
  | 'wei'
  | 'kwei'
  | 'mwei'
  | 'gwei'
  | 'szabo'
  | 'finney'
  | 'ether'

export interface Balance {
  decimals: number
  formatted: string
  symbol: string
  value: BigNumber
}
