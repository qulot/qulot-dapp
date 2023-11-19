import { QulotBasePayment } from './qulotPayment'

export class PaypalPayment extends QulotBasePayment {
  getPaymentMethod(): string {
    return 'paypal'
  }

  getCurrency(): string {
    return 'USD'
  }
}
