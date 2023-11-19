import { QulotBasePayment } from './qulotPayment'

export class VietQRPayment extends QulotBasePayment {
  getPaymentMethod(): string {
    return 'vietqr'
  }

  getCurrency(): string {
    return 'VND'
  }
}
