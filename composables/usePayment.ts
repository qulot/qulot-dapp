import { DeFiPayment } from '~~/payments/deFiPayment'
import { Payment } from '~~/payments/payment'
import { PaypalPayment } from '~~/payments/paypalPayment'
import { VietQRPayment } from '~~/payments/vietqrPayment'
import { PaymentMethod } from '~~/types/payment'

const paymentMethods = reactive<PaymentMethod[]>([
  {
    id: 'DeFiWallet',
    name: () => useI18n().t('payment.methods.DeFiWallet', 'DeFi Wallet'),
    icon: '/payment/DeFi Wallet.svg',
    active: true,
    show: () => true,
    fees: [],
  },
  {
    id: 'paypal',
    currency: 'USD',
    name: () => useI18n().t('payment.methods.paypal', 'Paypal'),
    icon: '/payment/64x64-atm.svg',
    active: false,
    show: () => true,
    fees: [],
  },
])

const payments = reactive<Record<string, Payment>>({
  DeFiWallet: new DeFiPayment(),
  paypal: new PaypalPayment(),
  vietqr: new VietQRPayment(),
})

export const usePayment = () => {
  // composable
  const paymentUserSetting = useCookie<string>('payment')

  // state
  const payment = useState<string>(
    'payment.selected',
    () => paymentUserSetting.value || 'DeFiWallet'
  )

  // computed
  const isDeFiPayment = computed(() => payment.value === 'DeFiWallet')

  // watchers
  watch(payment, (val) => (paymentUserSetting.value = val))

  // methods
  const getPayment = () => payments[payment.value || 'DeFiWallet']

  return { paymentMethods, payment, isDeFiPayment, getPayment }
}
