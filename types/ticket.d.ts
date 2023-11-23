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
  lotteryPricePerTicket: BigNumber
  qty: number
  total: BigNumber
}

export interface Ticket {
  ticketId: BigNumber
  roundId: BigNumber
  numbers: number[]
  winStatus: boolean
  winRewardRule: number
  winAmount: BigNumber
  clamStatus: boolean
  round?: Round
}

export interface CalculateBulkTicketsResult {
  totalAmount: BigNumber
  finalAmount: BigNumber
  discount: BigNumber
}