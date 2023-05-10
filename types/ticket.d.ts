export interface CartTicket {
  id: number
  roundId: string
  lotteryId: string
  pickNumbers: number[]
  selected: boolean
}

export interface CartItemsGroup {
  lotteryId: string
  lotteryVerboseName: string
  lotteryPricePerTicket: string
  qty: number
  total: string
}
