import { PaymentMethod } from '~~/types/payment'

const paymentMethods = reactive<PaymentMethod[]>([
  {
    id: 'DeFiWallet',
    name: 'DeFi Wallet',
    icon: '/payment/DeFi Wallet.svg',
    active: true,
  },
  {
    id: 'Fiat',
    name: 'Fiat Wallet',
    icon: '/wallet/coinbase.svg',
    active: false,
  },
])

export const usePayment = () => {
  // composable
  const paymentUserSetting = useCookie<string>('payment')

  // state
  const payment = useState<string>(
    'payment.selected',
    () => paymentUserSetting.value || 'DeFiWallet'
  )

  //   watchers
  watch(payment, (val) => (paymentUserSetting.value = val))

  return { paymentMethods, payment }
}
