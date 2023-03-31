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
        drawDateTime
        totalAmount
        winningNumbers
        status
      }
      nextRound {
        id
        drawDateTime
        totalAmount
        status
      }
    }
  }
`
