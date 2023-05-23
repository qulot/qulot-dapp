import { BigNumber } from "ethers"
import { Round } from "./lottery"

export interface CartTicket {
  id: number
  roundId: string
  lotteryId: string
  pickNumbers: number[]
  selected: boolean
  round?: Round
}

export interface CartItemsGroup {
  lotteryId: string
  lotteryVerboseName: string
  lotteryPricePerTicket: string
  qty: number
  total: string
}

export interface Ticket {
  id: BigNumber
  roundId: BigNumber
  numbers: number[]
  winStatus: boolean
  winRewardRule: number
  winAmount: BigNumber
  clamStatus: boolean
  round?: Round
}