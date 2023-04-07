interface CoinbasePriceResult {
  data: {
    base?: string
    currency?: string
    amount?: string
  }
}

const fetchCoinbasePrice = async (symbol: string, currency: string) => {
  const { data } = await useFetch<CoinbasePriceResult>(
    `https://api.coinbase.com/v2/prices/${symbol}-${currency}/buy`
  )

  let priceAmount = 0
  if (data?.value?.data.amount) {
    priceAmount = parseInt(data?.value?.data.amount)
  }

  return priceAmount
}

export const useCryptoPrice = () => {
  const getCryptoPrice = async (symbol: string, currency: string) => {
    return await fetchCoinbasePrice(symbol, currency)
  }
  return { getCryptoPrice }
}
