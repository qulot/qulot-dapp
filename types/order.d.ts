import { QulotUser, User } from './user'
import { Round } from './lottery'
import { ChargeStatus, QulotPayment } from './payment'

export interface Order {
  id: string
  user?: User
  round?: Round
  ticketIds: string[]
  orderAmount: string
  timestamp: string
}

export type OrderStatus = 'placed' | 'in_process' | 'fulfilled' | 'error' | 'cancel' | 'success'

export interface QulotOrder {
  id: string
  currency: string
  ethBuyerAddr?: string
  ethChainId: number
  ethCurrency: string
  ethFeeAmount: string
  ethTokenAmount: string
  ethTokenSymbol: string
  ethTxnId?: string
  feeAmount: number
  chargeStatus: ChargeStatus
  paymentMethod: string
  status: OrderStatus
  totalAmount: number
  totalPayAmount: number
  updatedAt: string
  createdAt: string
  user?: QulotUser
  payments?: QulotPayment[]
  lines?: QulotOrderLine[]
}

export interface QulotOrderLine {
  id: string
  order?: QulotOrder
  round?: Round
  totalAmount: number
  ethOrderId?: number
  ethTokenAmount: number
  roundId: number
  tokenAmount: number
  tickets?: QulotOrderLineTicket[]
  updatedAt: string
  createdAt: string
}

export interface QulotOrderLineTicket {
  id: string
  line?: QulotOrderLine
  ethTicketId?: number
  numbers: number[]
}

export interface QulotPlaceOrderLineTicket {
  numbers: number[]
}

export interface QulotPlaceOrderLine {
  roundId: number | string
  tickets: QulotPlaceOrderLineTicket[]
}

export interface QulotPlaceOrder {
  currency: string
  ethBuyerAddr?: string
  ethChainId: number
  paymentMethod: string
  lines: QulotPlaceOrderLine[]
}