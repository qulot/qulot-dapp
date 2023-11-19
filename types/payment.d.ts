import { BigNumber } from "ethers"
import { QulotUser } from "./user"
import { QulotOrder } from "./order"

export interface PaymentMethod {
  id: string
  currency?: string
  name: () => string
  icon: string
  active: boolean
  show: () => boolean
  fees: QulotPaymentFee[]
}

export interface QulotPaymentFee {
  type: string
  value: number
  isFixed: boolean
}

export interface QulotPaymentMethod {
  id: string
  name: string
  currencies: string[]
  fees: QulotPaymentFee[]
}

export interface OrderTicket {
  roundId: number | string
  tickets: number[][]
}

export interface PaymentFee {
  type: 'network_fee' | 'service_fee'
  currency?: string
  amount?: number | BigNumber | string
  amountFiat?: number | string
  currencyFiat?: string
}

export interface PaymentReceipt {
  orderId?: string
  status: 'success' | 'error'
  totalAmount?: number | BigNumber | string
  totalAmountFiat?: number | string
  finalAmount?: number | BigNumber | string
  finalAmountFiat?: number | string
  discount?: number | BigNumber | string
  currency?: string
  currencyFiat?: string
  txnId?: string
  fees?: PaymentFee[]
  error?: string
  redirectUrl?: string
}

export interface OrderTicketResult {
  success: boolean
  error?: string
  paymentTotalAmount?: number
  paymentFinalAmount?: number
  paymentDiscount?: number
}

export type TransactionStatus = 'error' | 'success' | 'pending'
export interface QulotTransaction {
  id: string
  status: TransactionStatus
  data: any
  payment?: QulotPayment
  amount: number
  createdAt: string
  updatedAt: string
}

export type ChargeStatus = 'none' | 'partial' | 'full' | 'overcharged'
export interface QulotPayment {
  id: string
  method: string
  currency: string
  amount: number
  amountRefund: number
  chargeStatus: ChargeStatus
  data: any
  extOrderId: string
  user?: QulotUser
  order?: QulotOrder
  transactions?: QulotTransaction[]
  createdAt: string
  updatedAt: string
}