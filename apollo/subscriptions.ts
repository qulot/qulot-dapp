import { gql } from 'graphql-tag'
import {
  QULOT_ORDER_FIELDS,
  QULOT_ORDER_LINE_FIELDS,
  QULOT_ORDER_LINE_TICKET_FIELDS,
  QULOT_PAYMENT_FIELDS,
} from './fragments'

export const QULOT_SUBSCRIPTION_ORDER = gql`
  ${QULOT_ORDER_FIELDS}
  ${QULOT_ORDER_LINE_FIELDS}
  ${QULOT_ORDER_LINE_TICKET_FIELDS}
  ${QULOT_PAYMENT_FIELDS}
  subscription Order($orderId: String!) {
    order(orderId: $orderId) {
      ...QulotOrderFields
      lines {
        ...QulotOrderLineFields
        tickets {
          ...QulotOrderLineTicketFields
        }
      }
      payments {
        ...QulotPaymentFields
      }
    }
  }
`
