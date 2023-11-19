import { gql } from 'graphql-tag'
import {
  JWT_TOKEN_FIELDS,
  QULOT_ORDER_FIELDS,
  QULOT_USER_FIELDS,
  QULOT_PAYMENT_LESS_FIELDS,
} from './fragments'

export const REGISTER_QULOT_USER = gql`
  ${QULOT_USER_FIELDS}
  mutation RegisterUser(
    $email: String!
    $firstName: String!
    $lastName: String
    $password: String!
  ) {
    registerUser(
      input: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        password: $password
      }
    ) {
      ...QulotUserFields
    }
  }
`

export const ACTIVE_QULOT_USER = gql`
  ${QULOT_USER_FIELDS}
  mutation ActiveUser($email: String!, $code: Int32!) {
    activeUser(email: $email, code: $code) {
      ...QulotUserFields
    }
  }
`

export const LOGIN_WITH_EMAIL = gql`
  ${JWT_TOKEN_FIELDS}
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...JwtTokenFields
    }
  }
`

export const LOGIN_WITH_OIDC = gql`
  ${JWT_TOKEN_FIELDS}
  mutation LoginWithOIDC($provider: String!, $credentials: String!) {
    loginWithOIDC(provider: $provider, credentials: $credentials) {
      ...JwtTokenFields
    }
  }
`

export const REFRESH_TOKEN = gql`
  ${JWT_TOKEN_FIELDS}
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      ...JwtTokenFields
    }
  }
`

export const QULOT_PLACE_ORDER = gql`
  ${QULOT_ORDER_FIELDS}
  mutation PlaceOrder($input: PlaceOrderInput!) {
    placeOrder(input: $input) {
      ...QulotOrderFields
    }
  }
`

export const QULOT_CHECK_PLACE_ORDER = gql`
  mutation CheckPlaceOrder($input: PlaceOrderInput!) {
    checkPlaceOrder(input: $input) {
      currency
      ethChainId
      ethBuyerAddr
      ethFeeAmount
      ethCurrency
      ethTokenAmount
      ethTokenSymbol
      ethTxnId
      feeAmount
      paymentMethod
      totalAmount
      totalPayAmount
    }
  }
`

export const QULOT_CREATE_ORDER_PAYMENT = gql`
  ${QULOT_ORDER_FIELDS}
  ${QULOT_PAYMENT_LESS_FIELDS}
  mutation CreateOrderPayment($orderId: String!) {
    createOrderPayment(orderId: $orderId) {
      ...QulotOrderFields
      payments {
        ...QulotPaymentLessFields
      }
    }
  }
`

export const QULOT_CANCEL_ORDER = gql`
  ${QULOT_ORDER_FIELDS}
  mutation CancelOrder($orderId: String!) {
    cancelOrder(orderId: $orderId) {
      ...QulotOrderFields
    }
  }
`

export const QULOT_RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!) {
    resetPassword(email: $email)
  }
`

export const QULOT_CONFIRM_RESET_PASSWORD = gql`
  mutation ConfirmResetPassword(
    $email: String!
    $password: String!
    $code: Int32!
  ) {
    confirmResetPassword(email: $email, password: $password, code: $code)
  }
`
