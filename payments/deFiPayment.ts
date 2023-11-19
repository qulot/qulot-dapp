import { BigNumber } from 'ethers'
import { UserRejectedRequestError } from '@wagmi/core'
import { Payment } from './payment'
import { OrderTicket, PaymentReceipt } from '~~/types/payment'
import { CalculateBulkTicketsResult } from '~~/types/ticket'

interface ProcessBuyTicketResult {
  success: boolean
  txnId?: string
  gasUsed?: BigNumber
}

export class DeFiPayment implements Payment {
  isEnoughBalance(amount: BigNumber) {
    const { tokenBalance } = useAccount()
    return BigNumber.from(tokenBalance.value?.value || BigNumber.from('0')).gte(
      amount
    )
  }

  isConnectedWallet() {
    const { isConnected } = useAccount()
    return isConnected.value
  }

  getRedirectUrl() {
    const localePath = useLocalePath()
    const { address } = useAccount()
    return localePath({
      name: 'eth-tickets',
      params: { eth: address.value },
    })
  }

  async checkAllowance(finalAmount: BigNumber) {
    const { qulotAddress, readToken } = useQulot()
    const { address } = useAccount()
    const allowance = await readToken<BigNumber>('allowance', [
      address.value,
      qulotAddress.value,
    ])

    const isAllow = allowance.gte(finalAmount)

    console.log(
      `[DeFiPayment] Check token allowance: ${allowance.toNumber()}, is allow: ${isAllow}`
    )

    return isAllow
  }

  async approveBuyTicket(totalAmount: BigNumber) {
    const { qulotAddress, writeToken } = useQulot()
    const approveResult = await (
      await writeToken('approve', [qulotAddress.value, totalAmount])
    )?.wait()

    console.log(
      `[DeFiPayment] Approve amount: ${totalAmount.toNumber()}, result: `,
      approveResult
    )

    return approveResult?.status === 1
  }

  async processBuyTicket(
    orders: OrderTicket[]
  ): Promise<ProcessBuyTicketResult> {
    const { writeQulotLottery } = useQulot()
    const { address } = useAccount()
    console.log(`[DeFiPayment] Process buy tickets: `, orders)
    const result = await (
      await writeQulotLottery('buyTickets', [address.value, orders])
    )?.wait()

    console.log(`[DeFiPayment] Process buy tickets result: `, result)

    return {
      success: result?.status === 1,
      txnId: result?.blockHash,
      gasUsed: result?.gasUsed,
    }
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

    // Check connected to wallet
    if (!this.isConnectedWallet()) {
      receipt.error = 'walletConnectRequired'
      return receipt
    }
    try {
      const { token, readsQulotLottery } = useQulot()
      const calculateOrderResults = await readsQulotLottery<
        [] & CalculateBulkTicketsResult[]
      >(
        orders.map((order) => ({
          functionName: 'calculateAmountForBulkTickets',
          args: [order.roundId, order.tickets.length],
        }))
      )
      const result = calculateOrderResults
        .map((result) => fromStructToObject<CalculateBulkTicketsResult>(result))
        .reduce(
          (pre, calcResult) => ({
            totalAmount: pre.totalAmount.add(calcResult.totalAmount),
            finalAmount: pre.finalAmount.add(calcResult.finalAmount),
            discount: pre.discount + calcResult.discount.toNumber(),
          }),
          {
            totalAmount: BigNumber.from('0'),
            finalAmount: BigNumber.from('0'),
            discount: 0,
          }
        )

      receipt.totalAmount = result.totalAmount.toNumber()
      receipt.finalAmount = result.finalAmount.toNumber()
      receipt.discount = result.discount
      receipt.currency = token.value?.symbol

      if (this.isEnoughBalance(result.finalAmount)) {
        receipt.status = 'success'
        receipt.error = undefined
      } else {
        receipt.error =
          'execution reverted: ERC20: transfer amount exceeds allowance'
      }
    } catch (error) {
      receipt.error = (error as Error).toString()
    }

    console.log(`[DeFiPayment] Place order result: `, receipt)

    return receipt
  }

  async executeOrders(
    orders: OrderTicket[],
    params: Record<string, any>
  ): Promise<PaymentReceipt> {
    const receipt: PaymentReceipt = await this.placeOrders(orders, params)
    try {
      if (
        receipt.status === 'success' &&
        receipt.totalAmount &&
        receipt.finalAmount
      ) {
        const finalAmount = BigNumber.from(receipt.finalAmount)
        const totalAmount = BigNumber.from(receipt.totalAmount)
        let result: ProcessBuyTicketResult = { success: false }

        // Check token allow amount to payment
        if (await this.checkAllowance(finalAmount)) {
          result = await this.processBuyTicket(orders)
        } else {
          // Approve amount and check allow payment
          if (
            (await this.approveBuyTicket(totalAmount)) &&
            (await this.checkAllowance(finalAmount))
          ) {
            result = await this.processBuyTicket(orders)
          }
        }

        if (result.success) {
          receipt.status = 'success'
          receipt.redirectUrl = this.getRedirectUrl()
          receipt.txnId = result.txnId
          receipt.fees = [
            { type: 'network_fee', amount: result.gasUsed.toNumber() },
          ]
        } else {
          receipt.status = 'error'
        }
      }
    } catch (buyTicketsTxError: any) {
      console.log(buyTicketsTxError)
      receipt.error = buyTicketsTxError.toString()
      receipt.status = 'error'

      if (buyTicketsTxError?.error?.data?.message) {
        receipt.error = buyTicketsTxError?.error?.data?.message
      }

      if (buyTicketsTxError instanceof UserRejectedRequestError) {
        receipt.error = buyTicketsTxError.message
      }
    }

    console.log(`[DeFiPayment] Buy tickets receipt: `, receipt)

    return receipt
  }
}
