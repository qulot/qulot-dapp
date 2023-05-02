import { LOTTERY_FIELDS, ROUND_FIELDS, USER_FIELDS } from './fragments'

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
  query GetLottery($id: ID!) {
    lottery(id: $id) {
      ...LotteryFields
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
