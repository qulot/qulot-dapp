import { gql } from 'graphql-tag'

export const LOTTERY_FIELDS = gql`
  fragment LotteryFields on Lottery {
    id
    verboseName
    treasuryFeePercent
    timestamp
    pricePerTicket
    picture
    periodHourOfDays
    periodDays
    numberOfItems
    minValuePerItem
    maxValuePerItem
    maxNumberTicketsPerBuy
    amountInjectNextRoundPercent
    discountPercent
    timestamp
    lastRound {
      id
      startTime
      endTime
      totalAmount
      winningNumbers
      status
    }
    nextRound {
      id
      startTime
      totalAmount
      status
    }
  }
`

export const LOTTERY_SHORT_FIELDS = gql`
  fragment LotteryShortFields on Lottery {
    id
    verboseName
    picture
    maxValuePerItem
    numberOfItems
    pricePerTicket
    periodHourOfDays
    periodDays
  }
`

export const ROUND_FIELDS = gql`
  fragment RoundFields on Round {
    winningNumbers
    totalTickets
    totalAmount
    timestamp
    status
    startTime
    id
    endTime
    firstRound {
      id
    }
  }
`

export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    totalWinAmount
    totalTickets
    totalAmount
  }
`

export const REWARD_RULE_FIELDS = gql`
  fragment RewardRule on RewardRule {
    rewardValue
    matchNumber
  }
`

export const ORDER_FIELDS = gql`
  fragment OrderFields on Order {
    id
    user {
      id
    }
    round {
      id
      status
      lottery {
        id
      }
    }
    timestamp
    ticketIds
    orderAmount
  }
`
export const QULOT_USER_FIELDS = gql`
  fragment QulotUserFields on User {
    id
    avatar
    email
    firstName
    isConfirmed
    lastName
    updatedAt
    createdAt
  }
`

export const JWT_TOKEN_FIELDS = gql`
  fragment JwtTokenFields on JwtToken {
    accessToken
    expiresAt
    refreshToken
  }
`

export const QULOT_ETH_ACCOUNT_FIELDS = gql`
  fragment QulotUserEthAccountFields on UserEthAccount {
    id
    address
  }
`

export const QULOT_PAYMENT_METHOD_FIELDS = gql`
  fragment QulotPaymentMethodFields on PaymentMethod {
    id
    name
    currencies
  }
`

export const QULOT_PAYMENT_FEE_FIELDS = gql`
  fragment QulotPaymentFeeFields on PaymentFee {
    type
    value
    isFixed
  }
`

export const QULOT_ORDER_LINE_TICKET_FIELDS = gql`
  fragment QulotOrderLineTicketFields on OrderLineTicket {
    ethTicketId
    id
    numbers
  }
`

export const QULOT_ORDER_LINE_FIELDS = gql`
  fragment QulotOrderLineFields on OrderLine {
    createdAt
    ethOrderId
    ethTokenAmount
    id
    roundId
    totalAmount
    updatedAt
  }
`

export const QULOT_ORDER_FIELDS = gql`
  fragment QulotOrderFields on Order {
    id
    chargeStatus
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
    status
    totalAmount
    totalPayAmount
    updatedAt
    createdAt
  }
`

export const QULOT_PAYMENT_FIELDS = gql`
  fragment QulotPaymentFields on Payment {
    id
    extOrderId
    currency
    method
    amount
    amountRefund
    chargeStatus
    data
    createdAt
    updatedAt
  }
`

export const QULOT_TRANSACTION_FIELDS = gql`
  fragment QulotTransactionFields on Transaction {
    id
    type
    status
    amount
    data
    createdAt
    updatedAt
  }
`

export const QULOT_PAYMENT_LESS_FIELDS = gql`
  fragment QulotPaymentLessFields on Payment {
    id
    chargeStatus
    data
  }
`
