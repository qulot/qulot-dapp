export const getTotalUsersTotalPrize = gql`
  query GetTotalUsersTotalPrize {
    keyValues(where: { or: [{ id: "totalUsers" }, { id: "totalPrize" }] }) {
      id
      value
    }
  }
`

export const getUsersOrderByWinAmount = gql`
  query GetUsersOrderByWinAmount($first: Int, $orderDirection: String) {
    users(
      orderBy: totalWinAmount
      orderDirection: $orderDirection
      first: $first
    ) {
      id
      totalWinAmount
      totalTickets
      totalAmount
    }
  }
`

export const getLotteries = gql`
  query GetLotteries {
    lotteries {
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
  }
`
