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
  totalAmount: string
  totalTickets: number
  winningNumbers: number[]
  firstRound?: Round
  lottery?: Lottery
}

export interface RewardRule {
  matchNumber: number
  rewardUnit: 'Percent' | 'Fixed'
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
  pricePerTicket: string
  treasuryFeePercent: number
  amountInjectNextRoundPercent: number
  discountPercent: number
  lastRound?: Round
  nextRound?: Round
  rewardRules?: RewardRule[]
  rounds?: Round[]
  nextTick?: Date
}
