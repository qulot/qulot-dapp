
export interface Currency {
  name: string
  symbol: string
  lang?: string
}

export interface ExchangeRate {
  currency: string
  rates: Record<string, number>
}