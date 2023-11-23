import { ExchangeRate } from '~/types/exchange'

export const useExchange = () => {
  // state
  const exchangeRates = useState<Record<string, ExchangeRate>>(
    'exchange.rates',
    () => ({})
  )

  const getExchangeRate = async (token: string, currency: string) => {
    if (!(token in exchangeRates.value)) {
      const rates = await $fetch('/api/exchange-rates/**:token', {
        params: { token },
      })

      exchangeRates.value[token] = rates
    }

    return exchangeRates.value[token]?.rates?.[currency]
  }

  /**
   * Exchange cryptocurrency to fiat currency
   * @param token ERC20 token listing in coinbase. like USDT
   * @param currency Fiat currency. like USDT
   * @param value Amount want to exchange
   * @returns
   */
  const exchangeToken = async (
    token: string,
    currency: string,
    value: number
  ) => {
    const exchangeRate = await getExchangeRate(token, currency)

    if (exchangeRate) {
      return value * exchangeRate
    }
  }

  return { exchangeToken }
}
