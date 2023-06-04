import { BigNumber } from "ethers"

export interface User {
  id: string
  totalWinAmount: BigNumber
  totalTickets: BigNumber
  totalAmount: BigNumber
}
