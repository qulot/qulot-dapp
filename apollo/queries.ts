import { gql } from 'graphql-tag'
import {
  LOTTERY_FIELDS,
  LOTTERY_SHORT_FIELDS,
  ORDER_FIELDS,
  QULOT_USER_FIELDS,
  REWARD_RULE_FIELDS,
  ROUND_FIELDS,
  USER_FIELDS,
  QULOT_ETH_ACCOUNT_FIELDS,
  QULOT_PAYMENT_METHOD_FIELDS,
  QULOT_ORDER_FIELDS,
  QULOT_ORDER_LINE_FIELDS,
  QULOT_ORDER_LINE_TICKET_FIELDS,
  QULOT_PAYMENT_FIELDS,
  QULOT_PAYMENT_FEE_FIELDS,
} from './fragments'

export const GET_TOTAL_USERS_TOTAL_PRIZE = gql`
  query GetTotalUsersTotalPrize {
    keyValues(where: { or: [{ id: "totalUsers" }, { id: "totalPrize" }] }) {
      id
      value
    }
  }
`

export const GET_USERS_ORDER_BY_WIN_AMOUNT = gql`
  ${USER_FIELDS}
  query GetUsersOrderByWinAmount($first: Int, $orderDirection: String) {
    users(
      orderBy: totalWinAmount
      orderDirection: $orderDirection
      first: $first
      where: { totalWinAmount_gt: "0" }
    ) {
      ...UserFields
    }
  }
`

export const GET_LOTTERIES = gql`
  ${LOTTERY_FIELDS}
  query GetLotteries {
    lotteries {
      ...LotteryFields
    }
  }
`

export const GET_LOTTERY_BY_ID = gql`
  ${LOTTERY_FIELDS}
  ${REWARD_RULE_FIELDS}
  query GetLottery($id: ID!) {
    lottery(id: $id) {
      ...LotteryFields
      rewardRules {
        ...RewardRule
      }
    }
  }
`

export const GET_ROUNDS = gql`
  ${ROUND_FIELDS}
  query GetRounds(
    $orderBy: String
    $orderDirection: String
    $skip: Int
    $first: Int
    $filter: Round_filter
  ) {
    rounds(
      orderBy: $orderBy
      orderDirection: $orderDirection
      skip: $skip
      first: $first
      where: $filter
    ) {
      ...RoundFields
    }
  }
`

export const GET_ROUNDS_BY_IDS = gql`
  ${ROUND_FIELDS}
  ${LOTTERY_SHORT_FIELDS}
  query GetRoundsByIds($ids: [String]) {
    rounds(where: { id_in: $ids }) {
      ...RoundFields
      lottery {
        ...LotteryShortFields
      }
    }
  }
`

export const GET_ROUND_BY_ID = gql`
  ${ROUND_FIELDS}
  ${LOTTERY_SHORT_FIELDS}
  query GetRoundById($id: String) {
    round(id: $id) {
      ...RoundFields
      lottery {
        ...LotteryShortFields
      }
    }
  }
`

export const GET_LOTTERY_REWARD_RULES = gql`
  ${REWARD_RULE_FIELDS}
  query GetLotteryRewardRules($lotteryId: ID!) {
    rewardRules(where: { lottery: $lotteryId }) {
      ...RewardRule
    }
  }
`

export const GET_USER_ORDERS = gql`
  ${ORDER_FIELDS}
  query GetUserOrders(
    $user: String
    $skip: Int
    $first: Int
    $orderBy: String
    $orderDirection: String
  ) {
    orders(
      where: { user: $user }
      orderDirection: $orderDirection
      orderBy: $orderBy
      skip: $skip
      first: $first
    ) {
      ...OrderFields
    }
  }
`

export const GET_USER_ORDER_BY_ID = gql`
  ${ORDER_FIELDS}
  query GetUserOrderById($user: String, $orderId: String) {
    orders(where: { id: $orderId, user: $user }, first: 1) {
      ...OrderFields
    }
  }
`

export const GET_LOGGED_IN_QULOT_USER = gql`
  ${QULOT_USER_FIELDS}
  ${QULOT_ETH_ACCOUNT_FIELDS}
  query Me {
    me {
      ...QulotUserFields
      ethAccount {
        ...QulotUserEthAccountFields
      }
    }
  }
`

export const GET_QULOT_PAYMENT_METHODS = gql`
  ${QULOT_PAYMENT_METHOD_FIELDS}
  ${QULOT_PAYMENT_FEE_FIELDS}
  query PaymentMethods {
    paymentMethods {
      ...QulotPaymentMethodFields
      fees {
        ...QulotPaymentFeeFields
      }
    }
  }
`

export const GET_QULOT_ORDERS = gql`
  ${QULOT_ORDER_FIELDS}
  query GetOrders(
    $id: ID
    $limit: Int32
    $offset: Int32
    $orderBy: String
    $orderDesc: Boolean
  ) {
    orders(
      id: $id
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      orderDesc: $orderDesc
    ) {
      ...QulotOrderFields
    }
  }
`

export const GET_QULOT_ORDER_DETAIL = gql`
  ${QULOT_ORDER_FIELDS}
  ${QULOT_ORDER_LINE_FIELDS}
  ${QULOT_ORDER_LINE_TICKET_FIELDS}
  ${QULOT_PAYMENT_FIELDS}
  query GetOrderDetail($id: ID!) {
    order(id: $id) {
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

export const GET_QULOT_ETH_PRIVATE_KEY = gql`
  query GetEthPrivateKey($password: String!) {
    ethPrivateKey(password: $password)
  }
`
