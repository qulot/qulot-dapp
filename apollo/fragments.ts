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
    rewardUnit
    matchNumber
  }
`
