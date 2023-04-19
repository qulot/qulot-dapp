export enum RoundStatus {
  Open,
  Draw,
  Close,
  Reward,
}

export enum RewardUnit {
  Percent,
  Fixed,
}

export interface Round {
  id: string
  endTime: number
  startTime: number
  status: RoundStatus
  timestamp: number
  totalAmount: number
  totalTickets: number
  winningNumbers: number[]
  firstRound?: Round
  lottery?: Lottery
}

export interface RewardRule {
  matchNumber: number
  rewardUnit: RewardUnit
  rewardValue: number
}

export interface Lottery {
  id: string
  verboseName: string
  picture: string
  numberOfItems: number
  minValuePerItem: number
  maxValuePerItem: number
  periodDays: number[]
  periodHourOfDays: number
  maxNumberTicketsPerBuy: number
  pricePerTicket: number
  treasuryFeePercent: number
  amountInjectNextRoundPercent: number
  lastRound?: Round
  nextRound?: Round
  rewardRules?: RewardRule[]
  rounds?: Round[]
  nextTick?: Date
}
