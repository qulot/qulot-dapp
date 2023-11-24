import { BigNumber } from 'ethers'
import { defineStore } from 'pinia'
import {
  GET_QULOT_ETH_GAS_PRICE,
  GET_QULOT_PAYMENT_METHODS,
} from '~~/apollo/queries'
import { QulotPaymentMethod } from '~~/types/payment'

const ethGasSuggest = BigNumber.from('100000000000')

export const usePaymentStore = defineStore('payment', {
  state: () => {
    return {
      isLoading: false,
      isComplete: false,
      paymentMethods: [] as QulotPaymentMethod[],
      ethGasPrice: 0,
    }
  },
  getters: {
    isGasTooHigh: (state) =>
      BigNumber.from(state.ethGasPrice).gt(ethGasSuggest),
  },
  actions: {
    async fetchQulotPaymentMethods() {
      if (this.paymentMethods.length) {
        return
      }
      try {
        const { data, pending, execute } = await useAsyncQuery<{
          paymentMethods: QulotPaymentMethod[]
        }>({
          query: GET_QULOT_PAYMENT_METHODS,
          clientId: 'qulot',
        })
        if (pending.value) {
          await execute()
        }

        if (data.value && data.value.paymentMethods) {
          this.paymentMethods = data.value.paymentMethods
          this.updatePaymentMethods()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async fetchQulotEthGasPrice() {
      try {
        const { data, pending, execute } = await useAsyncQuery<{
          ethGasPrice: number
        }>({
          query: GET_QULOT_ETH_GAS_PRICE,
          clientId: 'qulot',
        })
        if (pending.value) {
          await execute()
        }

        if (data.value && data.value.ethGasPrice) {
          this.ethGasPrice = data.value.ethGasPrice
        }
      } catch (error) {
        console.log(error)
      }
    },
    updatePaymentMethods() {
      const { paymentMethods } = usePayment()

      for (const payment of paymentMethods) {
        if (payment.id === 'DeFiWallet') {
          continue
        }
        const qulotPaymentMethod = this.paymentMethods.find(
          (paymentMethod) => paymentMethod.id === payment.id
        )
        payment.active = qulotPaymentMethod != null
        payment.fees = qulotPaymentMethod?.fees || payment.fees
      }
    },
  },
})
