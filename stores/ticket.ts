import { UserRejectedRequestError } from '@wagmi/core'
import { BigNumber } from 'ethers'
import { defineStore } from 'pinia'
import { GET_ROUNDS_BY_IDS } from '~~/apollo/queries'
import { Round } from '~~/types/lottery'
import { Ticket } from '~~/types/ticket'

interface GetTicketIdsByUserResult {
  ids: BigNumber[]
  cursor: number
}

interface GetRoundsByIdsResult {
  rounds: Round[]
}

export const useTicketStore = defineStore('ticket', {
  state: () => {
    return {
      tickets: [] as Ticket[],
      isLoading: false,
      fetchTicketsArgs: {
        cursor: 0,
        size: 5,
        asc: false,
      },
      isClaimTicketsLoading: false,
      claimTicketsError: null as string | null,
      claimTicketSuccess: false,
    }
  },
  getters: {
    winTickets: (state) => state.tickets.filter((ticket) => ticket.winStatus),
    isEmpty: (state) => state.fetchTicketsArgs.cursor === 0,
  },
  actions: {
    clear() {
      this.tickets = []
      this.fetchTicketsArgs.cursor = 0
    },
    async init() {
      const { address } = useAccount()
      const { readQulotLottery } = useQulot()
      const ticketIdsByUserLength = await readQulotLottery<BigNumber>(
        'getTicketIdsByUserLength',
        [address.value]
      )
      this.fetchTicketsArgs.cursor = ticketIdsByUserLength.toNumber()
    },
    async fetchTickets() {
      this.isLoading = true
      const { chainId } = useEthers()
      const { address } = useAccount()
      const { readQulotLottery } = useQulot()

      const { ids: ticketIds, cursor } =
        await readQulotLottery<GetTicketIdsByUserResult>('getTicketIdsByUser', [
          address.value,
          this.fetchTicketsArgs.cursor,
          this.fetchTicketsArgs.size,
          this.fetchTicketsArgs.asc,
        ])

      const fetchTicket = async (ticketId: BigNumber) => {
        const fetchTicketResult = await readQulotLottery<[] & Ticket>(
          'getTicket',
          [ticketId]
        )
        const ticket = fromStructToObject<Ticket>(fetchTicketResult)
        ticket.id = ticketId
        return ticket
      }

      const tickets: Ticket[] = await Promise.all(
        ticketIds.map((ticketId) => fetchTicket(ticketId))
      )

      if (tickets.length) {
        const { data } = await useAsyncQuery<GetRoundsByIdsResult>({
          query: GET_ROUNDS_BY_IDS,
          clientId: chainId.value.toString(),
          variables: {
            ids: uniqueBy(tickets.map((ticket) => ticket.roundId.toString())),
          },
        })

        if (data.value && data.value.rounds.length) {
          const roundsAsKey = keyBy(data.value.rounds, (round) => round.id)
          console.log(roundsAsKey)

          for (const ticket of tickets) {
            if (roundsAsKey[ticket.roundId.toNumber()]) {
              ticket.round = roundsAsKey[ticket.roundId.toNumber()]
            }
          }
        }

        this.tickets = uniqueBy([...this.tickets, ...tickets], (ticket) =>
          ticket.id.toString()
        )

        this.fetchTicketsArgs.cursor = cursor
      }
      this.isLoading = false
    },
    async claimTickets() {
      if (this.winTickets.length === 0) {
        return
      }

      this.isClaimTicketsLoading = true
      this.claimTicketSuccess = false
      const { writeQulotLottery } = useQulot()

      const ticketIds = this.winTickets.map((ticket) => ticket.id)
      console.log(`[claimTickets] tickets: ${ticketIds}`)

      try {
        const result = await (
          await writeQulotLottery('claimTickets', [ticketIds])
        )?.wait()

        console.log(
          `[claimTickets] result status: ${result?.status}, txn: ${result?.transactionHash}`,
          result
        )

        this.claimTicketSuccess = result?.status === 1
      } catch (claimTicketsTxError: any) {
        console.log(claimTicketsTxError)

        if (claimTicketsTxError?.error?.data?.message) {
          this.claimTicketsError = claimTicketsTxError?.error?.data?.message
        }

        if (claimTicketsTxError instanceof UserRejectedRequestError) {
          this.claimTicketsError = claimTicketsTxError.message
        }
      }

      this.isClaimTicketsLoading = false
    },
  },
})
