import { OrderTicket, PaymentReceipt } from '~~/types/payment'

export interface Payment {
  placeOrders(
    orders: OrderTicket[],
    params: Record<string, any>
  ): Promise<PaymentReceipt>
  executeOrders(
    orders: OrderTicket[],
    params: Record<string, any>
  ): Promise<PaymentReceipt>
}
