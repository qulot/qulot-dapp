import { Currency } from '~/types/exchange'
import currenciesData from '~/data/currencies.json'

const currencies = reactive<Currency[]>(currenciesData)

export const useCurrencies = () => {
  // composable
  const currencyUserSetting = useCookie<string>('currency')

  // methods
  const getUserSetting = (): string => {
    if (currencyUserSetting.value) {
      return currencyUserSetting.value
    }

    const { locale } = useI18n()
    if (locale.value) {
      const currency = currencies.find(
        (currency) => currency.lang === locale.value
      )

      if (currency?.lang) {
        return currency.symbol
      }
    }

    return 'USD'
  }

  const onCurrencySettingChange = (currency: string) => {
    currencyUserSetting.value = currency
  }

  // state
  const currencySetting = useState<string>('currency.setting', () =>
    getUserSetting()
  )

  watch(currencySetting, (val) => onCurrencySettingChange(val))

  return { currencies, currencySetting }
}
