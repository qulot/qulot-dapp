import { ExchangeRate } from '~/types/exchange'
import { isEmpty } from '~/utils/string'

const coinbaseExchangeEndpoint = 'https://api.coinbase.com/v2/exchange-rates'

interface CoinbaseExchangeResponse {
  data: ExchangeRate
}

const fetchCoinbaseTokenRates = async (token: string) => {
  const response = await $fetch<CoinbaseExchangeResponse>(
    coinbaseExchangeEndpoint,
    {
      method: 'GET',
      query: {
        currency: token,
      },
    }
  )

  return response?.data || { currency: token, rates: {} }
}

export default cachedEventHandler(
  async (event) => {
    const token = getRouterParam(event, 'token')
    if (isEmpty(token)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'TOKEN should be an string',
      })
    }

    const exchangeRates = await fetchCoinbaseTokenRates(token as string)

    for (const rate in exchangeRates.rates) {
      if (
        exchangeRates.rates[rate] &&
        typeof exchangeRates.rates[rate] === 'string'
      ) {
        exchangeRates.rates[rate] = Number(exchangeRates.rates[rate])
      }
    }

    return exchangeRates
  },
  {
    maxAge: 60 * 60,
    name: 'exchange.rates',
    getKey: (event) => event.context.params?.token || 'USDT',
  }
)
