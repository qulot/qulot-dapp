export interface CartTicket {
    id: number
    roundId: string
    lotteryId: string
    pickNumbers: number[]
    selected: boolean
}