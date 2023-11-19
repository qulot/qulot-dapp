import { BigNumber } from 'ethers'
import { ApolloError } from '@apollo/client/errors'
import { Payment } from './payment'
import { OrderTicket, PaymentReceipt } from '~~/types/payment'
import { QulotOrder, QulotPlaceOrder } from '~~/types/order'
import {
  QULOT_CHECK_PLACE_ORDER,
  QULOT_CREATE_ORDER_PAYMENT,
  QULOT_PLACE_ORDER,
} from '~~/apollo/mutations'

interface QulotPayment extends Payment {
  getCurrency(): string
  getPaymentMethod(): string
}

interface placeOrderRequest {
  placeOrder?: QulotOrder
}

interface checkPlaceOrderResult {
  currency: string
  ethBuyerAddr?: string
  ethChainId: number
  ethCurrency: string
  ethFeeAmount: string
  ethTokenAmount: string
  ethTokenSymbol: string
  ethTxnId?: string
  feeAmount: number
  paymentMethod: string
  totalAmount: number
  totalPayAmount: number
}

interface checkPlaceOrderRequest {
  checkPlaceOrder?: checkPlaceOrderResult
}

interface createOrderPaymentRequest {
  createOrderPayment?: QulotOrder
}

export abstract class QulotBasePayment implements QulotPayment {
  getPaymentMethod(): string {
    return ''
  }

  getCurrency(): string {
    return 'USD'
  }

  orderToPaymentReceipt(
    order: checkPlaceOrderResult | QulotOrder
  ): PaymentReceipt {
    const receipt: PaymentReceipt = {
      status: 'success',
      totalAmount: BigNumber.from('0'),
      finalAmount: BigNumber.from('0'),
      discount: 0,
    }

    receipt.totalAmount = order.ethTokenAmount
    receipt.totalAmountFiat = order.totalAmount
    receipt.finalAmount = order.ethTokenAmount
    receipt.finalAmountFiat = order.totalPayAmount
    receipt.currency = order.ethCurrency
    receipt.currencyFiat = order.currency
    if ('id' in order) {
      receipt.orderId = order.id
    }

    receipt.fees = [
      {
        type: 'network_fee',
        amount: order.ethFeeAmount,
        currency: order.ethCurrency,
      },
      {
        type: 'service_fee',
        amountFiat: order.feeAmount,
        currencyFiat: order.currency,
      },
    ]

    return receipt
  }

  ordersToPlaceOrder(orders: OrderTicket[]) {
    const { chainId } = useEthers()

    const placeOrderRequestInput: QulotPlaceOrder = {
      currency: this.getCurrency(),
      ethChainId: chainId.value,
      paymentMethod: this.getPaymentMethod(),
      lines: orders.map((order) => ({
        roundId: order.roundId,
        tickets: order.tickets.map((ticket) => ({
          numbers: ticket,
        })),
      })),
    }

    return placeOrderRequestInput
  }

  async placeOrders(
    orders: OrderTicket[],
    params: Record<string, any>
  ): Promise<PaymentReceipt> {
    const receipt: PaymentReceipt = {
      status: 'error',
      totalAmount: BigNumber.from('0'),
      finalAmount: BigNumber.from('0'),
      discount: 0,
    }

    if (!orders.length) {
      return receipt
    }

    try {
      const checkPlaceOrderRequestInput = this.ordersToPlaceOrder(orders)

      if (params.ethBuyerAddress) {
        checkPlaceOrderRequestInput.ethBuyerAddr = params.ethBuyerAddress
      }

      const checkPlaceOrderRequest = useMutation<checkPlaceOrderRequest>(
        QULOT_CHECK_PLACE_ORDER,
        {
          clientId: 'qulot',
          variables: {
            input: checkPlaceOrderRequestInput,
          },
        }
      )

      const checkPlaceOrderResult = await checkPlaceOrderRequest.mutate()
      if (checkPlaceOrderResult?.data?.checkPlaceOrder) {
        Object.assign(
          receipt,
          this.orderToPaymentReceipt(checkPlaceOrderResult.data.checkPlaceOrder)
        )
      }

      console.log(
        `[${this.getPaymentMethod()}] Check place order result: `,
        checkPlaceOrderResult?.data
      )
    } catch (error) {
      console.log(error)

      if (error instanceof ApolloError) {
        if (isUnauthenticated(error.graphQLErrors)) {
          receipt.error = error.graphQLErrors[0].message
        }

        if (receipt.error == null) {
          receipt.error = error.graphQLErrors[0].message
        }
      } else {
        receipt.error = error?.toString()
      }
      receipt.status = 'error'
    }

    console.log(receipt)

    return receipt
  }

  async executeOrders(
    orders: OrderTicket[],
    params: Record<string, any>
  ): Promise<PaymentReceipt> {
    const receipt: PaymentReceipt = {
      status: 'error',
      totalAmount: BigNumber.from('0'),
      finalAmount: BigNumber.from('0'),
      discount: 0,
    }

    try {
      const placeOrderRequestInput = this.ordersToPlaceOrder(orders)

      if (params.ethBuyerAddress) {
        placeOrderRequestInput.ethBuyerAddr = params.ethBuyerAddress
      }

      const placeOrderRequest = useMutation<placeOrderRequest>(
        QULOT_PLACE_ORDER,
        {
          clientId: 'qulot',
          variables: {
            input: placeOrderRequestInput,
          },
        }
      )

      const placeOrderResult = await placeOrderRequest.mutate()
      if (placeOrderResult?.data?.placeOrder) {
        Object.assign(
          receipt,
          this.orderToPaymentReceipt(placeOrderResult.data.placeOrder)
        )
      } else {
        return receipt
      }

      console.log(
        `[${this.getPaymentMethod()}] Place order result: `,
        placeOrderResult?.data
      )

      const createOrderPaymentRequest = useMutation<createOrderPaymentRequest>(
        QULOT_CREATE_ORDER_PAYMENT,
        {
          clientId: 'qulot',
          variables: {
            orderId: placeOrderResult.data.placeOrder.id,
          },
        }
      )

      const createOrderPaymentResult = await createOrderPaymentRequest.mutate()
      if (createOrderPaymentResult?.data?.createOrderPayment) {
        const { createOrderPayment } = createOrderPaymentResult.data
        Object.assign(receipt, this.orderToPaymentReceipt(createOrderPayment))

        if (
          createOrderPayment.payments?.length &&
          createOrderPayment.payments[0].data &&
          createOrderPayment.payments[0].data.link
        ) {
          receipt.redirectUrl = createOrderPayment.payments[0].data.link
        }
      }

      console.log(
        `[${this.getPaymentMethod()}] Create payment for order result: `,
        createOrderPaymentResult?.data
      )
    } catch (error) {
      console.log(error)

      if (error instanceof ApolloError) {
        if (isUnauthenticated(error.graphQLErrors)) {
          receipt.error = error.graphQLErrors[0].message
        }

        if (receipt.error == null) {
          receipt.error = error.graphQLErrors[0].message
        }
      } else {
        receipt.error = error?.toString()
      }
    }

    console.log(receipt)

    return receipt
  }
}
